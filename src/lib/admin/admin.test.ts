import { describe, it, expect } from 'vitest'
import {
  ProductFormSchema,
  CategoryFormSchema,
  SaveContentBlockSchema,
  StoreSettingsSchema,
  isValidOrderTransition,
} from './schemas'

describe('Admin Schemas & Domain Logic', () => {
  describe('ProductFormSchema', () => {
    it('validates a valid product payload', () => {
      const validProduct = {
        name: 'Royal Kadwa Benarasi Silk Saree',
        slug: 'royal-kadwa-benarasi-silk-saree',
        category_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        price: 34500,
        compare_at_price: 38000,
        sku: 'BEN-ROYAL-01',
        stock_status: 'in_stock',
        is_active: true,
        is_published: true,
        short_description: 'Handwoven in pure Katan silk',
        occasion_tags: ['Wedding', 'Bridal'],
        images: [
          {
            storage_path: '/Products/crimson-kadwa-benarasi.png',
            alt_text: 'Front view of Crimson Kadwa Benarasi saree',
            display_order: 0,
            is_primary: true,
            aspect_ratio: '3/4',
          },
        ],
        variants: [
          {
            variant_type: 'Blouse Piece',
            variant_value: 'Unstitched',
            stock_quantity: 4,
          },
        ],
      }

      const result = ProductFormSchema.safeParse(validProduct)
      expect(result.success).toBe(true)
    })

    it('rejects an invalid slug with uppercase letters or spaces', () => {
      const invalid = {
        name: 'Tant Handloom',
        slug: 'Tant Handloom Saree',
        price: 4500,
      }
      const result = ProductFormSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('rejects non-positive prices', () => {
      const invalid = {
        name: 'Tant Handloom',
        slug: 'tant-handloom',
        price: -500,
      }
      const result = ProductFormSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('enforces required alt text on images for accessibility', () => {
      const invalid = {
        name: 'Temple Gold Choker',
        slug: 'temple-gold-choker',
        price: 18500,
        images: [
          {
            storage_path: '/Products/temple-choker-set.png',
            alt_text: '   ', // blank alt text
            display_order: 0,
            is_primary: true,
          },
        ],
      }
      const result = ProductFormSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })
  })

  describe('CategoryFormSchema', () => {
    it('validates a correct category payload with Bengali name', () => {
      const valid = {
        name: 'Baluchari',
        name_bn: 'বালুচরি',
        slug: 'baluchari',
        is_hero_tile: true,
        display_order: 2,
        is_active: true,
      }
      const result = CategoryFormSchema.safeParse(valid)
      expect(result.success).toBe(true)
    })

    it('rejects invalid category slugs', () => {
      const invalid = {
        name: 'Baluchari Weaves',
        slug: 'Baluchari/Weaves',
      }
      const result = CategoryFormSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })
  })

  describe('Order Status Transitions State Machine', () => {
    it('allows valid progressive status transitions', () => {
      expect(isValidOrderTransition('pending', 'paid')).toBe(true)
      expect(isValidOrderTransition('paid', 'processing')).toBe(true)
      expect(isValidOrderTransition('processing', 'shipped')).toBe(true)
      expect(isValidOrderTransition('shipped', 'delivered')).toBe(true)
    })

    it('allows cancellations from active states', () => {
      expect(isValidOrderTransition('pending', 'cancelled')).toBe(true)
      expect(isValidOrderTransition('paid', 'cancelled')).toBe(true)
      expect(isValidOrderTransition('processing', 'cancelled')).toBe(true)
    })

    it('disallows jumping directly from pending to delivered', () => {
      expect(isValidOrderTransition('pending', 'delivered')).toBe(false)
    })

    it('disallows modifying terminal states (cancelled/refunded)', () => {
      expect(isValidOrderTransition('cancelled', 'paid')).toBe(false)
      expect(isValidOrderTransition('cancelled', 'delivered')).toBe(false)
    })
  })

  describe('SaveContentBlockSchema', () => {
    it('allows valid known homepage section keys', () => {
      const valid = {
        section_key: 'hero',
        content: [{ id: 1, eyebrow: 'BENGAL HERITAGE' }],
        publishNow: true,
      }
      const result = SaveContentBlockSchema.safeParse(valid)
      expect(result.success).toBe(true)
    })

    it('rejects unknown section keys', () => {
      const invalid = {
        section_key: 'arbitrary_banner',
        content: {},
      }
      const result = SaveContentBlockSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })
  })

  describe('StoreSettingsSchema', () => {
    it('validates a complete store configuration', () => {
      const valid = {
        general: {
          store_name: "Sumam's Boutique",
          email: 'concierge@sumamsboutique.com',
          phone: '+91 98300 12345',
        },
        commerce: {
          free_shipping_threshold: 10000,
          flat_shipping_rate: 199,
        },
        social: {
          instagram: 'https://instagram.com/sumamsboutique',
        },
        notifications: {
          low_stock_threshold: 3,
          notify_on_new_order: true,
        },
      }

      const result = StoreSettingsSchema.safeParse(valid)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email formats', () => {
      const invalid = {
        general: {
          store_name: "Sumam's Boutique",
          email: 'not-an-email',
          phone: '+91 98300 12345',
        },
        commerce: {
          free_shipping_threshold: 10000,
          flat_shipping_rate: 199,
        },
        social: {},
        notifications: {
          low_stock_threshold: 3,
          notify_on_new_order: true,
        },
      }

      const result = StoreSettingsSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })
  })
})
