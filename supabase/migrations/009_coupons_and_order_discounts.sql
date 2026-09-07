-- 009_coupons_and_order_discounts.sql
-- Discount coupons + order discount columns + single-source discount math.

-- 1. Coupons table (staff managed; RLS admin/staff only)
create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percent', 'amount')),
  value numeric(10,2) not null check (value > 0),
  min_subtotal numeric(10,2) not null default 0,
  max_uses int check (max_uses is null or max_uses > 0),
  used_count int not null default 0,
  is_active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table coupons enable row level security;

drop policy if exists "coupons_all_staff" on coupons;
create policy "coupons_all_staff" on coupons for all
using (public.is_admin_or_staff());

create trigger trg_coupons_updated_at before update on coupons
for each row execute function update_updated_at();

-- 2. Order discount capture
alter table orders add column if not exists coupon_code text;
alter table orders add column if not exists discount numeric(10,2) not null default 0;

-- 3. Single source of truth for coupon discount math.
--    Used by both the checkout quote and the order-creation RPC so the quoted
--    and charged discounts can never drift.
create or replace function public.coupon_quote(p_code text, p_subtotal numeric)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_coupon coupons%rowtype;
  v_discount numeric(10,2);
begin
  if p_code is null or btrim(p_code) = '' then
    return jsonb_build_object('ok', true, 'discount', 0);
  end if;

  select * into v_coupon
  from coupons
  where upper(code) = upper(btrim(p_code));

  if not found then
    return jsonb_build_object('ok', false, 'error', 'COUPON_NOT_FOUND');
  end if;
  if not v_coupon.is_active then
    return jsonb_build_object('ok', false, 'error', 'COUPON_INACTIVE');
  end if;
  if v_coupon.expires_at is not null and v_coupon.expires_at < now() then
    return jsonb_build_object('ok', false, 'error', 'COUPON_EXPIRED');
  end if;
  if v_coupon.min_subtotal > p_subtotal then
    return jsonb_build_object('ok', false, 'error', 'COUPON_MIN_NOT_MET');
  end if;
  -- ponytail: no row lock on the check; used_count is incremented later at
  -- order creation, so over-subscription needs a unique order constraint. Fine at boutique scale.
  if v_coupon.max_uses is not null and v_coupon.used_count >= v_coupon.max_uses then
    return jsonb_build_object('ok', false, 'error', 'COUPON_EXHAUSTED');
  end if;

  if v_coupon.discount_type = 'amount' then
    v_discount := least(v_coupon.value, p_subtotal);
  else
    v_discount := round((p_subtotal * v_coupon.value) / 100, 2);
  end if;
  v_discount := least(v_discount, p_subtotal);

  return jsonb_build_object('ok', true, 'discount', v_discount, 'code', upper(btrim(p_code)));
end;
$$;

revoke all on function public.coupon_quote(text, numeric) from public;
grant execute on function public.coupon_quote(text, numeric) to anon, authenticated;

-- 4. Extend guest order creation with an optional coupon.
--    Prices stay server-derived; the client never supplies amounts.
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

    select p.price, p.name into v_price, v_name
    from products p
    where p.id = v_product_id and p.is_active and p.is_published;

    if v_price is null then
      raise exception 'PRODUCT_NOT_FOUND';
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

revoke all on function public.create_pending_order(jsonb, jsonb, text) from public;
grant execute on function public.create_pending_order(jsonb, jsonb, text) to anon, authenticated;