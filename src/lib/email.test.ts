import { describe, it, expect } from 'vitest'
import { renderOrderConfirmation, renderOrderStatus, renderWelcome, type OrderEmailParams } from './email'

const base: OrderEmailParams = {
  to: 'buyer@example.com',
  name: 'Ishita Roy',
  orderId: '5c635e7d-70c6-4a64-b042-45c7fd6bab39',
  subtotal: 9000,
  shippingFee: 0,
  discount: 0,
  couponCode: null,
  total: 9000,
  items: [{ name: 'Kardana Jamdani', quantity: 2, unit_price: 3700 }],
  placedAt: '20 October 2026',
}

describe('renderOrderConfirmation', () => {
  it('renders a short order code, not the raw uuid', () => {
    const html = renderOrderConfirmation(base)
    expect(html).toContain('#5C635E7D')
    expect(html).not.toContain('5c635e7d-70c6')
  })

  it('multiplies unit price by quantity', () => {
    // 2 x 3700 = 7400
    expect(renderOrderConfirmation(base)).toContain('₹7,400')
  })

  it('shows free shipping instead of ₹0', () => {
    const html = renderOrderConfirmation(base)
    expect(html).toContain('Free')
    expect(html).not.toContain('₹0')
  })

  it('omits the discount row unless a discount applies', () => {
    expect(renderOrderConfirmation(base)).not.toContain('Discount')
  })

  it('shows the coupon code when a discount applies', () => {
    const html = renderOrderConfirmation({ ...base, discount: 500, couponCode: 'WELCOME500', total: 8500 })
    expect(html).toContain('WELCOME500')
    expect(html).toContain('₹500')
  })

  it('escapes HTML in customer-supplied fields', () => {
    // The payload comes from the checkout form, so it is untrusted.
    const html = renderOrderConfirmation({
      ...base,
      name: '<script>alert(1)</script>',
      items: [{ name: 'Saree "Deluxe" <b>x</b>', quantity: 1, unit_price: 100 }],
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&quot;Deluxe&quot;')
  })
})

describe('renderOrderStatus', () => {
  it('writes status-appropriate copy', () => {
    const shipped = renderOrderStatus({ name: 'Ishita', orderId: base.orderId, status: 'shipped', total: 9000 })
    expect(shipped.subject).toMatch(/on its way/i)
    expect(shipped.html).toContain('#5C635E7D')
  })

  it('has copy for every notifiable status', () => {
    for (const status of ['processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const) {
      const out = renderOrderStatus({ name: 'Ishita', orderId: base.orderId, status, total: 9000 })
      expect(out.subject.length).toBeGreaterThan(0)
      expect(out.html).toContain('Sumam&apos;s Boutique')
    }
  })
})

describe('renderWelcome', () => {
  it('falls back to a friendly salutation with no name', () => {
    expect(renderWelcome({ name: null }).html).toContain('Welcome, friend.')
  })
})
