// Server-side data access for the storefront. Reads from Supabase and maps
// rows to the CatalogProduct shape the components already consume.
// Falls back to the static catalog when the DB isn't reachable or is empty,
// so the site still renders pre-seed. Mark caching: these are server fetches.

import { supabase } from './supabase'
import { CATALOG, type CatalogProduct } from './catalog'

type Row = {
  id: string
  name: string
  slug: string
  category_id: string | null
  short_description: string | null
  price: number | string
  compare_at_price: number | string | null
  badge_text: string | null
  badge_color: string | null
  is_featured_large: boolean
  stock_status: string | null
  occasion_tags: string[] | null
  product_images: { storage_path: string }[]
  categories: { name: string } | null
}

type CategoryRow = { id: string; name: string; parent_id: string | null }

const GRADIENTS: Record<string, string> = {
  Benarasi: 'linear-gradient(155deg, #2A0D06 0%, #7A2C0C 50%, #BF5E18 100%)',
  Tant: 'linear-gradient(170deg, #F5EFE6 0%, #DCC9A8 45%, #B8956A 80%, #8C6A55 100%)',
  Muslin: 'linear-gradient(170deg, #EDE3D6 0%, #C9B488 50%, #8E6F4A 90%)',
  Silk: 'linear-gradient(155deg, #2A1008 0%, #5A2A14 40%, #A04A18 75%, #D4880A 100%)',
  Kantha: 'linear-gradient(155deg, #1C0A06 0%, #4A2010 45%, #8C6A55 90%)',
  Jamdani: 'linear-gradient(170deg, #EDE3D6 0%, #C4A878 55%, #6B5238)',
  Garad: 'linear-gradient(170deg, #F5EFE6 0%, #E8D5B0 50%, #BF5E18 95%)',
  Temple: 'linear-gradient(165deg, #4A2010 0%, #8B3A14 40%, #C4611A 70%, #7A2C0C 100%)',
  Contemporary: 'linear-gradient(165deg, #5A2A14 0%, #8B3A14 40%, #C4611A 70%, #4A2010 100%)',
  'Gold-Plated': 'linear-gradient(165deg, #4A3810 0%, #8B5E10 40%, #E8A820 70%, #BF5E18 100%)',
}

export function fmt(n: number | string): string {
  const num = Number(n)
  return '₹' + num.toLocaleString('en-IN')
}

// map a products row to CatalogProduct
function toProduct(row: Row, parentOf: Map<string, string>): CatalogProduct {
  const weave = row.categories?.name ?? ''
  const parentName = row.category_id ? parentOf.get(row.category_id) ?? null : null
  const type = parentName === 'Jewellery' ? 'jewel' : 'saree'
  const priceNum = Number(row.price)
  const firstTag = row.occasion_tags?.[0] ?? 'Festive'
  return {
    id: row.id,
    slug: row.slug,
    type,
    name: row.name,
    sub: row.short_description ?? '',
    tag: type === 'jewel' ? (row.short_description ?? '') : '',
    price: fmt(row.price),
    priceNum,
    badge: row.badge_text ?? null,
    gradient: GRADIENTS[weave] ?? GRADIENTS.Benarasi,
    label: row.name,
    sold: row.stock_status === 'sold',
    weave: weave || 'Benarasi',
    occasion: firstTag,
    images: row.product_images?.map((i) => i.storage_path) ?? [],
  }
}

// ── Circuit Breaker & Caching ────────────────────────────────────────────────
let isSupabaseAvailableState = true
let lastFailureTimestamp = 0
const CIRCUIT_BREAKER_COOLDOWN_MS = 60 * 1000 // 60s cooldown if host fails

function isSupabaseAvailable(): boolean {
  if (!supabase) return false
  if (!isSupabaseAvailableState) {
    if (Date.now() - lastFailureTimestamp > CIRCUIT_BREAKER_COOLDOWN_MS) {
      isSupabaseAvailableState = true // Allow retry after cooldown
    } else {
      return false
    }
  }
  return true
}

function markSupabaseFailure(err?: unknown): void {
  isSupabaseAvailableState = false
  lastFailureTimestamp = Date.now()
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[data.ts] Supabase query failed or timed out. Tripping circuit breaker for 60s:', err instanceof Error ? err.message : err)
  }
}

// Timeout helper: rejects if promise takes longer than ms
function withTimeout<T>(promise: PromiseLike<T>, ms = 1500): Promise<T> {
  let timer: NodeJS.Timeout
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  })
  return Promise.race([Promise.resolve(promise), timeout]).finally(() => clearTimeout(timer))
}

let cachedProducts: { data: CatalogProduct[]; expiresAt: number } | null = null
let cachedHomeContent: { data: HomeContent; expiresAt: number } | null = null
const CACHE_TTL_MS = 60 * 1000 // 60s in-memory cache

async function fetchProducts(): Promise<{ rows: Row[]; parentOf: Map<string, string> } | null> {
  if (!isSupabaseAvailable()) return null
  try {
    const res = await withTimeout(
      Promise.all([
        supabase!.from('categories').select('id, name, parent_id'),
        supabase!
          .from('products')
          .select('id, name, slug, category_id, short_description, price, compare_at_price, badge_text, badge_color, is_featured_large, stock_status, occasion_tags, product_images(storage_path), categories(name)')
          .eq('is_published', true)
          .eq('is_active', true),
      ]),
      1500
    )
    const [{ data: cats, error: catErr }, { data, error }] = res
    if (error || catErr) {
      markSupabaseFailure(error || catErr)
      return null
    }
    const parentOf = new Map<string, string>()
    const byId = new Map<string, Pick<CategoryRow, 'name' | 'parent_id'>>((cats ?? []).map((c) => [c.id, c]))
    for (const c of cats ?? []) {
      const p = c.parent_id ? byId.get(c.parent_id) : undefined
      if (p) parentOf.set(c.id, p.name)
    }
    return { rows: (data ?? []) as unknown as Row[], parentOf }
  } catch (err) {
    markSupabaseFailure(err)
    return null
  }
}

/** All published products, mapped. Falls back to static catalog on DB error/empty. */
export async function getAllProducts(): Promise<CatalogProduct[]> {
  const now = Date.now()
  if (cachedProducts && cachedProducts.expiresAt > now) {
    return cachedProducts.data
  }
  const res = await fetchProducts()
  const data = (!res || res.rows.length === 0)
    ? CATALOG
    : res.rows.map((r) => toProduct(r, res.parentOf))
  cachedProducts = { data, expiresAt: now + CACHE_TTL_MS }
  return data
}

/** Products filtered by type (saree vs jewel). */
export async function getProductsByType(type: 'saree' | 'jewel'): Promise<CatalogProduct[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.type === type)
}

/** Single product by slug, or undefined. */
export async function getProductBySlug(slug: string): Promise<CatalogProduct | undefined> {
  const all = await getAllProducts()
  return all.find((p) => p.slug === slug)
}

// ── content_blocks ─────────────────────────────────────────────────────────
// Each section stores JSON in `content` (parsed below). Types mirror exactly
// what the storefront components render, so content_blocks is the single
// source of truth for homepage copy/images.

export type HeroPart = string | { italic: boolean; copper: boolean; text: string }
export type HeroSlide = {
  id: number
  gradient: string
  image?: string
  imageMobile?: string
  eyebrow: string
  bengali: string
  parts: HeroPart[]
  subtitle: string
  cta: string
  href: string
}
export type MarqueeItem = { en: string; bn?: string }
export type BbcCat = { id: string; bn: string; en: string; gradient: string; image?: string; dark?: boolean; hero?: boolean }
export type BbcContent = { sarees: { hero: BbcCat; small: BbcCat[] }; jewellery: BbcCat[] }
export type FeaturedProduct = { slug: string; badge?: string | null; badgeColor?: string | null; aspect?: number; large?: boolean }
export type OurHeritageContent = {
  eyebrow: string
  headlineParts: HeroPart[]
  blockquote: string
  paragraphs: string[]
  image: string
  founder: { en: string; bn: string }
  photoLabel: string
}
export type InstaPost = { img: number; user: string; capt: string; gradient: string }
export type InstaContent = { handle: string; url: string; posts: InstaPost[] }
export type JewelSpotItem = {
  id: number
  tag: string
  gradient: string
  label: string
  name: string
  price: string
  priceNum: number
  slug: string
  catalogId: string
  images?: string[]
}
export type JewelSpotContent = { eyebrow: string; headlineParts: HeroPart[]; sub: string; items: JewelSpotItem[] }
export type FooterContent = {
  brand: { title: string; taglineBn: string; tagline: string }
  newsletter: { title: string; body: string; noteBn: string }
  paymentMethods: string[]
  copyright: string
  madeIn: string
  madeInBn: string
}
export type Testimonial = {
  id: number
  quote: string
  name: string
  detail: string
  rating: number
}
export type TestimonialContent = Testimonial[]

export type HomeContent = {
  hero: HeroSlide[]
  marquee: MarqueeItem[]
  browse_by_category: BbcContent
  featured_collection: FeaturedProduct[]
  our_heritage: OurHeritageContent
  jewellery_spotlight: JewelSpotContent
  testimonials: Testimonial[]
  instagram_strip: InstaContent
  footer: FooterContent
}

const emptyHomeContent: HomeContent = {
  hero: [],
  marquee: [],
  browse_by_category: { sarees: { hero: {} as BbcCat, small: [] }, jewellery: [] },
  featured_collection: [],
  our_heritage: {} as OurHeritageContent,
  jewellery_spotlight: {} as JewelSpotContent,
  testimonials: [],
  instagram_strip: {} as InstaContent,
  footer: {} as FooterContent,
}

type ContentBlockRow = {
  section_key: string
  content: unknown
}

async function fetchAllContentBlocks(): Promise<Record<string, unknown> | null> {
  if (!isSupabaseAvailable()) return null
  try {
    const { data, error } = await withTimeout(
      supabase!
        .from('content_blocks')
        .select('section_key, content')
        .eq('is_published', true),
      1500
    )
    if (error || !data) {
      markSupabaseFailure(error)
      return null
    }
    const map: Record<string, unknown> = {}
    for (const item of (data as ContentBlockRow[])) {
      map[item.section_key] = item.content
    }
    return map
  } catch (err) {
    markSupabaseFailure(err)
    return null
  }
}

/** Homepage copy/images from content_blocks. Empty section = caller falls back. */
export async function getHomeContent(): Promise<HomeContent> {
  const now = Date.now()
  if (cachedHomeContent && cachedHomeContent.expiresAt > now) {
    return cachedHomeContent.data
  }

  const blockMap = await fetchAllContentBlocks()
  const out: HomeContent = { ...emptyHomeContent }

  if (blockMap) {
    if (blockMap.hero) out.hero = blockMap.hero as HeroSlide[]
    if (blockMap.marquee) out.marquee = blockMap.marquee as MarqueeItem[]
    if (blockMap.browse_by_category) out.browse_by_category = blockMap.browse_by_category as BbcContent
    if (blockMap.featured_collection) out.featured_collection = blockMap.featured_collection as FeaturedProduct[]
    if (blockMap.our_heritage) out.our_heritage = blockMap.our_heritage as OurHeritageContent
    if (blockMap.jewellery_spotlight) out.jewellery_spotlight = blockMap.jewellery_spotlight as JewelSpotContent
    if (blockMap.testimonials) out.testimonials = blockMap.testimonials as Testimonial[]
    if (blockMap.instagram_strip) out.instagram_strip = blockMap.instagram_strip as InstaContent
    if (blockMap.footer) out.footer = blockMap.footer as FooterContent
  }

  cachedHomeContent = { data: out, expiresAt: now + CACHE_TTL_MS }
  return out
}
