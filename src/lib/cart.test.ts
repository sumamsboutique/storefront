import { describe, it, expect } from 'vitest'
import type { CartItem } from './types'

function addItem(items: CartItem[], item: CartItem): CartItem[] {
  const existing = items.find(
    (i) => i.productId === item.productId && i.optionId === item.optionId,
  )
  if (existing) {
    return items.map((i) =>
      i === existing ? { ...i, qty: i.qty + item.qty } : i,
    )
  }
  return [...items, item]
}

describe('cart addItem', () => {
  it('adds a new item', () => {
    expect(addItem([], { productId: 'a', qty: 1 })).toEqual([
      { productId: 'a', qty: 1 },
    ])
  })

  it('merges same product+option', () => {
    const start: CartItem[] = [{ productId: 'a', optionId: 's', qty: 2 }]
    expect(addItem(start, { productId: 'a', optionId: 's', qty: 3 })).toEqual([
      { productId: 'a', optionId: 's', qty: 5 },
    ])
  })
})
