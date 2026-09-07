// Coupon error-code → friendly text. Plain module: imported by both server
// action files (coupons.ts, orders.ts), so it must not be a 'use server' file.

const COUPON_ERROR_TEXT: Record<string, string> = {
  COUPON_NOT_FOUND: 'This coupon code is not valid.',
  COUPON_INACTIVE: 'This coupon is no longer active.',
  COUPON_EXPIRED: 'This coupon has expired.',
  COUPON_MIN_NOT_MET: 'This coupon requires a minimum order value.',
  COUPON_EXHAUSTED: 'This coupon has reached its usage limit.',
}

export function couponErrorText(code: string | null | undefined): string {
  if (!code) return 'This coupon is not valid.'
  return COUPON_ERROR_TEXT[code] ?? 'This coupon is not valid.'
}