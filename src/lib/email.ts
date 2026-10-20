// Resend transactional email. No-op unless RESEND_API_KEY is configured —
// dev/test environments run with emails disabled.
//
// Every send is best-effort: a Resend outage must never fail a payment, an
// order write or a signup. Failures are logged and reported as { ok: false }.

import { siteUrl } from './site'

type SendParams = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

const BRAND = "Sumam's Boutique"
const COPPER = '#BF5E18'
const INK = '#1C0A06'
const MUTED = '#6B5238'
const LINE = '#DCC9A8'
const CREAM = '#FDFBF7'

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  )

const rupees = (n: number) => '₹' + Number(n || 0).toLocaleString('en-IN')

export async function sendEmail({ to, subject, html, replyTo }: SendParams): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false }

  const from = process.env.EMAIL_FROM || `${BRAND} <onboarding@resend.dev>`
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
      // A hung request must not stall the webhook or a server action.
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      console.error('[email] Resend rejected send:', res.status, await res.text().catch(() => ''))
    }
    return { ok: res.ok }
  } catch (err) {
    console.error('[email] send failed:', err instanceof Error ? err.message : err)
    return { ok: false }
  }
}

/* ── Shared shell ────────────────────────────────────────────────────────────
   Table-based so it survives Gmail/Outlook's CSS stripping. */

function shell(inner: string): string {
  return `<div style="margin:0;padding:24px 12px;background:#F5EFE6;">
  <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;margin:0 auto;background:${CREAM};border-top:3px solid ${COPPER};padding:36px 32px;color:${INK};line-height:1.6;">
    <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COPPER};margin-bottom:20px;">Sumam&apos;s Boutique</div>
    ${inner}
    <div style="border-top:1px solid ${LINE};margin-top:32px;padding-top:18px;font-size:12px;color:${MUTED};">
      <p style="margin:0 0 4px;">Sumam&apos;s Boutique · Nagpur, India · Ships Pan-India</p>
      <p style="margin:0;">Questions? Just reply to this email, or message us on
        <a href="https://wa.me/917020552557" style="color:${COPPER};text-decoration:none;">WhatsApp</a>.</p>
    </div>
  </div>
</div>`
}

function heading(text: string): string {
  return `<h1 style="font-size:22px;font-weight:400;margin:0 0 6px;color:${INK};">${esc(text)}</h1>`
}

function button(href: string, label: string): string {
  return `<a href="${esc(href)}" style="display:inline-block;margin-top:20px;background:${COPPER};color:#FFFFFF;text-decoration:none;font-size:13px;padding:12px 26px;border-radius:999px;">${esc(label)}</a>`
}

/* ── Order confirmation + invoice ─────────────────────────────────────────── */

export type OrderEmailItem = {
  name: string
  quantity: number
  unit_price: number
}

export type OrderEmailParams = {
  to: string
  name: string
  orderId: string
  subtotal: number
  shippingFee: number
  discount: number
  couponCode?: string | null
  total: number
  items: OrderEmailItem[]
  placedAt: string
  shippingAddress?: string
}

/* The short code customers read out on WhatsApp; the full uuid stays internal. */
const shortId = (id: string) => id.slice(0, 8).toUpperCase()

function invoiceRows(items: OrderEmailItem[]) {
  return items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid ${LINE};color:${INK};">${esc(i.name)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid ${LINE};color:${MUTED};text-align:center;">${esc(i.quantity)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${LINE};color:${INK};text-align:right;white-space:nowrap;">${rupees(i.unit_price * i.quantity)}</td>
      </tr>`
    )
    .join('')
}

function totals(p: OrderEmailParams) {
  const row = (label: string, value: string, strong = false) =>
    `<tr>
      <td style="padding:4px 0;color:${strong ? INK : MUTED};font-size:${strong ? '15px' : '13px'};${strong ? 'font-weight:bold;' : ''}">${esc(label)}</td>
      <td style="padding:4px 0;text-align:right;color:${strong ? INK : MUTED};font-size:${strong ? '15px' : '13px'};${strong ? 'font-weight:bold;' : ''}white-space:nowrap;">${esc(value)}</td>
    </tr>`

  return [
    row('Subtotal', rupees(p.subtotal)),
    p.discount > 0 ? row(`Discount${p.couponCode ? ` (${p.couponCode})` : ''}`, '− ' + rupees(p.discount)) : '',
    row('Shipping', p.shippingFee > 0 ? rupees(p.shippingFee) : 'Free'),
    row('Total paid', rupees(p.total), true),
  ].join('')
}

function orderInner(p: OrderEmailParams, title: string, invite: string) {
  return `${heading(`Thank you, ${p.name}.`)}
    <p style="color:${MUTED};font-size:14px;margin:0 0 24px;">${esc(invite)}</p>

    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr><td style="padding:0 0 4px;color:${MUTED};">Order</td><td style="padding:0 0 4px;text-align:right;color:${INK};font-weight:bold;">#${esc(shortId(p.orderId))}</td></tr>
      <tr><td style="padding:0 0 4px;color:${MUTED};">Placed</td><td style="padding:0 0 4px;text-align:right;color:${INK};">${esc(p.placedAt)}</td></tr>
    </table>

    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:22px;">
      <tr>
        <td style="padding:0 0 8px;color:${MUTED};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Item</td>
        <td style="padding:0 0 8px;color:${MUTED};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-align:center;">Qty</td>
        <td style="padding:0 0 8px;color:${MUTED};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-align:right;">Amount</td>
      </tr>
      ${invoiceRows(p.items)}
    </table>

    <table style="width:100%;border-collapse:collapse;margin-top:18px;">${totals(p)}</table>

    ${p.shippingAddress ? `<p style="color:${MUTED};font-size:12px;margin:22px 0 0;white-space:pre-line;">Shipping to:\n${esc(p.shippingAddress)}</p>` : ''}

    <p style="color:${MUTED};font-size:13px;margin:24px 0 0;border-top:1px solid ${LINE};padding-top:18px;">${esc(title)}</p>
    ${button(`${siteUrl()}/account?tab=orders`, 'View your order')}`
}

export function renderOrderConfirmation(p: OrderEmailParams): string {
  return shell(
    orderInner(
      p,
      'We will hand-wrap your pieces and dispatch within 48 hours.',
      'Your order is confirmed and payment has been received. Your invoice is below.'
    )
  )
}

/* Sent when a new order lands, so the boutique hears about it. */
export function renderOrderAlert(p: OrderEmailParams): string {
  return shell(
    orderInner(p, 'Open the admin panel to process this order.', `A new order has been placed by ${p.name}.`)
  )
}

export async function sendOrderConfirmation(params: {
  to: string
  name: string
  orderId: string
  markup: string
}): Promise<{ ok: boolean }> {
  return sendEmail({
    to: params.to,
    subject: `Order confirmed — #${shortId(params.orderId)}`,
    html: params.markup,
    replyTo: process.env.EMAIL_FROM,
  })
}

export async function sendOrderAlert(params: {
  to: string
  orderId: string
  markup: string
}): Promise<{ ok: boolean }> {
  return sendEmail({
    to: params.to,
    subject: `New order #${shortId(params.orderId)}`,
    html: params.markup,
    replyTo: process.env.EMAIL_FROM,
  })
}

/* ── Status updates ───────────────────────────────────────────────────────── */

const STATUS_COPY: Record<string, { subject: string; title: string; body: string }> = {
  processing: {
    subject: 'We are preparing your order',
    title: 'Your order is being prepared',
    body: 'Our team is hand-checking and wrapping your saree. We will let you know as soon as it is on its way.',
  },
  shipped: {
    subject: 'Your order is on its way',
    title: 'Your order has been dispatched',
    body: 'Your parcel has left our atelier and is on its way to you. It usually arrives within 3–7 working days.',
  },
  delivered: {
    subject: 'Your order has been delivered',
    title: 'Delivered — we hope you love it',
    body: 'Your order has been marked as delivered. If anything is not right, just reply to this email and we will make it good.',
  },
  cancelled: {
    subject: 'Your order has been cancelled',
    title: 'Your order was cancelled',
    body: 'This order has been cancelled. If a payment was taken, the refund is processed back to your original payment method.',
  },
  refunded: {
    subject: 'Your refund has been processed',
    title: 'Your refund is on its way',
    body: 'We have processed your refund. It is returned to your original payment method and may take 5–7 working days to appear.',
  },
}

export function renderOrderStatus(p: {
  name: string
  orderId: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  total: number
}): { subject: string; html: string } {
  const copy = STATUS_COPY[p.status]
  const html = shell(`${heading(`Hello, ${p.name}.`)}
    <p style="color:${MUTED};font-size:14px;margin:0 0 22px;">${esc(copy.body)}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr><td style="padding:4px 0;color:${MUTED};">Order</td><td style="padding:4px 0;text-align:right;color:${INK};font-weight:bold;">#${esc(shortId(p.orderId))}</td></tr>
      <tr><td style="padding:4px 0;color:${MUTED};">Amount</td><td style="padding:4px 0;text-align:right;color:${INK};">${rupees(p.total)}</td></tr>
    </table>
    ${button(`${siteUrl()}/account?tab=orders`, 'View your order')}`)

  return { subject: `${copy.subject} — #${shortId(p.orderId)}`, html }
}

/* ── Customer account ─────────────────────────────────────────────────────── */

export function renderWelcome(p: { name?: string | null }): { subject: string; html: string } {
  const who = p.name?.trim() || 'friend'
  return {
    subject: `Welcome to ${BRAND}`,
    html: shell(`${heading(`Welcome, ${who}.`)}
    <p style="color:${MUTED};font-size:14px;margin:0 0 18px;">Your account is ready. Our sarees are woven in Bengal on handlooms that have been in the family for generations — each one is checked and wrapped by hand before it reaches you.</p>
    <p style="color:${MUTED};font-size:14px;margin:0 0 4px;">You can now track orders, save your address book and keep a wishlist.</p>
    ${button(`${siteUrl()}/sarees`, 'Explore the collection')}`),
  }
}

/* ── Newsletter ───────────────────────────────────────────────────────────── */

export function renderNewsletterWelcome(): { subject: string; html: string } {
  return {
    subject: `You are on the list — ${BRAND}`,
    html: shell(`${heading('You are on the list.')}
    <p style="color:${MUTED};font-size:14px;margin:0 0 18px;">Thank you for subscribing. We send word when a new weave arrives, and nothing else — no more than a few times a season.</p>
    ${button(`${siteUrl()}/collections`, 'See what is new')}`),
  }
}
