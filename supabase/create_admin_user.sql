-- ==============================================================================
-- SUMAM'S BOUTIQUE — ACTIVATE ADMIN USER & PERMISSIONS
-- ==============================================================================
-- Run this in your Supabase Dashboard -> SQL Editor
-- This confirms the user's email and grants full 'admin' role in public.profiles.
-- ==============================================================================

-- 1. Auto-confirm the user email so you can log in immediately without email verification
update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now()),
    updated_at = now()
where email = 'admin@sumamsboutique.com';

-- 2. Grant 'admin' role in public.profiles
insert into public.profiles (id, role, full_name, email)
select 
  id, 
  'admin'::user_role, 
  'Atelier Administrator', 
  email
from auth.users
where email = 'admin@sumamsboutique.com'
on conflict (id) do update
set role = 'admin'::user_role,
    full_name = 'Atelier Administrator',
    updated_at = now();

-- 3. Verify the admin profile setup
select id, email, role, full_name, updated_at
from public.profiles
where email = 'admin@sumamsboutique.com';
