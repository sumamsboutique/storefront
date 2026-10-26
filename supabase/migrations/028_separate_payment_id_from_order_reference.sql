-- Keep payment_reference stable as the provider order ID used to find the
-- local order from callbacks and webhooks. Store the captured payment ID in its
-- own field instead of replacing the provider order ID after settlement.
alter table public.orders
  add column if not exists payment_id text;

-- Before this migration, mark_order_paid replaced payment_reference with the
-- captured payment ID. Preserve that historical ID before changing the RPC.
update public.orders
set payment_id = payment_reference
where status = 'paid'
  and payment_provider = 'razorpay'
  and payment_reference is not null
  and payment_id is null;

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
  -- Atomic claim: only the caller that flips pending -> paid proceeds.
  update public.orders
  set status = 'paid',
      payment_id = coalesce(p_payment_id, payment_id),
      updated_at = now()
  where id = p_order_id and status = 'pending'
  returning coupon_code into v_coupon;

  get diagnostics v_rows = row_count;

  if v_rows = 0 then
    if exists (select 1 from public.orders where id = p_order_id and status = 'paid') then
      return jsonb_build_object('ok', true, 'applied', false);
    end if;
    return jsonb_build_object('ok', false, 'error', 'ORDER_NOT_PENDING');
  end if;

  perform public.fulfill_order_stock(p_order_id);

  if v_coupon is not null then
    update public.coupons
    set used_count = used_count + 1
    where upper(code) = upper(v_coupon);
  end if;

  return jsonb_build_object('ok', true, 'applied', true);
end;
$$;

revoke all on function public.mark_order_paid(uuid, text) from public, anon, authenticated;
grant execute on function public.mark_order_paid(uuid, text) to service_role;
