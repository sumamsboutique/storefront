-- Permit the trusted server-side service role to promote an already-created
-- auth user during initial setup. Authenticated customers and staff still
-- cannot change profile roles; regular admins keep the existing CRM path.
create or replace function public.guard_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and not public.is_admin()
     and auth.role() is distinct from 'service_role' then
    raise exception 'FORBIDDEN_ROLE_CHANGE'
      using errcode = '42501';
  end if;
  return new;
end;
$$;
