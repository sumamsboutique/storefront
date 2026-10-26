import { describe, expect, it } from 'vitest'
import { orderErrorText } from './order-errors'

describe('orderErrorText', () => {
  it('maps known stock and authentication failures to customer-safe copy', () => {
    expect(orderErrorText('INSUFFICIENT_STOCK')).toMatch(/not enough stock/i)
    expect(orderErrorText('AUTH_REQUIRED')).toMatch(/sign in/i)
  })

  it('does not expose unknown database or infrastructure errors', () => {
    const error = 'permission denied for relation orders: internal schema details'
    expect(orderErrorText(error)).toBe('We could not place your order. Please try again.')
    expect(orderErrorText(error)).not.toContain('permission denied')
  })
})
