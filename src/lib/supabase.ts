import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error('Missing Supabase environment variables (see .env.example)')
}

export const supabase = createClient(url, anonKey)

// ponytail: service-role client for trusted server code only (payments, webhooks).
// Bypasses RLS — never import this into client components or 'use client' code.
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}
