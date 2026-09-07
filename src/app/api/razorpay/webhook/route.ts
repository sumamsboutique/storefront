import { createServiceClient } from '@/lib/supabase'
import { verifyRazorpaySignature } from '@/lib/razorpay-signature'
import { sendOrderConfirmation } from '@/lib/email'

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
    .select('id, status, total, shipping_address')
    .eq('payment_reference', rzpOrderId)
    .single()

  if (order && order.status === 'pending') {
    await supabase
      .from('orders')
      .update({ status: 'paid', payment_reference: paymentId, updated_at: new Date().toISOString() })
      .eq('id', order.id)

    await supabase.rpc('fulfill_order_stock', { p_order_id: order.id })

    // Confirmation email (only from the webhook — the client verify path
    // never sends, or customers would get duplicates).
    const addr = order.shipping_address as { email?: string; name?: string } | null
    if (addr?.email) {
      await sendOrderConfirmation({
        to: addr.email,
        name: addr.name || 'friend',
        orderId: order.id,
        total: Number(order.total),
      })
    }
  }
  return Response.json({ ok: true })
}