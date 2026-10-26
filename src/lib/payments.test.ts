import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createHmac } from 'node:crypto'

const mocks = vi.hoisted(() => ({
  user: { id: 'customer-1' } as { id: string } | null,
  order: { id: 'order-1', status: 'pending', total: 1250 } as Record<string, unknown> | null,
  where: [] as [string, unknown][],
  updateWhere: [] as [string, unknown][],
  rpcCalls: [] as unknown[],
  emailCalls: [] as string[],
  fetchResponse: { id: 'rzp-order-1' },
  payment: {
    status: 'captured',
    captured: true,
    order_id: 'rzp-order-1',
    amount: 125000,
    currency: 'INR',
  } as Record<string, unknown>,
}))

vi.mock('./admin/auth', () => ({
  createAdminServerClient: async () => ({
    auth: { getUser: async () => ({ data: { user: mocks.user }, error: null }) },
  }),
}))

vi.mock('./supabase', () => ({
  createServiceClient: () => ({
    from: () => ({
      select: () => {
        const filters: [string, unknown][] = []
        const query = {
          eq: (key: string, value: unknown) => {
            filters.push([key, value])
            mocks.where.push([key, value])
            return query
          },
          single: async () => ({
            data: filters.some(([key, value]) => key === 'user_id' && value !== mocks.user?.id)
              ? null
              : mocks.order,
            error: null,
          }),
        }
        return query
      },
      update: () => {
        const filters: [string, unknown][] = []
        const query = {
          eq: (key: string, value: unknown) => {
            filters.push([key, value])
            mocks.updateWhere.push([key, value])
            return query
          },
          is: (key: string, value: unknown) => {
            filters.push([key, value])
            mocks.updateWhere.push([key, value])
            return query
          },
          select: () => ({
            maybeSingle: async () => ({
              data: filters.some(([key, value]) => key === 'user_id' && value !== mocks.user?.id)
                ? null
                : { id: 'order-1' },
              error: null,
            }),
          }),
        }
        return query
      },
    }),
    rpc: async (...args: unknown[]) => {
      mocks.rpcCalls.push(args)
      return { data: { applied: true }, error: null }
    },
  }),
}))

vi.mock('./email', () => ({ sendPaidOrderEmails: async (id: string) => { mocks.emailCalls.push(id) } }))

beforeEach(() => {
  vi.resetModules()
  vi.stubEnv('RAZORPAY_KEY_ID', 'rzp_test_key')
  vi.stubEnv('RAZORPAY_KEY_SECRET', 'test_secret')
  mocks.user = { id: 'customer-1' }
  mocks.order = { id: 'order-1', status: 'pending', total: 1250 }
  mocks.where = []
  mocks.updateWhere = []
  mocks.rpcCalls = []
  mocks.emailCalls = []
  mocks.fetchResponse = { id: 'rzp-order-1' }
  mocks.payment = {
    status: 'captured',
    captured: true,
    order_id: 'rzp-order-1',
    amount: 125000,
    currency: 'INR',
  }
  vi.stubGlobal('fetch', vi.fn(async (input: string | URL | Request) => {
    const url = String(input)
    return {
      ok: true,
      json: async () => url.includes('/payments/') ? mocks.payment : mocks.fetchResponse,
    }
  }))
})

describe('Razorpay actions enforce order ownership', () => {
  it('does not call the service provider when there is no signed-in customer', async () => {
    mocks.user = null
    const { createRazorpayOrder } = await import('./payments')
    expect(await createRazorpayOrder('00000000-0000-0000-0000-000000000001')).toEqual({
      error: 'Please sign in to pay for this order.',
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('scopes order lookup and payment-reference update to the session customer', async () => {
    const { createRazorpayOrder } = await import('./payments')
    const result = await createRazorpayOrder('00000000-0000-0000-0000-000000000001')
    expect(result).toEqual({ razorpayOrderId: 'rzp-order-1', amountPaise: 125000 })
    expect(mocks.where).toContainEqual(['user_id', 'customer-1'])
    expect(mocks.updateWhere).toEqual([
      ['id', '00000000-0000-0000-0000-000000000001'],
      ['user_id', 'customer-1'],
      ['status', 'pending'],
      ['payment_reference', null],
    ])
  })

  it('does not mark a payment belonging to another customer as paid', async () => {
    const orderId = 'rzp-order-1'
    const paymentId = 'pay-1'
    const signature = createHmac('sha256', 'test_secret')
      .update(`${orderId}|${paymentId}`)
      .digest('hex')
    mocks.where = []
    // The simulated row lookup returns no row if the requested owner differs.
    mocks.user = { id: 'different-customer' }
    mocks.order = null
    const { verifyRazorpayPayment } = await import('./payments')
    const result = await verifyRazorpayPayment({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    })
    expect(result).toEqual({ error: 'Could not find your order.' })
    expect(mocks.where).toContainEqual(['user_id', 'different-customer'])
    expect(mocks.rpcCalls).toHaveLength(0)
    expect(mocks.emailCalls).toHaveLength(0)
  })

  it('marks paid only after Razorpay confirms the matching captured payment', async () => {
    const orderId = 'rzp-order-1'
    const paymentId = 'pay-1'
    const signature = createHmac('sha256', 'test_secret')
      .update(`${orderId}|${paymentId}`)
      .digest('hex')
    const { verifyRazorpayPayment } = await import('./payments')
    const result = await verifyRazorpayPayment({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    })
    expect(result).toEqual({ ok: true, orderId: 'order-1' })
    expect(fetch).toHaveBeenCalledWith(
      'https://api.razorpay.com/v1/payments/pay-1',
      expect.objectContaining({ method: 'GET' }),
    )
    expect(mocks.rpcCalls).toHaveLength(1)
    expect(mocks.emailCalls).toEqual(['order-1'])
  })

  it('does not mark an authorized or mismatched payment as paid', async () => {
    mocks.payment = { status: 'authorized', captured: false, order_id: 'rzp-order-1', amount: 125000, currency: 'INR' }
    const orderId = 'rzp-order-1'
    const paymentId = 'pay-1'
    const signature = createHmac('sha256', 'test_secret')
      .update(`${orderId}|${paymentId}`)
      .digest('hex')
    const { verifyRazorpayPayment } = await import('./payments')
    const result = await verifyRazorpayPayment({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    })
    expect(result).toEqual({ error: 'Razorpay has not confirmed this payment as captured. Please retry shortly.' })
    expect(mocks.rpcCalls).toHaveLength(0)
    expect(mocks.emailCalls).toHaveLength(0)
  })
})
