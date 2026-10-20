import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/data'
import { SHOP_CATEGORIES } from '@/lib/catalog'
import { siteUrl } from '@/lib/site'

const base = siteUrl()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const staticRoutes = [
    '',
    '/sarees',
    '/collections',
    '/search',
    '/story',
    '/wishlist',
    '/account',
    '/shipping-returns',
    '/size-guide',
    '/care-instructions',
    '/contact',
    '/faqs',
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }))

  const productRoutes = products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date() }))
  const categoryRoutes = SHOP_CATEGORIES.map((c) => ({ url: `${base}/sarees/${c.slug}`, lastModified: new Date() }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes]
}
