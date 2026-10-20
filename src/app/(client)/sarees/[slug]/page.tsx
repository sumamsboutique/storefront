import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import Plp from '@/components/storefront/Plp'
import { SareeBorderDivider } from '@/components/shared/primitives'
import { getProductsByType } from '@/lib/data'
import { SHOP_CATEGORIES } from '@/lib/catalog'

export const revalidate = 300
// Unknown slugs 404 at the router (soft-200 otherwise: notFound() lands after hydration starts).
export const dynamicParams = false

type Params = { slug: string }

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((c) => ({ slug: c.slug }))
}

const findCategory = (slug: string) => SHOP_CATEGORIES.find((c) => c.slug === slug)

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) return {}
  return {
    title: `${category.label} — Sumam's Boutique`,
    description: `Shop ${category.label.toLowerCase()} from Sumam's Boutique — Bengal-heritage sarees, curated with love.`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) notFound()

  const products = await getProductsByType('saree')

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Suspense>
        <Plp key={slug} products={products} keyword="SAREES" title={category.label} category={category.label} />
      </Suspense>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
