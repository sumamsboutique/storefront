-- 015_profile_privilege_guard.sql
-- Closes a privilege-escalation hole on `profiles`.
--
-- 001 created "profiles_update_own" as `for update using (id = auth.uid())` with
-- no column restriction and no WITH CHECK. Any signed-in customer could PATCH
-- their own row with `{ role: 'admin' }` using only the anon key, and
-- getAdminSession()/getCustomerSession() read `profiles.role` as the authority
-- for admin access. Self-promotion to full admin.
--
-- The guard lives in a trigger rather than in RLS because UPDATE can be granted
-- by several policies (`profiles_update_own`, `profiles_all_admin`) that are
-- OR'd together — a per-policy WITH CHECK can be satisfied by a sibling policy.
-- A row trigger is the single choke point every write path passes through,
-- regardless of which policy authorised it.

create or replace function public.guard_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'FORBIDDEN_ROLE_CHANGE'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_guard_role on profiles;
create trigger trg_profiles_guard_role
  before update on profiles
  for each row
  execute function public.guard_profile_role();

-- The admin CRM's own role edits (updateUserRole in src/lib/admin/actions.ts)
-- go through the same table as the admin's session, so is_admin() is true and
-- the guard passes. No behaviour change for staff.
