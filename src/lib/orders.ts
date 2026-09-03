'use server'

import { z } from 'zod'
import { supabase } from './supabase'

const AddressSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(120),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').max(160),
  address: z.string().trim().min(5, 'Address is required').max(300),
  city: z.string().trim().min(2, 'City is required').max(80),
  pin: z.string().trim().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit PIN'),
})

const ItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
})

const PayloadSchema = z.object({
  address: AddressSchema,
  items: z.array(ItemSchema).min(1, 'Your bag is empty'),
})

export type PlaceOrderResult = { orderId: string } | { error: string }

export async function placeOrder(input: unknown): Promise<PlaceOrderResult> {
  const parsed = PayloadSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid order details.' }
  }

  const { address, items } = parsed.data
  const { data, error } = await supabase.rpc('create_pending_order', {
    p_address: {
      name: address.name,
      phone: address.phone,
      email: address.email,
      address: address.address,
      city: address.city,
      pin: address.pin,
    },
    p_items: items,
  })

  if (error) return { error: error.message }
  if (!data?.order_id) return { error: 'Could not create your order.' }

  return { orderId: data.order_id }
}
