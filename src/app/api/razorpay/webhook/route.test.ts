import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  rpc: vi.fn(),
  sendPaidOrderEmails: vi.fn(),
  sendPaymentReviewEmails: vi.fn(),
}))

vi.mock('@/lib/razorpay-signature', () => ({
  verifyRazorpaySignature: () => true,
}))

vi.mock('@/lib/email', () => ({
  sendPaidOrderEmails: mocks.sendPaidOrderEmails,
  sendPaymentReviewEmails: mocks.sendPaymentReviewEmails,
}))

vi.mock('@/lib/supabase', () => ({
  createServiceClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({
            data: { id: 'order-1', status: 'pending', total: 1250 },
            error: null,
          }),
        }),
      }),
    }),
    rpc: mocks.rpc,
  }),
}))

beforeEach(() => {
  vi.resetModules()
  vi.stubEnv('RAZORPAY_WEBHOOK_SECRET', 'webhook-test-secret')
  mocks.rpc.mockReset().mockResolvedValue({
    data: { ok: true, applied: true, review_required: false },
    error: null,
  })
  mocks.sendPaidOrderEmails.mockReset().mockResolvedValue({ ok: true })
  mocks.sendPaymentReviewEmails.mockReset().mockResolvedValue({ ok: true })
})

describe('Razorpay webhook settlement identity', () => {
  it('acknowledges order.paid without settling when no payment ID is present', async () => {
    const { POST } = await import('./route')
    const request = new Request('https://store.test/api/razorpay/webhook', {
      method: 'POST',
      headers: { 'x-razorpay-signature': 'valid' },
      body: JSON.stringify({
        event: 'order.paid',
        payload: { order: { entity: { id: 'rzp-order-1', amount_paid: 125000, currency: 'INR' } } },
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, ignored: 'payment_id_missing' })
    expect(mocks.rpc).not.toHaveBeenCalled()
    expect(mocks.sendPaidOrderEmails).not.toHaveBeenCalled()
  })

  it('settles payment.captured with its concrete provider payment ID', async () => {
    const { POST } = await import('./route')
    const request = new Request('https://store.test/api/razorpay/webhook', {
      method: 'POST',
      headers: { 'x-razorpay-signature': 'valid' },
      body: JSON.stringify({
        event: 'payment.captured',
        payload: { payment: { entity: {
          id: 'pay-1', order_id: 'rzp-order-1', amount: 125000, currency: 'INR',
        } } },
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mocks.rpc).toHaveBeenCalledWith('mark_order_paid', {
      p_order_id: 'order-1',
      p_payment_id: 'pay-1',
    })
    expect(mocks.sendPaidOrderEmails).toHaveBeenCalledWith('order-1')
  })
})
