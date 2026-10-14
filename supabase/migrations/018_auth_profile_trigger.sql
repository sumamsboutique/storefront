-- 018_auth_profile_trigger.sql
--
-- Every signup path (email+password and Google OAuth) inserts the auth.users row
-- inside GoTrue, outside any application request. At that moment either there is
-- no session yet or the session belongs to a brand-new user, and `profiles` has
-- no INSERT policy, so no RLS-scoped write can succeed there — the app's
-- best-effort anon-key upsert in adminSignupAction is rejected, and an OAuth
-- user would land on /account with no profile at all.
--
-- A SECURITY DEFINER trigger runs as the table owner and is the single choke
-- point every signup path passes through, so it fixes both.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, role, full_name, email, avatar_url)
  values (
    new.id,
    -- Hard-coded: raw_user_meta_data is user-supplied, so never read a role from
    -- it or a signup could self-assign 'admin'.
    'customer',
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
