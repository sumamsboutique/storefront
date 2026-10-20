-- 020_order_payment_integrity.sql
--
-- Fixes three defects in the payment path:
--
--   1. fulfill_order_stock() selected only `id` from product_variants but then
--      read `v_var.stock_quantity`, which raised at runtime for any order whose
--      product had variants (record fields not populated -> NULL -> error).
--
--   2. fulfill_order_stock() was callable by anon/authenticated with no check
--      that the order was actually paid, and no idempotency guard. Any visitor
--      could pass an arbitrary order id and drive stock to zero.
--
--   3. create_pending_order() incremented coupons.used_count while the order was
--      still `pending`. An abandoned Razorpay modal therefore burned a single-use
--      coupon without a rupee being captured.
--
-- The transition to `paid` now happens in one atomic function, mark_order_paid(),
-- which is the only thing allowed to decrement stock or consume a coupon. It is
-- idempotent: the status check and the update are in the same statement, so
-- concurrent webhook + client-verify calls cannot double-apply.

-- ── 1. Stock fulfillment: real fix, no ambient EXECUTE ──────────────────────
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
  -- Only a paid order may consume stock. Both callers reach this via
  -- mark_order_paid(), which sets the status first.
  if not exists (select 1 from orders where id = p_order_id and status = 'paid') then
    raise exception 'ORDER_NOT_PAID';
  end if;

  for v_item in select product_id, quantity from order_items where order_id = p_order_id loop
    v_remaining := v_item.quantity;
    -- ponytail: consumes stock across variants oldest-to-newest without row locks;
    -- racing paid events on the same product could over-sell at boutique scale. Lock
    -- variants (FOR UPDATE) if concurrency ever becomes a real concern.
    for v_var in
      select id, stock_quantity from product_variants
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

-- ── 2. The single allowed paid transition ───────────────────────────────────
-- Returns { ok: true, applied: true|false } — applied=false means the order was
-- already paid (or not pending), so the caller should still treat it as success.
create or replace function public.mark_order_paid(p_order_id uuid, p_payment_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rows int;
  v_coupon text;
begin
  -- Atomic claim: only the caller that actually flips pending -> paid proceeds.
  -- A concurrent webhook + client-verify pair sees v_rows = 0 and stops here.
  update orders
  set status = 'paid',
      payment_reference = coalesce(p_payment_id, payment_reference),
      updated_at = now()
  where id = p_order_id and status = 'pending'
  returning coupon_code into v_coupon;

  get diagnostics v_rows = row_count;

  if v_rows = 0 then
    -- Already paid, cancelled or expired: nothing to do, and nothing to undo.
    if exists (select 1 from orders where id = p_order_id and status = 'paid') then
      return jsonb_build_object('ok', true, 'applied', false);
    end if;
    return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_PENDING');
  end if;

  -- Stock decrement is now safe: the row is `paid`.
  perform public.fulfill_order_stock(p_order_id);

  -- Coupon is consumed only now, so an abandoned checkout costs nothing.
  if v_coupon is not null then
    update coupons set used_count = used_count + 1 where upper(code) = upper(v_coupon);
  end if;

  return jsonb_build_object('ok', true, 'applied', true);
end;
$$;

-- ── 3. create_pending_order: stop burning coupons while pending ─────────────
-- Identical to the 013 definition except the used_count increment is gone.
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

  -- Validate the coupon, but do not consume it — see mark_order_paid().
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

-- ── 4. Grants ───────────────────────────────────────────────────────────────
-- create_pending_order stays callable by the storefront (it is the anon checkout).
revoke all on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) from public;
grant execute on function public.create_pending_order(jsonb, jsonb, text, numeric, numeric) to anon, authenticated;

-- These two are server-only: reached by the service role, never the browser.
-- With EXECUTE revoked from anon/authenticated, the paid-status guard cannot be
-- bypassed by a crafted RPC call.
revoke all on function public.fulfill_order_stock(uuid) from public, anon, authenticated;
revoke all on function public.mark_order_paid(uuid, text) from public, anon, authenticated;
grant execute on function public.fulfill_order_stock(uuid) to service_role;
grant execute on function public.mark_order_paid(uuid, text) to service_role;
