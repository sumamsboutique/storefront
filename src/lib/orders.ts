'use server'

import { z } from 'zod'
import { supabase } from './supabase'
import { createAdminServerClient } from './admin/auth'
import { couponErrorText } from './coupon-codes'
import { orderErrorText } from './order-errors'
import { AddressSchema } from './schemas'

const ItemSchema = z.object({
  product_id: z.string().uuid(),
  variant_id: z.string().uuid().nullable().optional(),
  quantity: z.number().int().min(1).max(99),
})

const PayloadSchema = z.object({
  address: AddressSchema,
  items: z.array(ItemSchema).min(1, 'Your bag is empty'),
  coupon: z.string().trim().max(40).optional().nullable(),
})

export type PlaceOrderResult = { orderId: string } | { error: string }

export async function getStoreCommerce(): Promise<{
  freeShippingThreshold: number
  flatShippingRate: number
}> {
  if (!supabase) return { freeShippingThreshold: 10000, flatShippingRate: 199 }
  const { data } = await supabase
    .from('store_settings')
    .select('value')
    .eq('key', 'commerce')
    .maybeSingle()
  const commerce = data?.value as { free_shipping_threshold?: number; flat_shipping_rate?: number } | undefined
  // `||` treated an admin-configured 0 as "unset" and fell back to ₹199/₹10,000.
  const rate = (value: unknown, fallback: number) => {
    if (value === null || value === undefined || value === '') return fallback
    const n = Number(value)
    return Number.isFinite(n) && n >= 0 ? n : fallback
  }
  return {
    freeShippingThreshold: rate(commerce?.free_shipping_threshold, 10000),
    flatShippingRate: rate(commerce?.flat_shipping_rate, 199),
  }
}

export async function placeOrder(input: unknown): Promise<PlaceOrderResult> {
  const parsed = PayloadSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid order details.' }
  }

  const { address, items, coupon } = parsed.data
  const serverClient = await createAdminServerClient()
  const { data: { user } } = await serverClient.auth.getUser()
  if (!user) {
    return { error: 'Please sign in or create an account to place your order.' }
  }
  const { data, error } = await serverClient.rpc('create_pending_order', {
    p_address: {
      name: address.name,
      phone: address.phone,
      email: address.email,
      address: address.address,
      city: address.city,
      pin: address.pin,
    },
    p_items: items,
    p_coupon: coupon || null,
  })

  if (error) {
    return { error: orderErrorText(error.message) }
  }
  // coupon failures surface as { ok:false, error } inside the RPC result
  if (data && typeof data === 'object' && 'ok' in data && (data as { ok: boolean }).ok === false) {
    const err = (data as { error?: string }).error || ''
    if (err === 'AUTH_REQUIRED') {
      return { error: 'Please sign in or create an account to place your order.' }
    }
    return { error: couponErrorText(err) }
  }
  if (!data?.order_id) return { error: 'Could not create your order.' }

  return { orderId: data.order_id }
}
