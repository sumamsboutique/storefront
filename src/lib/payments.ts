'use server'

import { z } from 'zod'
import { createServiceClient } from './supabase'
import { createAdminServerClient } from './admin/auth'
import { verifyRazorpaySignature } from './razorpay-signature'
import { sendPaidOrderEmails, sendPaymentReviewEmails } from './email'

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
    signal: AbortSignal.timeout(15_000),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    // Do not return the provider's raw response body through a Server Action.
    // It is useful to log the status, but the checkout only needs a safe error.
    console.error(`[payments] Razorpay ${path} failed (${res.status})`)
    throw new Error(`Razorpay request failed (${res.status})`)
  }
  return res.json()
}

async function razorpayGet<T>(path: string): Promise<T> {
  const res = await fetch(`${RAZORPAY_API}${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) throw new Error(`Razorpay payment lookup failed (${res.status})`)
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

  // This Server Action is a public POST endpoint. Never use the service role
  // until the caller is authenticated, and derive ownership from that session.
  const sessionClient = await createAdminServerClient()
  const { data: { user } } = await sessionClient.auth.getUser()
  if (!user) return { error: 'Please sign in to pay for this order.' }

  const supabase = service()
  if (!supabase) return { error: 'Payment processing is not configured.' }

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, status, total, payment_reference')
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single()
  if (error || !order) return { error: 'Could not find your order.' }
  if (order.status !== 'pending') return { error: 'This order is not payable.' }

  const amountPaise = Math.round(Number(order.total) * 100)
  // Razorpay rejects anything under 100 paise.
  if (amountPaise < 100) return { error: 'Invalid order total.' }

  // A retry after dismissing Checkout must reuse the provider order already
  // linked to this pending database order, or an older open modal could capture
  // against a reference that has since been overwritten.
  if (typeof order.payment_reference === 'string' && order.payment_reference.length > 0) {
    return { razorpayOrderId: order.payment_reference, amountPaise }
  }

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
    console.error('[payments] Razorpay order creation failed:', err instanceof Error ? err.message : 'unknown error')
    return { error: 'Could not create a payment session. Please try again.' }
  }

  const { data: linkedOrder, error: updateError } = await supabase
    .from('orders')
    .update({ payment_provider: 'razorpay', payment_reference: rzp.id, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .is('payment_reference', null)
    .select('id')
    .maybeSingle()
  if (updateError || !linkedOrder) return { error: 'This order is no longer payable.' }

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

  // The webhook is the provider-facing path; this callback action must be
  // scoped to the signed-in owner before it can use the service role.
  const sessionClient = await createAdminServerClient()
  const { data: { user } } = await sessionClient.auth.getUser()
  if (!user) return { error: 'Please sign in to verify this payment.' }

  if (!verifyRazorpaySignature(`${razorpay_order_id}|${razorpay_payment_id}`, keySecret!, razorpay_signature)) {
    return { error: 'Payment verification failed. Please contact support.' }
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('id, status, total, payment_id')
    .eq('payment_reference', razorpay_order_id)
    .eq('user_id', user.id)
    .single()
  if (error || !order) return { error: 'Could not find your order.' }
  if (order.status === 'paid' && order.payment_id === razorpay_payment_id) {
    return { ok: true, orderId: order.id }
  }
  if (order.status !== 'pending' && order.status !== 'payment_review' && order.status !== 'paid') {
    return { error: 'This order is no longer awaiting payment.' }
  }

  // A valid Checkout signature authenticates the callback, but the payment can
  // still be only authorized. Fulfill only after Razorpay's trusted API reports
  // a captured payment for this exact order, amount, and INR currency.
  let payment: { status?: string; captured?: boolean; order_id?: string; amount?: number; currency?: string }
  try {
    payment = await razorpayGet(`/payments/${encodeURIComponent(razorpay_payment_id)}`)
  } catch {
    return { error: 'Could not confirm payment status with Razorpay. Please retry shortly.' }
  }
  if (
    payment.status !== 'captured' ||
    payment.captured !== true ||
    payment.order_id !== razorpay_order_id ||
    payment.amount !== Math.round(Number(order.total) * 100) ||
    payment.currency !== 'INR'
  ) {
    return { error: 'Razorpay has not confirmed this payment as captured. Please retry shortly.' }
  }

  // Single atomic transition; idempotent if the webhook got there first.
  const { data: marked, error: markErr } = await supabase.rpc('mark_order_paid', {
    p_order_id: order.id,
    p_payment_id: razorpay_payment_id,
  })
  if (markErr) {
    console.error('[payments] mark_order_paid failed:', markErr.message)
    return { error: 'Payment was received but could not be recorded yet. Please contact support with your order number.' }
  }

  if (marked?.review_required) {
    if (marked.applied) await sendPaymentReviewEmails(order.id)
    if (marked.additional_capture) {
      return { error: 'An additional payment was received for this order. Our team will reconcile it and contact you shortly.' }
    }
    return { error: 'Payment was received. Our team is reviewing your order and will contact you shortly.' }
  }

  if (marked?.applied) {
    await sendPaidOrderEmails(order.id)
  }

  return { ok: true, orderId: order.id }
}
