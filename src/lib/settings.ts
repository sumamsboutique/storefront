'use server'

import { supabase } from './supabase'

export type StoreSocials = {
  instagram?: string
  facebook?: string
  youtube?: string
  whatsapp?: string
  /** PDP "Chat on WhatsApp" button; anything but `false` keeps it visible. */
  pdpWhatsapp?: boolean
}

// Public read of the admin Store Settings social links. 60s in-memory cache
// mirrors data.ts so every page's footer doesn't hit the DB.
let cached: { data: StoreSocials; expiresAt: number } | null = null

/** Drop the 60s cache so a Store Settings save shows up on the next page load. */
export async function clearStoreSettingsCache() {
  cached = null
}

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
    const g = (general?.value ?? {}) as { whatsapp?: string; pdp_whatsapp?: boolean }
    const data: StoreSocials = {
      instagram: s.instagram || undefined,
      facebook: s.facebook || undefined,
      youtube: s.youtube || undefined,
      whatsapp: g.whatsapp || undefined,
      pdpWhatsapp: g.pdp_whatsapp !== false,
    }
    cached = { data, expiresAt: Date.now() + 60_000 }
    return data
  } catch {
    return empty
  }
}
