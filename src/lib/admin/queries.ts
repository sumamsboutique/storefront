import { createAdminServerClient } from './auth'
import { CATALOG } from '@/lib/catalog'

// ── Types ────────────────────────────────────────────────────────────────────
export type DashboardKPIs = {
  totalRevenue: number
  totalOrders: number
  pendingOrders: number
  totalProducts: number
  activeProducts: number
  lowStockCount: number
}

export type RecentOrderRow = {
  id: string
  created_at: string
  status: string
  total: number
  customer_name: string
  customer_email: string
}

export type LowStockItem = {
  id: string
  name: string
  sku: string | null
  stock_status: string
  quantity: number
}

export type AuditLogRow = {
  id: string
  table_name: string
  record_id: string
  action: string
  changed_by_name: string | null
  created_at: string
  diff?: Record<string, unknown> | null
}

export type DashboardInventoryItem = {
  id: string
  name: string
  sku: string | null
  category_name: string | null
  stock_status: string
  quantity: number
  price: number
}

export type DashboardInventorySummary = {
  inStockCount: number
  lowStockCount: number
  outOfStockCount: number
  soldCount: number
  totalUnits: number
  items: DashboardInventoryItem[]
}

function withTimeout<T>(promise: PromiseLike<T>, ms = 8000): Promise<T> {
  let timer: NodeJS.Timeout
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Admin query timeout after ${ms}ms`)), ms)
  })
  return Promise.race([Promise.resolve(promise), timeout]).finally(() => clearTimeout(timer))
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  try {
    const supabase = await createAdminServerClient()

    const [
      { data: orders },
      { data: products },
      { data: variants },
    ] = await withTimeout(
      Promise.all([
        supabase.from('orders').select('id, status, total'),
        supabase.from('products').select('id, is_active, stock_status'),
        supabase.from('product_variants').select('id, stock_quantity'),
      ]),
      8000
    )

    const orderRows = orders ?? []
    const productRows = products ?? []
    const variantRows = variants ?? []

    const totalOrders = orderRows.length
    const pendingOrders = orderRows.filter((o) => o.status === 'pending').length
    const totalRevenue = orderRows
      .filter((o) => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered')
      .reduce((sum, o) => sum + Number(o.total || 0), 0)

    const totalProducts = productRows.length || CATALOG.length
    const activeProducts = productRows.length
      ? productRows.filter((p) => p.is_active).length
      : CATALOG.length

    // count low-stock products + variants
    const lowStockProducts = productRows.filter(
      (p) => p.stock_status === 'low_stock' || p.stock_status === 'out_of_stock'
    ).length
    const lowStockVariants = variantRows.filter((v) => Number(v.stock_quantity) <= 3).length
    const lowStockCount = Math.max(lowStockProducts, lowStockVariants)

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      totalProducts,
      activeProducts,
      lowStockCount,
    }
  } catch (err) {
    console.error('[admin/queries] getDashboardKPIs error:', err)
    return {
      totalRevenue: 0,
      totalOrders: 0,
      pendingOrders: 0,
      totalProducts: CATALOG.length,
      activeProducts: CATALOG.length,
      lowStockCount: 0,
    }
  }
}

export async function getRecentOrders(limit = 5): Promise<RecentOrderRow[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data, error } = await withTimeout(
      supabase
        .from('orders')
        .select('id, created_at, status, total, shipping_address, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(limit),
      8000
    )

    if (error || !data) return []

    return data.map((o) => {
      const addr = (o.shipping_address as Record<string, string>) || {}
      const prof = o.profiles as unknown as { full_name?: string; email?: string } | null
      return {
        id: o.id,
        created_at: o.created_at,
        status: o.status,
        total: Number(o.total || 0),
        customer_name: prof?.full_name || addr.name || 'Guest Customer',
        customer_email: prof?.email || addr.email || '—',
      }
    })
  } catch (err) {
    console.error('[admin/queries] getRecentOrders error:', err)
    return []
  }
}

export async function getLowStockProducts(limit = 6): Promise<LowStockItem[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await withTimeout(
      supabase
        .from('products')
        .select('id, name, sku, stock_status, product_variants(stock_quantity)')
        .in('stock_status', ['low_stock', 'out_of_stock'])
        .limit(limit),
      8000
    )

    if (!data || data.length === 0) return []

    return data.map((p) => {
      const totalQty = (p.product_variants || []).reduce(
        (sum: number, v: { stock_quantity: number }) => sum + (v.stock_quantity || 0),
        0
      )
      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        stock_status: p.stock_status || 'in_stock',
        quantity: totalQty,
      }
    })
  } catch (err) {
    console.error('[admin/queries] getLowStockProducts error:', err)
    return []
  }
}

export async function getRecentAuditLogs(limit = 8): Promise<AuditLogRow[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await withTimeout(
      supabase
        .from('audit_log')
        .select('id, table_name, record_id, action, created_at, diff, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(limit),
      8000
    )

    if (!data) return []

    return data.map((l) => {
      const prof = l.profiles as unknown as { full_name?: string; email?: string } | null
      return {
        id: l.id,
        table_name: l.table_name,
        record_id: l.record_id,
        action: l.action,
        changed_by_name: prof?.full_name || prof?.email || 'System Staff',
        created_at: l.created_at,
        diff: l.diff as Record<string, unknown> | null,
      }
    })
  } catch (err) {
    console.error('[admin/queries] getRecentAuditLogs error:', err)
    return []
  }
}

export async function getDashboardInventorySummary(limit = 8): Promise<DashboardInventorySummary> {
  try {
    const supabase = await createAdminServerClient()
    const { data: prods, error } = await withTimeout(
      supabase
        .from('products')
        .select('id, name, sku, price, stock_status, categories(name), product_variants(stock_quantity)')
        .order('updated_at', { ascending: false }),
      8000
    )

    if (error || !prods || prods.length === 0) {
      const items: DashboardInventoryItem[] = CATALOG.map((c, i) => ({
        id: c.id,
        name: c.name,
        sku: `SKU-${c.slug.toUpperCase().slice(0, 8)}`,
        category_name: c.weave,
        stock_status: c.sold ? 'sold' : (i === 1 ? 'low_stock' : 'in_stock'),
        quantity: c.sold ? 0 : (i === 1 ? 2 : 6),
        price: c.priceNum,
      }))

      return {
        inStockCount: items.filter((i) => i.stock_status === 'in_stock').length,
        lowStockCount: items.filter((i) => i.stock_status === 'low_stock').length,
        outOfStockCount: items.filter((i) => i.stock_status === 'out_of_stock').length,
        soldCount: items.filter((i) => i.stock_status === 'sold').length,
        totalUnits: items.reduce((acc, i) => acc + i.quantity, 0),
        items: items.slice(0, limit),
      }
    }

    let inStockCount = 0
    let lowStockCount = 0
    let outOfStockCount = 0
    let soldCount = 0
    let totalUnits = 0

    const items: DashboardInventoryItem[] = prods.map((p) => {
      const cat = p.categories as unknown as { name?: string } | null
      const variants = (p.product_variants || []) as { stock_quantity?: number }[]
      const qty = variants.reduce((sum, v) => sum + (Number(v.stock_quantity) || 0), 0)
      const status = p.stock_status || (qty === 0 ? 'out_of_stock' : qty <= 3 ? 'low_stock' : 'in_stock')

      if (status === 'in_stock') inStockCount++
      else if (status === 'low_stock') lowStockCount++
      else if (status === 'out_of_stock') outOfStockCount++
      else if (status === 'sold') soldCount++

      totalUnits += qty

      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        category_name: cat?.name || null,
        stock_status: status,
        quantity: qty,
        price: Number(p.price || 0),
      }
    })

    return {
      inStockCount,
      lowStockCount,
      outOfStockCount,
      soldCount,
      totalUnits,
      items: items.slice(0, limit),
    }
  } catch (err) {
    console.error('[admin/queries] getDashboardInventorySummary error:', err)
    const items: DashboardInventoryItem[] = CATALOG.map((c, i) => ({
      id: c.id,
      name: c.name,
      sku: `SKU-${c.slug.toUpperCase().slice(0, 8)}`,
      category_name: c.weave,
      stock_status: c.sold ? 'sold' : (i === 1 ? 'low_stock' : 'in_stock'),
      quantity: c.sold ? 0 : (i === 1 ? 2 : 6),
      price: c.priceNum,
    }))

    return {
      inStockCount: items.filter((i) => i.stock_status === 'in_stock').length,
      lowStockCount: items.filter((i) => i.stock_status === 'low_stock').length,
      outOfStockCount: 0,
      soldCount: items.filter((i) => i.stock_status === 'sold').length,
      totalUnits: items.reduce((acc, i) => acc + i.quantity, 0),
      items: items.slice(0, limit),
    }
  }
}

// ── Products ─────────────────────────────────────────────────────────────────
export type AdminProductItem = {
  id: string
  name: string
  slug: string
  sku: string | null
  price: number
  compare_at_price: number | null
  stock_status: string
  is_active: boolean
  is_published: boolean
  is_featured_large: boolean
  badge_text: string | null
  badge_color: string | null
  updated_at: string
  category_name?: string | null
  category_id?: string | null
  primary_image?: string | null
  variant_count?: number
}

export async function getAdminProducts({
  search,
  categoryId,
  stockStatus,
  published,
  active,
  page = 1,
  limit = 15,
}: {
  search?: string
  categoryId?: string
  stockStatus?: string
  published?: string
  active?: string
  page?: number
  limit?: number
}): Promise<{ products: AdminProductItem[]; total: number }> {
  try {
    const supabase = await createAdminServerClient()
    let query = supabase
      .from('products')
      .select(
        'id, name, slug, sku, price, compare_at_price, stock_status, is_active, is_published, is_featured_large, badge_text, badge_color, updated_at, category_id, categories(name), product_images(storage_path, is_primary), product_variants(id)',
        { count: 'exact' }
      )

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,slug.ilike.%${search}%`)
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    if (stockStatus) {
      query = query.eq('stock_status', stockStatus)
    }
    if (published === 'true') {
      query = query.eq('is_published', true)
    } else if (published === 'false') {
      query = query.eq('is_published', false)
    }
    if (active === 'true') {
      query = query.eq('is_active', true)
    } else if (active === 'false') {
      query = query.eq('is_active', false)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, count, error } = await query
      .order('updated_at', { ascending: false })
      .range(from, to)

    const noFilters = !search && !categoryId && !stockStatus && published === undefined && active === undefined
    if (error || !data || data.length === 0) {
      // ponytail: fall back to CATALOG only when nothing is filtered — an empty
      // *filtered* result is a real result, not a reason to dump every product.
      if (!noFilters) {
        return { products: [], total: 0 }
      }
      // If table is empty or error, fallback to CATALOG mapped to AdminProductItem
      const items: AdminProductItem[] = CATALOG.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        sku: `SKU-${c.slug.toUpperCase().slice(0, 8)}`,
        price: c.priceNum,
        compare_at_price: null,
        stock_status: c.sold ? 'sold' : 'in_stock',
        is_active: true,
        is_published: true,
        is_featured_large: false,
        badge_text: c.badge,
        badge_color: '#BF5E18',
        updated_at: new Date().toISOString(),
        category_name: c.weave,
        primary_image: c.images?.[0] || null,
        variant_count: 1,
      }))
      return { products: items, total: items.length }
    }

    const products: AdminProductItem[] = data.map((p) => {
      const cat = p.categories as unknown as { name: string } | null
      const images = (p.product_images as { storage_path: string; is_primary: boolean }[]) || []
      const primary = images.find((i) => i.is_primary) || images[0]
      const variants = (p.product_variants as { id: string }[]) || []

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.sku,
        price: Number(p.price),
        compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : null,
        stock_status: p.stock_status || 'in_stock',
        is_active: p.is_active ?? true,
        is_published: p.is_published ?? false,
        is_featured_large: p.is_featured_large ?? false,
        badge_text: p.badge_text,
        badge_color: p.badge_color,
        updated_at: p.updated_at,
        category_name: cat?.name || null,
        category_id: p.category_id,
        primary_image: primary?.storage_path || null,
        variant_count: variants.length,
      }
    })

    return { products, total: count ?? products.length }
  } catch (err) {
    console.error('[admin/queries] getAdminProducts error:', err)
    return { products: [], total: 0 }
  }
}

export async function getAdminProductById(id: string) {
  try {
    const supabase = await createAdminServerClient()
    const { data, error } = await supabase
      .from('products')
      .select(
        '*, product_images(*), product_variants(*)'
      )
      .eq('id', id)
      .maybeSingle()

    if (error || !data) return null
    return data
  } catch (err) {
    console.error('[admin/queries] getAdminProductById error:', err)
    return null
  }
}

// ── Categories ───────────────────────────────────────────────────────────────
export type AdminCategoryItem = {
  id: string
  name: string
  name_bn: string | null
  slug: string
  parent_id: string | null
  parent_name?: string | null
  is_hero_tile: boolean
  tile_gradient_fallback: string | null
  display_order: number
  is_active: boolean
  product_count: number
  children?: AdminCategoryItem[]
}

export const FALLBACK_ADMIN_CATEGORIES: AdminCategoryItem[] = [
  {
    id: 'cat-sarees',
    name: 'Sarees',
    name_bn: 'শাড়ি',
    slug: 'sarees',
    parent_id: null,
    parent_name: null,
    is_hero_tile: true,
    tile_gradient_fallback: 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)',
    display_order: 1,
    is_active: true,
    product_count: 9,
  },
  {
    id: 'cat-benarasi',
    name: 'Benarasi Silk',
    name_bn: 'বেনারসি সিল্ক',
    slug: 'benarasi',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(155deg, #2A0D06, #6B2410 35%, #A04514 70%, #BF5E18)',
    display_order: 2,
    is_active: true,
    product_count: 4,
  },
  {
    id: 'cat-tant',
    name: 'Tant Cotton',
    name_bn: 'তাঁত',
    slug: 'tant',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(170deg, #F5EFE6, #DCC9A8 45%, #B8956A 80%, #8C6A55)',
    display_order: 3,
    is_active: true,
    product_count: 2,
  },
  {
    id: 'cat-jamdani',
    name: 'Jamdani',
    name_bn: 'জামদানি',
    slug: 'jamdani',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(170deg, #EDE3D6, #C4A878 55%, #6B5238)',
    display_order: 4,
    is_active: true,
    product_count: 1,
  },
  {
    id: 'cat-muslin',
    name: 'Muslin',
    name_bn: 'মসলিন',
    slug: 'muslin',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(170deg, #EDE3D6, #C9B488 50%, #8E6F4A 90%)',
    display_order: 5,
    is_active: true,
    product_count: 1,
  },
  {
    id: 'cat-kantha',
    name: 'Kantha Stitch',
    name_bn: 'কাঁথা স্টিচ',
    slug: 'kantha',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(155deg, #1C0A06, #4A2010 45%, #8C6A55 90%)',
    display_order: 6,
    is_active: true,
    product_count: 1,
  },
  {
    id: 'cat-garad',
    name: 'Garad & Korial',
    name_bn: 'গরদ ও কোড়িয়াল',
    slug: 'garad',
    parent_id: 'cat-sarees',
    parent_name: 'Sarees',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(170deg, #F5EFE6, #E8D5B0 50%, #BF5E18 95%)',
    display_order: 7,
    is_active: true,
    product_count: 1,
  },
  {
    id: 'cat-jewellery',
    name: 'Heritage Jewellery',
    name_bn: 'ঐতিহ্যবাহী গয়না',
    slug: 'jewellery',
    parent_id: null,
    parent_name: null,
    is_hero_tile: true,
    tile_gradient_fallback: 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)',
    display_order: 8,
    is_active: true,
    product_count: 2,
  },
  {
    id: 'cat-temple',
    name: 'Temple Collection',
    name_bn: 'মন্দির কালেকশন',
    slug: 'temple-jewellery',
    parent_id: 'cat-jewellery',
    parent_name: 'Heritage Jewellery',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)',
    display_order: 9,
    is_active: true,
    product_count: 1,
  },
  {
    id: 'cat-contemporary',
    name: 'Contemporary Jewels',
    name_bn: 'আধুনিক গয়না',
    slug: 'contemporary-jewellery',
    parent_id: 'cat-jewellery',
    parent_name: 'Heritage Jewellery',
    is_hero_tile: false,
    tile_gradient_fallback: 'linear-gradient(165deg, #5A2A14, #8B3A14 40%, #C4611A 70%, #4A2010)',
    display_order: 10,
    is_active: true,
    product_count: 1,
  },
]

export async function getAdminCategories(): Promise<AdminCategoryItem[]> {
  try {
    const supabase = await createAdminServerClient()
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from('categories').select('*').order('display_order', { ascending: true }),
      supabase.from('products').select('category_id'),
    ])

    if (!cats || cats.length === 0) return FALLBACK_ADMIN_CATEGORIES

    const countMap = new Map<string, number>()
    for (const p of prods || []) {
      if (p.category_id) {
        countMap.set(p.category_id, (countMap.get(p.category_id) || 0) + 1)
      }
    }

    const catMap = new Map<string, string>(cats.map((c) => [c.id, c.name]))

    return cats.map((c) => ({
      id: c.id,
      name: c.name,
      name_bn: c.name_bn,
      slug: c.slug,
      parent_id: c.parent_id,
      parent_name: c.parent_id ? catMap.get(c.parent_id) || null : null,
      is_hero_tile: c.is_hero_tile ?? false,
      tile_gradient_fallback: c.tile_gradient_fallback,
      display_order: c.display_order ?? 0,
      is_active: c.is_active ?? true,
      product_count: countMap.get(c.id) || 0,
    }))
  } catch (err) {
    console.error('[admin/queries] getAdminCategories error:', err)
    return FALLBACK_ADMIN_CATEGORIES
  }
}

// ── Content Blocks ───────────────────────────────────────────────────────────
export type AdminContentBlock = {
  id: string
  section_key: string
  content: unknown
  published_content: unknown
  is_published: boolean
  preview_token: string | null
  updated_at: string
}

export async function getAdminContentBlocks(): Promise<AdminContentBlock[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await supabase
      .from('content_blocks')
      .select('*')
      .order('section_key', { ascending: true })

    return (data as AdminContentBlock[]) || []
  } catch (err) {
    console.error('[admin/queries] getAdminContentBlocks error:', err)
    return []
  }
}

// ── Orders ───────────────────────────────────────────────────────────────────
export type AdminOrderRow = {
  id: string
  created_at: string
  status: string
  total: number
  subtotal: number
  shipping_fee: number
  payment_provider: string | null
  payment_reference: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  item_count: number
}

export async function getAdminOrders({
  search,
  status,
  page = 1,
  limit = 20,
}: {
  search?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{ orders: AdminOrderRow[]; total: number }> {
  try {
    const supabase = await createAdminServerClient()
    let query = supabase
      .from('orders')
      .select(
        'id, created_at, status, total, subtotal, shipping_fee, payment_provider, payment_reference, shipping_address, profiles(full_name, email, phone), order_items(id)',
        { count: 'exact' }
      )

    if (status) {
      query = query.eq('status', status)
    }
    if (search) {
      query = query.or(`id.ilike.%${search}%,payment_reference.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error || !data) return { orders: [], total: 0 }

    const orders: AdminOrderRow[] = data.map((o) => {
      const addr = (o.shipping_address as Record<string, string>) || {}
      const prof = o.profiles as unknown as { full_name?: string; email?: string; phone?: string } | null
      const items = (o.order_items as { id: string }[]) || []

      return {
        id: o.id,
        created_at: o.created_at,
        status: o.status,
        total: Number(o.total || 0),
        subtotal: Number(o.subtotal || 0),
        shipping_fee: Number(o.shipping_fee || 0),
        payment_provider: o.payment_provider,
        payment_reference: o.payment_reference,
        customer_name: prof?.full_name || addr.name || 'Guest Customer',
        customer_email: prof?.email || addr.email || '—',
        customer_phone: prof?.phone || addr.phone || '—',
        item_count: items.length,
      }
    })

    return { orders, total: count ?? orders.length }
  } catch (err) {
    console.error('[admin/queries] getAdminOrders error:', err)
    return { orders: [], total: 0 }
  }
}

export async function getAdminOrderById(id: string) {
  try {
    const supabase = await createAdminServerClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*), profiles(full_name, email, phone)')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) return null
    return data
  } catch (err) {
    console.error('[admin/queries] getAdminOrderById error:', err)
    return null
  }
}

// ── Newsletter Subscribers ──────────────────────────────────────────────────
export type SubscriberRow = {
  id: string
  email: string
  source: string
  is_active: boolean
  created_at: string
}

export async function getAdminSubscribers(): Promise<{ rows: SubscriberRow[]; total: number }> {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, source, is_active, created_at')
      .order('created_at', { ascending: false })
    const rows = (data as SubscriberRow[]) || []
    return { rows, total: rows.length }
  } catch (err) {
    console.error('[admin/queries] getAdminSubscribers error:', err)
    return { rows: [], total: 0 }
  }
}

// ── Coupons ──────────────────────────────────────────────────────────────────
export type AdminCouponRow = {
  id: string
  code: string
  discount_type: 'percent' | 'amount'
  value: number
  min_subtotal: number
  max_uses: number | null
  used_count: number
  is_active: boolean
  expires_at: string | null
  created_at: string
}

export async function getAdminCoupons(): Promise<AdminCouponRow[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false })
    return ((data as AdminCouponRow[]) || []).map((c) => ({
      ...c,
      value: Number(c.value),
      min_subtotal: Number(c.min_subtotal),
      used_count: Number(c.used_count),
    }))
  } catch (err) {
    console.error('[admin/queries] getAdminCoupons error:', err)
    return []
  }
}

// ── Customers / Users ────────────────────────────────────────────────────────
export type AdminCustomerRow = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
  role: 'admin' | 'staff' | 'customer'
  created_at: string
  order_count: number
  total_spent: number
}

export async function getAdminCustomers({
  search,
  role,
  page = 1,
  limit = 25,
}: {
  search?: string
  role?: string
  page?: number
  limit?: number
}): Promise<{ customers: AdminCustomerRow[]; total: number }> {
  try {
    const supabase = await createAdminServerClient()
    let query = supabase
      .from('profiles')
      .select('id, full_name, email, phone, role, created_at, orders(id, total, status)', {
        count: 'exact',
      })

    if (role) {
      query = query.eq('role', role)
    }
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error || !data) return { customers: [], total: 0 }

    const customers: AdminCustomerRow[] = data.map((c) => {
      const orders = (c.orders as { id: string; total: number; status: string }[]) || []
      const spent = orders
        .filter((o) => o.status === 'paid' || o.status === 'delivered')
        .reduce((sum, o) => sum + Number(o.total || 0), 0)

      return {
        id: c.id,
        full_name: c.full_name,
        email: c.email,
        phone: c.phone,
        role: c.role || 'customer',
        created_at: c.created_at,
        order_count: orders.length,
        total_spent: spent,
      }
    })

    return { customers, total: count ?? customers.length }
  } catch (err) {
    console.error('[admin/queries] getAdminCustomers error:', err)
    return { customers: [], total: 0 }
  }
}

// ── Media Library ────────────────────────────────────────────────────────────
export type MediaFile = {
  id: string
  name: string
  path: string
  size?: number
  created_at: string
  is_in_use: boolean
  usage_count: number
}

export async function getAdminMedia(): Promise<MediaFile[]> {
  try {
    const supabase = await createAdminServerClient()
    const { data: imageRows } = await supabase
      .from('product_images')
      .select('storage_path')

    const usedPaths = new Set<string>()
    for (const img of imageRows || []) {
      if (img.storage_path) usedPaths.add(img.storage_path)
    }

    // Default assets from public catalog
    const localAssets = [
      '/Banners/spring-edit.jpeg',
      '/Banners/spring-edit-mob.jpeg',
      '/Banners/banarasi-saree.png',
      '/Banners/banarasi-saree-mob.jpeg',
      '/Banners/tant-saree.jpeg',
      '/Banners/tant-saree-mob.jpeg',
      '/Banners/temple-jewellery.jpeg',
      '/Banners/temple-jewellery-mob.jpeg',
      '/Products/crimson-kadwa-benarasi.png',
      '/Products/shantipur-neelambari-tant.png',
      '/Products/baluchari-mythological.png',
      '/Products/dhakai-jamdani-antique-gold.png',
      '/Products/murshidabad-printed-silk.png',
      '/Products/temple-choker-set.png',
      '/Products/kantha-stitch-tussar.png',
      '/Products/jhumka-antique-finish.png',
      '/logo.png',
      '/saree_figure.png',
    ]

    return localAssets.map((path, idx) => ({
      id: `asset-${idx + 1}`,
      name: path.split('/').pop() || path,
      path,
      created_at: '2026-09-01T00:00:00.000Z',
      is_in_use: usedPaths.has(path) || path.includes('Banners') || path.includes('logo'),
      usage_count: usedPaths.has(path) ? 1 : 0,
    }))
  } catch (err) {
    console.error('[admin/queries] getAdminMedia error:', err)
    return []
  }
}

// ── Settings ─────────────────────────────────────────────────────────────────
export async function getAdminStoreSettings() {
  try {
    const supabase = await createAdminServerClient()
    const { data } = await supabase.from('store_settings').select('*')

    const settingsMap = new Map<string, unknown>((data || []).map((s) => [s.key, s.value]))

    return {
      general: (settingsMap.get('general') as Record<string, string>) || {
        store_name: "Sumam's Boutique",
        tagline: 'Bengal-heritage sarees and fine jewellery',
        email: 'concierge@sumamsboutique.com',
        phone: '+91 98300 12345',
        whatsapp: '+91 98300 12345',
        address: '42 Southern Avenue, Kolkata 700029, West Bengal',
      },
      commerce: (settingsMap.get('commerce') as Record<string, unknown>) || {
        free_shipping_threshold: 10000,
        flat_shipping_rate: 199,
        currency_symbol: '₹',
        currency_code: 'INR',
        tax_inclusive: true,
      },
      social: (settingsMap.get('social') as Record<string, string>) || {
        instagram: 'https://instagram.com/sumamsboutique',
        facebook: 'https://facebook.com/sumamsboutique',
        youtube: 'https://youtube.com/@sumamsboutique',
      },
      notifications: (settingsMap.get('notifications') as Record<string, unknown>) || {
        order_alert_email: 'orders@sumamsboutique.com',
        low_stock_threshold: 3,
        notify_on_new_order: true,
      },
    }
  } catch (err) {
    console.error('[admin/queries] getAdminStoreSettings error:', err)
    return {
      general: {
        store_name: "Sumam's Boutique",
        tagline: 'Bengal-heritage sarees and fine jewellery',
        email: 'concierge@sumamsboutique.com',
        phone: '+91 98300 12345',
        whatsapp: '+91 98300 12345',
        address: '42 Southern Avenue, Kolkata 700029, West Bengal',
      },
      commerce: {
        free_shipping_threshold: 10000,
        flat_shipping_rate: 199,
        currency_symbol: '₹',
        currency_code: 'INR',
        tax_inclusive: true,
      },
      social: {
        instagram: 'https://instagram.com/sumamsboutique',
        facebook: 'https://facebook.com/sumamsboutique',
        youtube: 'https://youtube.com/@sumamsboutique',
      },
      notifications: {
        order_alert_email: 'orders@sumamsboutique.com',
        low_stock_threshold: 3,
        notify_on_new_order: true,
      },
    }
  }
}
