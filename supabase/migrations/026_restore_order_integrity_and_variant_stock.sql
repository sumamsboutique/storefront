-- 026_restore_order_integrity_and_variant_stock.sql
--
-- 1. Restores the full hardened create_pending_order() (combining 021's deferred
--    coupon consumption + 30-min duplicate order reuse, 023's variant-aware order
--    items, 024's service_role shipping override protection, and 025's customer
--    authentication requirement).
-- 2. Updates fulfill_order_stock() so when an order_item specifies a variant_id,
--    that exact variant's stock is decremented first before falling back to other
--    variants of the product.

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
  v_variant_count int;
begin
  -- Only a paid order may consume stock. Both callers reach this via
  -- mark_order_paid(), which sets the status first.
  if not exists (select 1 from orders where id = p_order_id and status = 'paid') then
    raise exception 'ORDER_NOT_PAID';
  end if;

  for v_item in select product_id, variant_id, quantity from order_items where order_id = p_order_id loop
    v_remaining := v_item.quantity;

    select count(*) into v_variant_count
    from product_variants where product_id = v_item.product_id;

    -- If a specific variant was ordered, it must supply the full quantity.
    -- Never silently substitute another design for the customer's selection.
    if v_item.variant_id is not null then
      for v_var in
        select id, stock_quantity from product_variants
        where id = v_item.variant_id and product_id = v_item.product_id and stock_quantity > 0
        for update
      loop
        v_take := least(v_var.stock_quantity, v_remaining);
        update product_variants set stock_quantity = stock_quantity - v_take where id = v_var.id;
        v_remaining := v_remaining - v_take;
      end loop;
      if v_remaining > 0 then
        raise exception 'INSUFFICIENT_STOCK';
      end if;
    elsif v_variant_count > 0 then
      -- Legacy/unselected items may draw from any variant, but lock each row
      -- before reading its quantity so concurrent paid transitions serialize.
      for v_var in
        select id, stock_quantity from product_variants
        where product_id = v_item.product_id and stock_quantity > 0
        order by created_at, id
        for update
      loop
        exit when v_remaining <= 0;
        v_take := least(v_var.stock_quantity, v_remaining);
        update product_variants set stock_quantity = stock_quantity - v_take where id = v_var.id;
        v_remaining := v_remaining - v_take;
      end loop;
      if v_remaining > 0 then
        raise exception 'INSUFFICIENT_STOCK';
      end if;
    end if;

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
  if v_uid is null and auth.role() <> 'service_role' then
    return jsonb_build_object('ok', false, 'error', 'AUTH_REQUIRED');
  end if;

  if p_address is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'INVALID_PAYLOAD';
  end if;

  -- Shipping policy: service-role override > store_settings > 010 defaults.
  if auth.role() = 'service_role' then
    v_free_threshold := p_free_threshold;
    v_flat_shipping := p_flat_shipping;
  end if;
  if v_free_threshold is null or v_flat_shipping is null then
    select value into v_commerce from store_settings where key = 'commerce';
    v_free_threshold := coalesce(v_free_threshold, (v_commerce->>'free_shipping_threshold')::numeric, 10000);
    v_flat_shipping := coalesce(v_flat_shipping, (v_commerce->>'flat_shipping_rate')::numeric, 199);
  end if;
  v_free_threshold := greatest(0, v_free_threshold);
  v_flat_shipping := greatest(0, v_flat_shipping);

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

  -- Validate the coupon, but do not consume it — see mark_order_paid().
  v_coupon_result := public.coupon_quote(p_coupon, v_subtotal);
  if not (v_coupon_result->>'ok')::boolean then
    return jsonb_build_object('ok', false, 'error', v_coupon_result->>'error');
  end if;
  v_discount := (v_coupon_result->>'discount')::numeric;
  v_coupon_code := v_coupon_result->>'code';

  v_shipping := case when v_subtotal > v_free_threshold then 0 else v_flat_shipping end;
  v_total := v_subtotal + v_shipping - v_discount;

  if v_total < 0 then
    raise exception 'INVALID_TOTAL';
  end if;

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
  end if;

  if v_order_id is not null then
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

revoke all on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) from public;
grant execute on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) to anon, authenticated, service_role;
revoke all on function public.fulfill_order_stock(uuid) from public, anon, authenticated;
grant execute on function public.fulfill_order_stock(uuid) to service_role;
