'use server'

import { z } from 'zod'
import { createAdminServerClient } from './admin/auth'
import { AddressSchema } from './orders'

export type OrderLine = {
  product_id: string
  quantity: number
  unit_price: number
  name: string
}

export type CustomerOrder = {
  id: string
  status: string
  subtotal: number
  shipping_fee: number
  discount: number
  coupon_code: string | null
  total: number
  shipping_address: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    pin: string
  }
  created_at: string
  items: OrderLine[]
}

export type SavedAddress = {
  id: string
  label: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  pin: string
}

export type ActionResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export async function getMyOrders(): Promise<ActionResult<CustomerOrder[]>> {
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase.rpc('get_customer_orders')
  if (error) return { ok: false, error: 'Could not load your orders.' }
  return { ok: true, data: (data ?? []) as CustomerOrder[] }
}

export async function getSavedAddresses(): Promise<ActionResult<SavedAddress[]>> {
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase
    .from('customer_addresses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { ok: false, error: 'Could not load your addresses.' }
  return { ok: true, data: (data ?? []) as SavedAddress[] }
}

const SaveAddressSchema = AddressSchema.extend({
  label: z.string().trim().min(1, 'Label is required').max(30).default('Home'),
})

export async function saveAddress(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsed = SaveAddressSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid address.' }
  }
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase
    .from('customer_addresses')
    .insert({
      label: parsed.data.label,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      address: parsed.data.address,
      city: parsed.data.city,
      pin: parsed.data.pin,
    })
    .select('id')
    .single()
  if (error) return { ok: false, error: 'Could not save your address.' }
  return { ok: true, data: { id: data.id } }
}

const DeleteAddressSchema = z.object({ id: z.string().uuid() })

export async function deleteAddress(input: unknown): Promise<ActionResult<Record<string, never>>> {
  const parsed = DeleteAddressSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Invalid address id.' }
  const supabase = await createAdminServerClient()
  const { error } = await supabase.from('customer_addresses').delete().eq('id', parsed.data.id)
  if (error) return { ok: false, error: 'Could not delete your address.' }
  return { ok: true, data: {} }
}

const SubmitReviewSchema = z.object({
  productId: z.string().uuid('Invalid product.'),
  rating: z.number().int().min(1, 'Choose 1–5 stars.').max(5),
  comment: z.string().trim().max(1000, 'Review must be under 1000 characters.'),
})

export type ReviewResult = ActionResult<Record<string, never>>

export async function submitReview(input: unknown): Promise<ReviewResult> {
  const parsed = SubmitReviewSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid review.' }
  const supabase = await createAdminServerClient()
  const { data, error } = await supabase.rpc('submit_product_review', {
    p_product_id: parsed.data.productId,
    p_rating: parsed.data.rating,
    p_comment: parsed.data.comment,
  })
  if (error) return { ok: false, error: 'Could not submit your review.' }
  const res = data as { ok: boolean; error?: string }
  if (!res.ok) return { ok: false, error: res.error ?? 'Could not submit your review.' }
  return { ok: true, data: {} }
}