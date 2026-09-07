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

async function fetchProducts(): Promise<{ rows: Row[]; parentOf: Map<string, string> } | null> {
  // PostgREST doesn't expose the categories self-FK, so resolve subcategory →
  // parent in JS from one small categories fetch instead of a nested join.
  const [{ data: cats, error: catErr }, { data, error }] = await Promise.all([
    supabase.from('categories').select('id, name, parent_id'),
    supabase
      .from('products')
      .select('id, name, slug, category_id, short_description, price, compare_at_price, badge_text, badge_color, is_featured_large, stock_status, occasion_tags, product_images(storage_path), categories(name)')
      .eq('is_published', true)
      .eq('is_active', true),
  ])
  if (error || catErr) return null
  const parentOf = new Map<string, string>()
  const byId = new Map<string, Pick<CategoryRow, 'name' | 'parent_id'>>((cats ?? []).map((c) => [c.id, c]))
  for (const c of cats ?? []) {
    const p = c.parent_id ? byId.get(c.parent_id) : undefined
    if (p) parentOf.set(c.id, p.name)
  }
  return { rows: data as unknown as Row[], parentOf }
}

/** All published products, mapped. Falls back to static catalog on DB error/empty. */
export async function getAllProducts(): Promise<CatalogProduct[]> {
  const res = await fetchProducts()
  if (!res || res.rows.length === 0) return CATALOG
  return res.rows.map((r) => toProduct(r, res.parentOf))
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

async function fetchContentBlock(key: string): Promise<unknown | null> {
  const { data, error } = await supabase
    .from('content_blocks')
    .select('content')
    .eq('section_key', key)
    .eq('is_published', true)
    .maybeSingle()
  if (error || !data) return null
  return data.content
}

/** Homepage copy/images from content_blocks. Empty section = caller falls back. */
export async function getHomeContent(): Promise<HomeContent> {
  const keys = [
    'hero',
    'marquee',
    'browse_by_category',
    'featured_collection',
    'our_heritage',
    'jewellery_spotlight',
    'testimonials',
    'instagram_strip',
    'footer',
  ] as const
  const results = await Promise.all(keys.map((k) => fetchContentBlock(k)))
  const out: HomeContent = { ...emptyHomeContent }
  results.forEach((v, i) => {
    if (v == null) return
    const key = keys[i]
    if (key === 'hero') out.hero = v as HeroSlide[]
    else if (key === 'marquee') out.marquee = v as MarqueeItem[]
    else if (key === 'browse_by_category') out.browse_by_category = v as BbcContent
    else if (key === 'featured_collection') out.featured_collection = v as FeaturedProduct[]
    else if (key === 'our_heritage') out.our_heritage = v as OurHeritageContent
    else if (key === 'jewellery_spotlight') out.jewellery_spotlight = v as JewelSpotContent
    else if (key === 'testimonials') out.testimonials = v as Testimonial[]
    else if (key === 'instagram_strip') out.instagram_strip = v as InstaContent
    else if (key === 'footer') out.footer = v as FooterContent
  })
  return out
}
