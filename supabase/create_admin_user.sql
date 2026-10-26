-- Read-only verification for the initial admin setup.
-- Do not promote roles with direct SQL: the profile guard intentionally blocks
-- untrusted role changes. Create the Auth user, then use the server-only script
-- after migration 030 has been reviewed and applied to the intended environment:
--   node --env-file=.env.local scripts/promote-admin.mjs admin@example.com
-- Never point this script at production without an approved operator change.
select id, email, role, full_name, updated_at
from public.profiles
where role in ('admin', 'staff')
order by created_at;
