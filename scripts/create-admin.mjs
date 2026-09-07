import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mdsnuabkzrhvwgfcyztv.supabase.co'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_yEFbkL53ULfs3mqmYOySGA_9L5_JfNg'

const supabase = createClient(url, anonKey)

const email = process.argv[2] || 'admin@sumamsboutique.com'
const password = process.argv[3]
if (!password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password>')
  process.exit(1)
}

console.log(`[create-admin] Creating user ${email}...`)

async function main() {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Atelier Administrator',
      },
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log(`[create-admin] User ${email} already exists in Supabase Auth!`)
    } else {
      console.error('[create-admin] Error signing up:', error.message)
      process.exit(1)
    }
  } else {
    console.log(`[create-admin] Successfully registered user: ${data.user?.email} (ID: ${data.user?.id})`)
  }

  console.log(`\n==================================================================`)
  console.log(`NEXT STEP: Run this one-line SQL in your Supabase SQL Editor:`)
  console.log(`------------------------------------------------------------------`)
  console.log(`update public.profiles set role = 'admin' where email = '${email}';`)
  console.log(`==================================================================\n`)
}

main()
