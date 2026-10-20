-- 022_grant_mark_order_paid_service_role.sql
-- 021 revoked EXECUTE on fulfill_order_stock() and mark_order_paid() from
-- public/anon/authenticated but omitted the explicit service_role grant. 021
-- had already been applied to the live database, so this carries the grant to
-- existing environments; fresh databases get it from 021 directly.

grant execute on function public.fulfill_order_stock(uuid) to service_role;
grant execute on function public.mark_order_paid(uuid, text) to service_role;
