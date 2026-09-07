import { createHmac, timingSafeEqual } from 'crypto'

export function verifyRazorpaySignature(body: string, secret: string, signature: string): boolean {
  const expected = Buffer.from(createHmac('sha256', secret).update(body).digest('hex'), 'hex')
  const actual = Buffer.from(signature, 'hex')
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}