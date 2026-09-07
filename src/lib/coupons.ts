'use server'

import { z } from 'zod'
import { supabase } from './supabase'
import { couponErrorText } from './coupon-codes'

export type CouponLookup = {
  ok: true
  discount: number
  code: string
} | {
  ok: false
  error: string
  code: string
}

const CodeSchema = z.string().trim().min(2).max(40)

// Server-only coupon validation. The coupon_quote RPC is the single source of
// truth for discount math (reused by create_pending_order at checkout time).
export async function validateCoupon(code: string, subtotal: number): Promise<CouponLookup> {
  const parsed = CodeSchema.safeParse(code)
  if (!parsed.success) return { ok: false, error: 'Invalid coupon code.', code: code.toUpperCase() }

  const { data, error } = await supabase.rpc('coupon_quote', {
    p_code: parsed.data.toUpperCase(),
    p_subtotal: Math.max(0, Math.round(subtotal)),
  })

  if (error || !data) {
    return { ok: false, error: 'Could not check coupon right now. Please try again.', code: parsed.data.toUpperCase() }
  }
  const quote = data as { ok: boolean; error?: string; discount?: number; code?: string }
  return {
    ok: quote.ok === true,
    discount: quote.ok ? Number(quote.discount ?? 0) : 0,
    code: parsed.data.toUpperCase(),
    error: quote.ok ? '' : couponErrorText(quote.error),
  }
}