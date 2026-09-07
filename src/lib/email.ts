// Resend transactional email. No-op unless RESEND_API_KEY is configured —
// dev/test environments run with emails disabled.

type SendParams = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendParams): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false }

  const from = process.env.EMAIL_FROM || "Sumam's Boutique <onboarding@resend.dev>"
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  })
  return { ok: res.ok }
}

// Order confirmation sent after a payment is captured (webhook-driven).
export async function sendOrderConfirmation(params: {
  to: string
  name: string
  orderId: string
  total: number
}): Promise<{ ok: boolean }> {
  const totalStr = '₹' + Number(params.total).toLocaleString('en-IN')
  const html = `
    <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #FDFBF7; border-top: 3px solid #BF5E18;">
      <h1 style="color: #1C0A06; font-weight: 400; font-size: 22px; margin: 0 0 4px;">Thank you, ${params.name}.</h1>
      <p style="color: #6B5238; font-size: 14px; margin: 0 0 24px;">Your order from Sumam&apos;s Boutique is confirmed.</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1C0A06;">
        <tr><td style="padding: 8px 0; color: #6B5238;">Order ID</td><td style="text-align: right;">${params.orderId}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5238;">Total paid</td><td style="text-align: right; font-weight: bold;">${totalStr}</td></tr>
      </table>
      <p style="color: #6B5238; font-size: 13px; margin-top: 28px;">We will hand-wrap your pieces and dispatch within 48 hours. For any questions, just reply to this email.</p>
    </div>`

  return sendEmail({
    to: params.to,
    subject: `Order confirmed — ${params.orderId.slice(0, 8)}`,
    html,
    replyTo: process.env.EMAIL_FROM,
  })
}