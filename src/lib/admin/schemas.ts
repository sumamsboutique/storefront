import { z } from 'zod'

// ── Images & Variants ────────────────────────────────────────────────────────
export const ProductImageSchema = z.object({
  id: z.string().uuid().optional(),
  storage_path: z.string().trim().min(1, 'Image path or URL is required'),
  alt_text: z.string().trim().min(1, 'Alt text is required for accessibility'),
  display_order: z.coerce.number().int().default(0),
  is_primary: z.boolean().default(false),
  aspect_ratio: z.string().default('3/4'),
})

export const ProductVariantSchema = z.object({
  id: z.string().uuid().optional(),
  variant_type: z.string().trim().min(1, 'Variant type is required (e.g. Size, Blouse)'),
  variant_value: z.string().trim().min(1, 'Variant value is required (e.g. Unstitched, Red)'),
  stock_quantity: z.coerce.number().int().min(0, 'Stock quantity must be 0 or greater').default(0),
  price_override: z.coerce.number().positive().nullable().optional(),
})

// ── Product CRUD ─────────────────────────────────────────────────────────────
export const ProductFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(180),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters')
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g. crimson-kadwa-benarasi)'),
  category_id: z.string().uuid('Please select a valid category').nullable().optional(),
  short_description: z.string().trim().max(350).nullable().optional(),
  description: z.string().trim().nullable().optional(),
  fabric_weave_details: z.string().trim().nullable().optional(),
  occasion_tags: z.array(z.string().trim()).default([]),
  dimensions: z.string().trim().nullable().optional(),
  care_instructions: z.string().trim().nullable().optional(),
  shipping_returns_note: z.string().trim().nullable().optional(),
  price: z.coerce.number().positive('Price must be greater than 0'),
  compare_at_price: z.coerce.number().positive().nullable().optional(),
  sku: z.string().trim().max(80).nullable().optional(),
  badge_text: z.string().trim().max(40).nullable().optional(),
  badge_color: z.string().trim().max(30).nullable().optional(),
  is_featured_large: z.boolean().default(false),
  stock_status: z.enum(['in_stock', 'low_stock', 'out_of_stock', 'sold']).default('in_stock'),
  is_active: z.boolean().default(true),
  is_published: z.boolean().default(false),
  seo_title: z.string().trim().max(120).nullable().optional(),
  seo_description: z.string().trim().max(250).nullable().optional(),
  images: z.array(ProductImageSchema).default([]),
  variants: z.array(ProductVariantSchema).default([]),
})

export type ProductFormValues = z.infer<typeof ProductFormSchema>

// ── Category CRUD ────────────────────────────────────────────────────────────
export const CategoryFormSchema = z.object({
  name: z.string().trim().min(2, 'Category name must be at least 2 characters').max(100),
  name_bn: z.string().trim().max(100).nullable().optional(),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  parent_id: z.string().uuid().nullable().optional(),
  is_hero_tile: z.boolean().default(false),
  tile_gradient_fallback: z.string().trim().nullable().optional(),
  display_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
})

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>

// ── Content Blocks (Homepage CMS) ────────────────────────────────────────────
export const ContentBlockKeySchema = z.enum([
  'hero',
  'marquee',
  'browse_by_category',
  'featured_collection',
  'our_heritage',
  'jewellery_spotlight',
  'testimonials',
  'instagram_strip',
  'footer',
])

export const SaveContentBlockSchema = z.object({
  section_key: ContentBlockKeySchema,
  content: z.unknown(),
  publishNow: z.boolean().default(false),
})

// ── Coupons ──────────────────────────────────────────────────────────────────
export const CouponFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, 'Code must be at least 2 characters')
    .max(40)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Code may only contain letters, numbers, _ and -'),
  discount_type: z.enum(['percent', 'amount']),
  value: z.coerce.number().positive('Value must be greater than 0'),
  min_subtotal: z.coerce.number().min(0).default(0),
  max_uses: z.coerce.number().int().positive().optional().nullable(),
  is_active: z.boolean().default(true),
  expires_at: z.string().trim().optional().nullable(),
})

export type CouponFormValues = z.infer<typeof CouponFormSchema>

// ── Orders ───────────────────────────────────────────────────────────────────
export const OrderStatusEnum = z.enum([
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
  'expired',
])

export type OrderStatus = z.infer<typeof OrderStatusEnum>

export const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled', 'expired'],
  paid: ['processing', 'cancelled', 'refunded'],
  processing: ['shipped', 'cancelled', 'refunded'],
  shipped: ['delivered', 'cancelled', 'refunded'],
  delivered: ['refunded'],
  cancelled: [],
  refunded: [],
  expired: [],
}

export function isValidOrderTransition(from: OrderStatus, to: OrderStatus): boolean {
  if (from === to) return true
  const allowed = VALID_ORDER_TRANSITIONS[from]
  return allowed ? allowed.includes(to) : false
}

export const UpdateOrderStatusSchema = z.object({
  order_id: z.string().uuid(),
  status: OrderStatusEnum,
  staff_notes: z.string().trim().max(1000).optional(),
})

// ── Customer / User Role ─────────────────────────────────────────────────────
export const UpdateUserRoleSchema = z.object({
  user_id: z.string().uuid(),
  role: z.enum(['admin', 'staff', 'customer']),
})

// ── Store Settings ───────────────────────────────────────────────────────────
export const StoreSettingsSchema = z.object({
  general: z.object({
    store_name: z.string().trim().min(2).max(100),
    tagline: z.string().trim().max(200).optional(),
    email: z.string().trim().email('Invalid email address'),
    phone: z.string().trim().min(5).max(30),
    whatsapp: z.string().trim().max(30).optional(),
    address: z.string().trim().max(300).optional(),
  }),
  commerce: z.object({
    free_shipping_threshold: z.coerce.number().min(0),
    flat_shipping_rate: z.coerce.number().min(0),
    currency_symbol: z.string().trim().default('₹'),
    currency_code: z.string().trim().default('INR'),
    tax_inclusive: z.boolean().default(true),
  }),
  social: z.object({
    instagram: z.string().trim().url().or(z.literal('')).optional(),
    facebook: z.string().trim().url().or(z.literal('')).optional(),
    youtube: z.string().trim().url().or(z.literal('')).optional(),
  }),
  notifications: z.object({
    order_alert_email: z.string().trim().email().or(z.literal('')).optional(),
    low_stock_threshold: z.coerce.number().int().min(0).default(3),
    notify_on_new_order: z.boolean().default(true),
  }),
})

export type StoreSettingsValues = z.infer<typeof StoreSettingsSchema>
