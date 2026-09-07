'use server'

import { z } from 'zod'
import { createServiceClient } from './supabase'
import { verifyRazorpaySignature } from './razorpay-signature'

const keyId = process.env.RAZORPAY_KEY_ID
const keySecret = process.env.RAZORPAY_KEY_SECRET

const RAZORPAY_API = 'https://api.razorpay.com/v1'

function razorpayConfigured() {
  return Boolean(keyId && keySecret)
}

function service() {
  return createServiceClient()
}

async function razorpayPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${RAZORPAY_API}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Razorpay ${path} failed (${res.status}) ${detail}`)
  }
  return res.json()
}

export type CreateRazorpayOrderResult =
  | { razorpayOrderId: string; amountPaise: number }
  | { error: string }

// Creates a Razorpay order worth the DB-recorded total (never the client's guess)
// and links it to the Supabase order via payment_reference.
export async function createRazorpayOrder(orderId: string): Promise<CreateRazorpayOrderResult> {
  if (!z.string().uuid().safeParse(orderId).success) return { error: 'Invalid order id.' }
  if (!razorpayConfigured()) return { error: 'razorpay_not_configured' }
  const supabase = service()
  if (!supabase) return { error: 'Payment processing is not configured.' }

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, status, total')
    .eq('id', orderId)
    .single()
  if (error || !order) return { error: 'Could not find your order.' }
  if (order.status !== 'pending') return { error: 'This order is not payable.' }

  const amountPaise = Math.round(Number(order.total) * 100)
  if (!amountPaise || amountPaise <= 0) return { error: 'Invalid order total.' }

  let rzp: { id: string }
  try {
    rzp = await razorpayPost<{ id: string }>('/orders', {
      amount: amountPaise,
      currency: 'INR',
      receipt: orderId,
      payment_capture: 1,
      notes: { order_id: orderId },
    })
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not reach the payment gateway.' }
  }

  const { error: updateError } = await supabase
    .from('orders')
    .update({ payment_provider: 'razorpay', payment_reference: rzp.id, updated_at: new Date().toISOString() })
    .eq('id', orderId)
  if (updateError) return { error: updateError.message }

  return { razorpayOrderId: rzp.id, amountPaise }
}

const VerifyPaymentSchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})

export type VerifyRazorpayResult = { ok: true; orderId: string } | { error: string }

// Confirms the checkout.js success callback by checking Razorpay's HMAC signature,
// then flips the order to 'paid'. Idempotent — safe to call twice (webhook too).
export async function verifyRazorpayPayment(input: unknown): Promise<VerifyRazorpayResult> {
  const parsed = VerifyPaymentSchema.safeParse(input)
  if (!parsed.success) return { error: 'Invalid payment details.' }
  if (!razorpayConfigured()) return { error: 'razorpay_not_configured' }
  const supabase = service()
  if (!supabase) return { error: 'Payment processing is not configured.' }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = parsed.data

  if (!verifyRazorpaySignature(`${razorpay_order_id}|${razorpay_payment_id}`, keySecret!, razorpay_signature)) {
    return { error: 'Payment verification failed. Please contact support.' }
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, status')
    .eq('payment_reference', razorpay_order_id)
    .single()
  if (error || !order) return { error: 'Could not find your order.' }
  if (order.status !== 'pending') return { ok: true, orderId: order.id }

  const { error: updateError } = await supabase
    .from('orders')
    .update({ status: 'paid', payment_reference: razorpay_payment_id, updated_at: new Date().toISOString() })
    .eq('id', order.id)
  if (updateError) return { error: updateError.message }

  return { ok: true, orderId: order.id }
}