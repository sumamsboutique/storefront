// Shared domain types. Expanded per PHASE in the spec as the data layer lands.

export interface Product {
  id: string
  slug: string
  title: string
  price: number
  compareAtPrice?: number
  description: string
  category: 'saree' | 'jewellery' | 'handloom' | 'accessory'
  images: string[]
  tags: string[]
  inStock: boolean
  created_at: string
}

export interface ProductOption {
  id: string
  productId: string
  name: string // e.g. "size", "colour"
  values: string[]
}

export type CartItem = {
  productId: string
  optionId?: string
  qty: number
}

export type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clear: () => void
}
