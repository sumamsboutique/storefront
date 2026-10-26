-- Keep payment-owned states out of ordinary admin/customer updates.
-- The trusted Razorpay verification path uses service_role to move pending -> paid.
-- Refund status is intentionally blocked until a provider-backed refund workflow
-- exists; changing an order label must never stand in for moving money.

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
    raise exception 'REFUND_WORKFLOW_NOT_IMPLEMENTED';
  end if;

  if old.status = 'pending' and new.status = 'paid' then
    if auth.role() is distinct from 'service_role' then
      raise exception 'PAYMENT_VERIFICATION_REQUIRED';
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

drop trigger if exists trg_guard_order_state_transition on public.orders;
create trigger trg_guard_order_state_transition
before update of status on public.orders
for each row execute function public.guard_order_state_transition();

revoke all on function public.guard_order_state_transition() from public, anon, authenticated;
