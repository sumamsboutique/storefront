-- 012_settings_driven_shipping.sql
-- create_pending_order now derives shipping policy from store_settings('commerce')
-- instead of hardcoding 10000 / 199. Callers may still override via params;
-- the DB row is the single source of truth for the money path.
-- Drop the 010 signature (3-arg) so the hardcoded variant cannot linger as an
-- overload; the new 5-arg stays source-compatible via its default params.
drop function if exists public.create_pending_order(jsonb, jsonb, text);
create or replace function public.create_pending_order(
  p_address jsonb,
  p_items jsonb,
  p_coupon text default null,
  p_free_threshold numeric default null,
  p_flat_shipping numeric default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product_id uuid;
  v_qty int;
  v_price numeric(10,2);
  v_name text;
  v_stock_status text;
  v_available int;
  v_subtotal numeric(10,2) := 0;
  v_shipping numeric(10,2);
  v_discount numeric(10,2) := 0;
  v_coupon_code text;
  v_coupon_result jsonb;
  v_total numeric(10,2);
  v_order_id uuid;
  v_commerce jsonb;
  v_free_threshold numeric;
  v_flat_shipping numeric;
begin
  if auth.uid() is not null then
    raise exception 'GUEST_ONLY';
  end if;

  if p_address is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'INVALID_PAYLOAD';
  end if;

  -- Shipping policy: caller override > store_settings > 010 defaults.
  v_free_threshold := p_free_threshold;
  v_flat_shipping := p_flat_shipping;
  if v_free_threshold is null or v_flat_shipping is null then
    select value into v_commerce from store_settings where key = 'commerce';
    v_free_threshold := coalesce(v_free_threshold, (v_commerce->>'free_shipping_threshold')::numeric, 10000);
    v_flat_shipping := coalesce(v_flat_shipping, (v_commerce->>'flat_shipping_rate')::numeric, 199);
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::int;

    if v_product_id is null or v_qty is null or v_qty <= 0 then
      raise exception 'INVALID_ITEM';
    end if;

    select p.price, p.name, p.stock_status into v_price, v_name, v_stock_status
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    if v_price is null then
      raise exception 'PRODUCT_NOT_FOUND';
    end if;
    if v_stock_status in ('sold', 'out_of_stock') then
      raise exception 'OUT_OF_STOCK';
    end if;

    select coalesce(sum(v.stock_quantity), -1) into v_available
    from product_variants v
    where v.product_id = v_product_id;
    if v_available >= 0 and v_available < v_qty then
      raise exception 'INSUFFICIENT_STOCK';
    end if;

    v_subtotal := v_subtotal + (v_price * v_qty);
  end loop;

  if v_subtotal <= 0 then
    raise exception 'EMPTY_ORDER';
  end if;

  v_coupon_result := public.coupon_quote(p_coupon, v_subtotal);
  if not (v_coupon_result->>'ok')::boolean then
    return jsonb_build_object('ok', false, 'error', v_coupon_result->>'error');
  end if;
  v_discount := (v_coupon_result->>'discount')::numeric;
  v_coupon_code := v_coupon_result->>'code';

  v_shipping := case when v_subtotal > v_free_threshold then 0 else v_flat_shipping end;
  v_total := v_subtotal + v_shipping - v_discount;

  insert into orders (status, subtotal, shipping_fee, discount, coupon_code, total, shipping_address)
  values ('pending', v_subtotal, v_shipping, v_discount, v_coupon_code, v_total, p_address)
  returning id into v_order_id;

  if v_coupon_code is not null then
    update coupons set used_count = used_count + 1 where upper(code) = v_coupon_code;
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_qty := (v_item->>'quantity')::int;

    select p.price, p.name into v_price, v_name
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    insert into order_items (order_id, product_id, quantity, unit_price, product_name_snapshot)
    values (v_order_id, v_product_id, v_qty, v_price, v_name);
  end loop;

  return jsonb_build_object(
    'order_id', v_order_id,
    'subtotal', v_subtotal,
    'shipping', v_shipping,
    'discount', v_discount,
    'total', v_total
  );
end;
$$;

revoke all on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) from public;
grant execute on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) to anon, authenticated;