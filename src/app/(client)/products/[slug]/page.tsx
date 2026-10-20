import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import Pdp from '@/components/storefront/Pdp'
import { getProductBySlug, getAllProducts } from '@/lib/data'
import { siteUrl } from '@/lib/site'

export const revalidate = 300

type Params = { slug: string }

export async function generateStaticParams() {
  const all = await getAllProducts()
  return all.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Sumam's Boutique`,
    description: product.sub || `${product.weave} saree from Sumam's Boutique.`,
    openGraph: {
      title: `${product.name} — Sumam's Boutique`,
      description: product.sub || `${product.weave} saree from Sumam's Boutique.`,
      type: 'website',
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // Same category first, then anything else — so the strip always has real pieces to show.
  const all = await getAllProducts()
  const related = all.filter((p) => p.slug !== product.slug)
  const sameCategory = related.filter((p) => p.categorySlug && p.categorySlug === product.categorySlug)
  const relatedSorted = [...sameCategory, ...related.filter((p) => !sameCategory.includes(p))]

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.sub || `${product.weave}`,
    image: product.images?.[0] ? [product.images[0]] : undefined,
    url: `${siteUrl()}/products/${product.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.priceNum,
      availability: product.sold ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    },
  }

  return (
    <main className="min-h-screen bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Navbar />
      <Pdp product={product} related={relatedSorted} />
      <Footer /> 
    </main>
  )
}
