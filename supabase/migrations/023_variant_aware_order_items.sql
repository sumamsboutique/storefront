-- 023_variant_aware_order_items.sql
--
-- Variant selection on the PDP was cosmetic: picking a design swapped the
-- gallery, but the choice never reached the cart, the order, or the stock
-- system. CartLine had no variant field, placeOrder's item schema dropped
-- anything it did not declare, and create_pending_order had no variant_id
-- column in its item handling — even though order_items.variant_id has existed
-- since 001.
--
-- This makes a variant a first-class part of the line:
--   * create_pending_order accepts item.variant_id, verifies it belongs to the
--     product, stores it on order_items, and checks that specific variant's
--     stock (not just the product total).
--
-- Signature is unchanged; only the JSON item shape gains an optional key, so
-- existing callers keep working.

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
  v_uid uuid := auth.uid();
  v_item jsonb;
  v_product_id uuid;
  v_variant_id uuid;
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
    v_variant_id := nullif(v_item->>'variant_id', '')::uuid;
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

    if v_variant_id is not null then
      -- A variant must belong to the product it is ordered with, and it must
      -- itself have enough stock.
      select coalesce(sum(stock_quantity), -1) into v_available
      from product_variants
      where id = v_variant_id and product_id = v_product_id;
      if v_available = -1 then
        raise exception 'VARIANT_NOT_FOUND';
      end if;
      if v_available < v_qty then
        raise exception 'INSUFFICIENT_STOCK';
      end if;
    else
      select coalesce(sum(v.stock_quantity), -1) into v_available
      from product_variants v
      where v.product_id = v_product_id;
      if v_available >= 0 and v_available < v_qty then
        raise exception 'INSUFFICIENT_STOCK';
      end if;
    end if;

    v_subtotal := v_subtotal + (v_price * v_qty);
  end loop;

  if v_subtotal <= 0 then
    raise exception 'EMPTY_ORDER';
  end if;

  -- Validate the coupon, but do not consume it — see mark_order_paid() in 021.
  v_coupon_result := public.coupon_quote(p_coupon, v_subtotal);
  if not (v_coupon_result->>'ok')::boolean then
    return jsonb_build_object('ok', false, 'error', v_coupon_result->>'error');
  end if;
  v_discount := (v_coupon_result->>'discount')::numeric;
  v_coupon_code := v_coupon_result->>'code';

  v_shipping := case when v_subtotal > v_free_threshold then 0 else v_flat_shipping end;
  v_total := v_subtotal + v_shipping - v_discount;

  -- Reuse an identical unpaid order from the last 30 minutes instead of piling
  -- up duplicates when the customer dismisses the Razorpay modal and retries.
  select id into v_order_id
  from orders
  where status = 'pending'
    and total = v_total
    and coalesce(coupon_code, '') = coalesce(v_coupon_code, '')
    and shipping_address = p_address
    and created_at > now() - interval '30 minutes'
    and (user_id = v_uid or (user_id is null and v_uid is null))
  order by created_at desc
  limit 1;

  if v_order_id is null then
    insert into orders (user_id, status, subtotal, shipping_fee, discount, coupon_code, total, shipping_address)
    values (v_uid, 'pending', v_subtotal, v_shipping, v_discount, v_coupon_code, v_total, p_address)
    returning id into v_order_id;
  else
    -- Same cart retried: refresh the lines so quantity edits are picked up.
    delete from order_items where order_id = v_order_id;
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_variant_id := nullif(v_item->>'variant_id', '')::uuid;
    v_qty := (v_item->>'quantity')::int;

    select p.price, p.name into v_price, v_name
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    insert into order_items (order_id, product_id, variant_id, quantity, unit_price, product_name_snapshot)
    values (v_order_id, v_product_id, v_variant_id, v_qty, v_price, v_name);
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
