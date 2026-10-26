const ORDER_ERROR_TEXT: Record<string, string> = {
  AUTH_REQUIRED: 'Please sign in or create an account to place your order.',
  INVALID_PAYLOAD: 'Some order details are invalid. Please review your bag and try again.',
  INVALID_ITEM: 'One or more items in your bag are invalid. Please review your bag.',
  PRODUCT_NOT_FOUND: 'One or more products are no longer available. Please refresh your bag.',
  OUT_OF_STOCK: 'One or more products are out of stock. Please refresh your bag.',
  VARIANT_NOT_FOUND: 'A selected product option is no longer available. Please refresh your bag.',
  INSUFFICIENT_STOCK: 'There is not enough stock for one or more items. Please update your quantities.',
  EMPTY_ORDER: 'Your bag is empty.',
  INVALID_TOTAL: 'The order total could not be calculated. Please try again.',
}

/** Convert known RPC errors into safe copy; never expose raw database messages. */
export function orderErrorText(message: string | null | undefined): string {
  if (!message) return 'We could not place your order. Please try again.'
  for (const [code, text] of Object.entries(ORDER_ERROR_TEXT)) {
    if (message.includes(code)) return text
  }
  return 'We could not place your order. Please try again.'
}
