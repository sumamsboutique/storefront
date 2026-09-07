'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './types'
import { CATALOG } from './catalog'

export interface CartLine {
  id: string // productId + option discriminator
  productId: string
  slug: string
  name: string
  price: string
  priceNum: number
  gradient: string
  label: string
  image?: string
  qty: number
}

const CART_IMG = new Map(CATALOG.map((p) => [p.id, p.images?.[0]]))

// Image for a cart line — falls back to the catalog so older persisted carts still show photos.
export const cartImage = (line: CartLine) => line.image ?? CART_IMG.get(line.productId)

interface CartStore {
  items: CartLine[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  count: () => number
  subtotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (line, qty = 1) => {
        set((s) => {
          const existing = s.items.find((i) => i.id === line.id)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === line.id ? { ...i, qty: i.qty + qty } : i,
              ),
              isOpen: true,
            }
          }
          return { items: [...s.items, { ...line, qty }], isOpen: true }
        })
      },
      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, i) => a + i.qty, 0),
      subtotal: () => get().items.reduce((a, i) => a + i.priceNum * i.qty, 0),
    }),
    { name: 'sumams-cart' },
  ),
)

interface WishlistStore {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'sumams-wishlist' },
  ),
)
