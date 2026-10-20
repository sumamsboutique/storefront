import { createServiceClient } from '@/lib/supabase'
import { verifyRazorpaySignature } from '@/lib/razorpay-signature'
import {
  renderOrderAlert,
  renderOrderConfirmation,
  sendOrderAlert,
  sendOrderConfirmation,
  sendPaidOrderEmails,
} from '@/lib/email'

// Mirrors the client-side verify path: confirms a Razorpay success event reached
// the server even when the customer's tab is closed mid-payment.
export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) {
    return Response.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const raw = await request.text()
  const signature = request.headers.get('x-razorpay-signature') ?? ''
  if (!verifyRazorpaySignature(raw, webhookSecret, signature)) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: {
    event?: string
    payload?: {
      payment?: { entity?: { id?: string; order_id?: string } }
      order?: { entity?: { id?: string } }
    }
  }
  try {
    event = JSON.parse(raw) as typeof event
  } catch {
    return Response.json({ error: 'Malformed payload' }, { status: 400 })
  }
  if (event.event !== 'payment.captured' && event.event !== 'order.paid') {
    return Response.json({ ok: true })
  }

  const payment = event.payload?.payment?.entity
  const orderEntity = event.payload?.order?.entity
  const rzpOrderId = payment?.order_id ?? orderEntity?.id
  const paymentId = payment?.id ?? orderEntity?.id
  if (!rzpOrderId) return Response.json({ ok: true })

  const supabase = createServiceClient()
  if (!supabase) return Response.json({ error: 'Service not configured' }, { status: 500 })

  const { data: order } = await supabase
    .from('orders')
    .select('id, status, subtotal, shipping_fee, discount, coupon_code, total, shipping_address')
    .eq('payment_reference', rzpOrderId)
    .single()

  if (order && order.status === 'pending') {
    // Single atomic transition: flips to paid, decrements stock and consumes
    // the coupon exactly once. A concurrent client-verify call is idempotent.
    const { data: marked, error: markErr } = await supabase.rpc('mark_order_paid', {
      p_order_id: order.id,
      p_payment_id: paymentId,
    })
    if (markErr) {
      console.error('[razorpay webhook] mark_order_paid failed', markErr.message)
      return Response.json({ error: 'Could not record payment' }, { status: 500 })
    }
    // Another caller already applied it: emails were sent by that path.
    if (!marked?.applied) return Response.json({ ok: true })

    // Send emails via shared helper — exactly once regardless of which path finished first.
    await sendPaidOrderEmails(order.id)

    return Response.json({ ok: true })
  }
  return Response.json({ ok: true })
}