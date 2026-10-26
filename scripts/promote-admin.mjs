import { createClient } from '@supabase/supabase-js'
import { requireExplicitSupabaseMutationTarget } from './require-explicit-supabase-target.mjs'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.argv[2]?.trim().toLowerCase()

if (!url || !serviceRoleKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.')
  process.exit(1)
}
try {
  requireExplicitSupabaseMutationTarget(url, process.argv.slice(3), 'promote-admin.mjs <email> --apply --confirm-project-ref <project-ref>')
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: node --env-file=.env.local scripts/promote-admin.mjs <email>')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const { data: profile, error: lookupError } = await supabase
  .from('profiles')
  .select('id')
  .eq('email', email)
  .maybeSingle()

if (lookupError) {
  console.error('Could not find the profile. Confirm the user exists and migration 018 is applied.')
  process.exit(1)
}

if (!profile) {
  console.error('No profile exists for that email. Create the Auth user first and confirm migration 018 is applied.')
  process.exit(1)
}

const { data, error } = await supabase
  .from('profiles')
  .update({ role: 'admin' })
  .eq('id', profile.id)
  .select('id')
  .maybeSingle()

if (error || !data) {
  console.error('Promotion failed. Confirm migration 030 is applied and the service-role key targets the intended project.')
  process.exit(1)
}

console.log('Admin role assigned. Sign in through /admin/login to verify access.')
