-- Captured payments that cannot be fulfilled must be durable and visible to
-- staff. This migration does not call Razorpay or issue refunds.

create table if not exists public.payment_reconciliations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider_order_id text not null,
  payment_id text,
  reason_code text not null check (reason_code in (
    'inventory_unavailable',
    'coupon_limit_reached',
    'additional_capture'
  )),
  expected_amount_paise bigint not null check (expected_amount_paise > 0),
  currency text not null default 'INR' check (currency = 'INR'),
  status text not null default 'open' check (status in ('open', 'resolved')),
  resolution text check (resolution in ('fulfilled', 'refund_recorded')),
  resolution_note text,
  refund_reference text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references public.profiles(id)
);

create unique index if not exists payment_reconciliations_provider_payment_uidx
  on public.payment_reconciliations (provider_order_id, (coalesce(payment_id, '')));
create index if not exists payment_reconciliations_open_created_idx
  on public.payment_reconciliations (created_at desc)
  where status = 'open';

alter table public.payment_reconciliations enable row level security;
drop policy if exists "payment_reconciliations_select_staff" on public.payment_reconciliations;
create policy "payment_reconciliations_select_staff"
  on public.payment_reconciliations for select
  using (public.is_admin_or_staff());
revoke all on public.payment_reconciliations from public, anon, authenticated;
grant all on public.payment_reconciliations to service_role;
grant select on public.payment_reconciliations to authenticated;

create or replace function public.guard_order_state_transition()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_allowed boolean := false;
begin
  if new.status is not distinct from old.status then
    return new;
  end if;

  if new.status = 'refunded' then
    if old.status = 'payment_review' and auth.role() = 'service_role' then
      return new;
    end if;
    raise exception 'REFUND_WORKFLOW_NOT_IMPLEMENTED';
  end if;

  if old.status = 'pending' and new.status in ('paid', 'payment_review') then
    if auth.role() is distinct from 'service_role' then
      raise exception 'PAYMENT_VERIFICATION_REQUIRED';
    end if;
    return new;
  end if;

  if old.status = 'payment_review' and new.status = 'paid' then
    if auth.role() is distinct from 'service_role' then
      raise exception 'PAYMENT_RECONCILIATION_REQUIRED';
    end if;
    return new;
  end if;

  v_allowed := case old.status
    when 'pending' then new.status in ('cancelled', 'expired')
    when 'paid' then new.status = 'processing'
    when 'processing' then new.status = 'shipped'
    when 'shipped' then new.status = 'delivered'
    else false
  end;

  if not v_allowed then
    raise exception 'INVALID_ORDER_STATUS_TRANSITION';
  end if;
  return new;
end;
$$;

create or replace function public.mark_order_paid(p_order_id uuid, p_payment_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_coupon public.coupons%rowtype;
  v_rows int;
  v_reason text;
begin
  if auth.role() is distinct from 'service_role' then
    raise exception 'SERVICE_ROLE_REQUIRED';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
  for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_FOUND');
  end if;

  if v_order.status = 'paid' then
    if p_payment_id is not null and p_payment_id is distinct from v_order.payment_id then
      insert into public.payment_reconciliations (
        order_id, provider_order_id, payment_id, reason_code, expected_amount_paise
      )
      values (
        v_order.id,
        v_order.payment_reference,
        p_payment_id,
        'additional_capture',
        round(v_order.total * 100)::bigint
      )
      on conflict (provider_order_id, (coalesce(payment_id, ''))) do nothing;
      get diagnostics v_rows = row_count;
      return jsonb_build_object(
        'ok', true,
        'applied', v_rows > 0,
        'review_required', v_rows > 0,
        'additional_capture', true
      );
    end if;
    return jsonb_build_object('ok', true, 'applied', false);
  end if;

  if v_order.status = 'payment_review' then
    insert into public.payment_reconciliations (
      order_id, provider_order_id, payment_id, reason_code, expected_amount_paise
    )
    values (
      v_order.id,
      v_order.payment_reference,
      p_payment_id,
      'additional_capture',
      round(v_order.total * 100)::bigint
    )
    on conflict (provider_order_id, (coalesce(payment_id, ''))) do nothing;
    get diagnostics v_rows = row_count;
    return jsonb_build_object(
      'ok', true,
      'applied', v_rows > 0,
      'review_required', true
    );
  end if;

  if v_order.status <> 'pending' then
    return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_PENDING');
  end if;

  if v_order.coupon_code is not null then
    select * into v_coupon
    from public.coupons
    where upper(code) = upper(v_order.coupon_code)
    for update;
    if found and v_coupon.max_uses is not null and v_coupon.used_count >= v_coupon.max_uses then
      v_reason := 'coupon_limit_reached';
    end if;
  end if;

  if v_reason is not null then
    update public.orders
    set status = 'payment_review',
        payment_id = coalesce(p_payment_id, payment_id),
        updated_at = now()
    where id = v_order.id;

    insert into public.payment_reconciliations (
      order_id, provider_order_id, payment_id, reason_code, expected_amount_paise
    )
    values (
      v_order.id,
      v_order.payment_reference,
      p_payment_id,
      v_reason,
      round(v_order.total * 100)::bigint
    )
    on conflict (provider_order_id, (coalesce(payment_id, ''))) do nothing;
    return jsonb_build_object('ok', true, 'applied', true, 'review_required', true);
  end if;

  -- Keep the paid transition, inventory decrement, and coupon consumption
  -- atomic. A stock conflict rolls back this block, then records a review case.
  begin
    update public.orders
    set status = 'paid',
        payment_id = coalesce(p_payment_id, payment_id),
        updated_at = now()
    where id = v_order.id and status = 'pending';

    perform public.fulfill_order_stock(v_order.id);

    if v_coupon.id is not null then
      update public.coupons
      set used_count = used_count + 1
      where id = v_coupon.id;
    end if;

    return jsonb_build_object('ok', true, 'applied', true, 'review_required', false);
  exception when raise_exception then
    if sqlerrm <> 'INSUFFICIENT_STOCK' then
      raise;
    end if;

    update public.orders
    set status = 'payment_review',
        payment_id = coalesce(p_payment_id, payment_id),
        updated_at = now()
    where id = v_order.id;

    insert into public.payment_reconciliations (
      order_id, provider_order_id, payment_id, reason_code, expected_amount_paise
    )
    values (
      v_order.id,
      v_order.payment_reference,
      p_payment_id,
      'inventory_unavailable',
      round(v_order.total * 100)::bigint
    )
    on conflict (provider_order_id, (coalesce(payment_id, ''))) do nothing;
    return jsonb_build_object('ok', true, 'applied', true, 'review_required', true);
  end;
end;
$$;

create or replace function public.resolve_payment_reconciliation(
  p_case_id uuid,
  p_resolution text,
  p_note text,
  p_refund_reference text,
  p_resolved_by uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_case public.payment_reconciliations%rowtype;
  v_order public.orders%rowtype;
  v_coupon public.coupons%rowtype;
  v_rows int;
begin
  if auth.role() is distinct from 'service_role' then
    raise exception 'SERVICE_ROLE_REQUIRED';
  end if;
  if p_resolved_by is null or not exists (
    select 1 from public.profiles
    where id = p_resolved_by and role in ('admin', 'staff')
  ) then
    return jsonb_build_object('ok', false, 'error', 'STAFF_ACTOR_REQUIRED');
  end if;
  if p_resolution is null or p_resolution not in ('fulfilled', 'refund_recorded') then
    return jsonb_build_object('ok', false, 'error', 'INVALID_RESOLUTION');
  end if;
  if p_note is null or length(btrim(p_note)) < 5 or length(p_note) > 1000 then
    return jsonb_build_object('ok', false, 'error', 'RESOLUTION_NOTE_REQUIRED');
  end if;
  if p_resolution = 'refund_recorded'
     and (p_refund_reference is null or length(btrim(p_refund_reference)) < 3 or length(p_refund_reference) > 120) then
    return jsonb_build_object('ok', false, 'error', 'REFUND_REFERENCE_REQUIRED');
  end if;

  select * into v_case
  from public.payment_reconciliations
  where id = p_case_id and status = 'open'
  for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'CASE_NOT_OPEN');
  end if;

  select * into v_order from public.orders where id = v_case.order_id for update;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_FOUND');
  end if;

  if p_resolution = 'fulfilled' then
    if v_order.status <> 'payment_review' then
      return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_IN_PAYMENT_REVIEW');
    end if;

    -- A captured order may be fulfilled only if the original limited-use
    -- coupon still has capacity. Lock it so concurrent reconciliations cannot
    -- both claim the final use, and never silently omit the usage count.
    if v_order.coupon_code is not null then
      select * into v_coupon
      from public.coupons
      where upper(code) = upper(v_order.coupon_code)
      for update;
      if not found then
        return jsonb_build_object('ok', false, 'error', 'COUPON_UNAVAILABLE');
      end if;
      if v_coupon.max_uses is not null and v_coupon.used_count >= v_coupon.max_uses then
        return jsonb_build_object('ok', false, 'error', 'COUPON_LIMIT_REACHED');
      end if;
    end if;

    update public.orders
    set status = 'paid',
        payment_id = coalesce(v_case.payment_id, payment_id),
        updated_at = now()
    where id = v_order.id;
    perform public.fulfill_order_stock(v_order.id);

    if v_coupon.id is not null then
      update public.coupons
      set used_count = used_count + 1
      where id = v_coupon.id;
    end if;
  elsif v_order.status = 'payment_review'
        and not exists (
          select 1 from public.payment_reconciliations other_case
          where other_case.order_id = v_order.id
            and other_case.status = 'open'
            and other_case.id <> v_case.id
        ) then
    update public.orders
    set status = 'refunded', updated_at = now()
    where id = v_order.id;
  end if;

  update public.payment_reconciliations
  set status = 'resolved',
      resolution = p_resolution,
      resolution_note = btrim(p_note),
      refund_reference = case when p_resolution = 'refund_recorded' then btrim(p_refund_reference) else null end,
      resolved_at = now(),
      resolved_by = p_resolved_by
  where id = v_case.id and status = 'open';
  get diagnostics v_rows = row_count;

  return jsonb_build_object('ok', v_rows = 1, 'resolved', v_rows = 1, 'order_id', v_order.id);
end;
$$;

revoke all on function public.mark_order_paid(uuid, text) from public, anon, authenticated;
grant execute on function public.mark_order_paid(uuid, text) to service_role;
revoke all on function public.resolve_payment_reconciliation(uuid, text, text, text, uuid) from public, anon, authenticated;
grant execute on function public.resolve_payment_reconciliation(uuid, text, text, text, uuid) to service_role;
