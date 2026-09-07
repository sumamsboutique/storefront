import { describe, it, expect } from 'vitest'
import { createHmac } from 'crypto'
import { verifyRazorpaySignature } from './razorpay-signature'

function hmac(body: string, secret: string): string {
  return createHmac('sha256', secret).update(body).digest('hex')
}

describe('verifyRazorpaySignature', () => {
  const secret = 'key_secret'
  const body = 'order_abc|pay_123'

  it('accepts a valid signature', () => {
    expect(verifyRazorpaySignature(body, secret, hmac(body, secret))).toBe(true)
  })

  it('rejects a tampered body', () => {
    expect(verifyRazorpaySignature(`${body}x`, secret, hmac(body, secret))).toBe(false)
  })

  it('rejects a bogus signature', () => {
    expect(verifyRazorpaySignature(body, secret, 'deadbeef')).toBe(false)
  })
})