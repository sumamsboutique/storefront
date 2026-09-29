import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from './store'

const line = (id: string, priceNum: number) => ({
  id,
  productId: id,
  slug: id,
  name: id,
  price: `₹${priceNum}`,
  priceNum,
  gradient: 'g',
  label: 'l',
})

describe('cart store', () => {
  beforeEach(() => useCart.getState().clear())

  it('adds a new line and opens the drawer', () => {
    useCart.getState().add(line('a', 100))
    expect(useCart.getState().items).toHaveLength(1)
    expect(useCart.getState().isOpen).toBe(true)
  })

  it('merges quantity when the same id is added again', () => {
    useCart.getState().add(line('a', 100), 2)
    useCart.getState().add(line('a', 100), 3)
    expect(useCart.getState().items).toEqual([{ ...line('a', 100), qty: 5 }])
  })

  it('keeps distinct ids separate', () => {
    useCart.getState().add(line('a', 100))
    useCart.getState().add(line('b', 50))
    expect(useCart.getState().count()).toBe(2)
    expect(useCart.getState().subtotal()).toBe(150)
  })

  it('removes the line when qty drops to zero', () => {
    useCart.getState().add(line('a', 100), 2)
    useCart.getState().setQty('a', 0)
    expect(useCart.getState().items).toEqual([])
  })
})
