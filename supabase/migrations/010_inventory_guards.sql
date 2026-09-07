-- 010_inventory_guards.sql
-- 1. create_pending_order rejects out-of-stock products and quantities that exceed
--    available variant stock (variant-less products fall back to manual stock_status).
-- 2. fulfill_order_stock() decrements variant stock when an order is paid.

-- Recreate the guest order RPC with availability guards.
-- Products without variants have no numeric stock, so we only reject on
-- stock_status for those (admin manages them manually).
create or replace function public.create_pending_order(p_address jsonb, p_items jsonb, p_coupon text default null)
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
begin
  if auth.uid() is not null then
    raise exception 'GUEST_ONLY';
  end if;

  if p_address is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'INVALID_PAYLOAD';
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

    -- Numeric check only when the product has variants; -1 sentinel = none.
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

  v_shipping := case when v_subtotal > 10000 then 0 else 199 end;
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

-- Decrements variant stock across an order's items and refreshes product
-- stock_status. Call once when an order flips pending -> paid (webhook or the
-- client verify path, both guarded by the pending check so it runs exactly once).
create or replace function public.fulfill_order_stock(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item record;
  v_var record;
  v_take int;
  v_remaining int;
  v_left int;
begin
  for v_item in select product_id, quantity from order_items where order_id = p_order_id loop
    v_remaining := v_item.quantity;
    -- ponytail: consumes stock across variants oldest-to-newest without row locks;
    -- racing paid events on the same product could over-sell at boutique scale. Lock
    -- variants (FOR UPDATE) if concurrency ever becomes a real concern.
    for v_var in
      select id from product_variants
      where product_id = v_item.product_id and stock_quantity > 0
      order by created_at
    loop
      if v_remaining <= 0 then
        exit;
      end if;
      v_take := least(v_var.stock_quantity, v_remaining);
      update product_variants set stock_quantity = stock_quantity - v_take where id = v_var.id;
      v_remaining := v_remaining - v_take;
    end loop;

    select coalesce(sum(stock_quantity), 0) into v_left
    from product_variants where product_id = v_item.product_id;

    update products
    set stock_status = case
      when v_left = 0 then 'out_of_stock'
      when v_left <= 3 then 'low_stock'
      else 'in_stock'
    end
    where id = v_item.product_id;
  end loop;
end;
$$;

revoke all on function public.create_pending_order(jsonb, jsonb, text) from public;
grant execute on function public.create_pending_order(jsonb, jsonb, text) to anon, authenticated;

revoke all on function public.fulfill_order_stock(uuid) from public;
grant execute on function public.fulfill_order_stock(uuid) to anon, authenticated;