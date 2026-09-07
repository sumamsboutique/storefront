import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ponytail: nullable client instead of throwing at import — lets data.ts fall back
// to CATALOG when env vars are absent (CI build, pre-config), same as createServiceClient.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

// ponytail: service-role client for trusted server code only (payments, webhooks).
// Bypasses RLS — never import this into client components or 'use client' code.
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}
