'use server'

import { supabase } from './supabase'

export type StoreSocials = {
  instagram?: string
  facebook?: string
  youtube?: string
  whatsapp?: string
}

// Public read of the admin Store Settings social links. 60s in-memory cache
// mirrors data.ts so every page's footer doesn't hit the DB.
let cached: { data: StoreSocials; expiresAt: number } | null = null

export async function getStoreSocials(): Promise<StoreSocials> {
  if (cached && cached.expiresAt > Date.now()) return cached.data
  const empty: StoreSocials = {}
  if (!supabase) return empty
  try {
    const [{ data: social }, { data: general }] = await Promise.all([
      supabase.from('store_settings').select('value').eq('key', 'social').maybeSingle(),
      supabase.from('store_settings').select('value').eq('key', 'general').maybeSingle(),
    ])
    const s = (social?.value ?? {}) as { instagram?: string; facebook?: string; youtube?: string }
    const g = (general?.value ?? {}) as { whatsapp?: string }
    const data: StoreSocials = {
      instagram: s.instagram || undefined,
      facebook: s.facebook || undefined,
      youtube: s.youtube || undefined,
      whatsapp: g.whatsapp || undefined,
    }
    cached = { data, expiresAt: Date.now() + 60_000 }
    return data
  } catch {
    return empty
  }
}
