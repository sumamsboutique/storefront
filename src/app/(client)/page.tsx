import Navbar from '@/components/storefront/Navbar'
import Hero from '@/components/storefront/home/Hero'
import Marquee from '@/components/storefront/home/Marquee'
import FeaturedCollection from '@/components/storefront/home/FeaturedCollection'
import BrowseByCategory from '@/components/storefront/home/BrowseByCategory'
import { SareeBorderDivider } from '@/components/shared/primitives'
import OurHeritage from '@/components/storefront/home/OurHeritage'
import JewellerySpotlight from '@/components/storefront/home/JewellerySpotlight'
import ReviewsAndInstagram from '@/components/storefront/home/ReviewsAndInstagram'
import Footer from '@/components/storefront/Footer'
import { getHomeContent, getAllProducts } from '@/lib/data'
import type { ProductCardData } from '@/components/storefront/ProductCard'

export const revalidate = 300

export default async function Home() {
  const [content, all] = await Promise.all([getHomeContent(), getAllProducts()])

  // Sections unpublished from Admin → Content are skipped. Null = content layer
  // unavailable, keep rendering (components fall back to built-in content).
  const shown = (key: string) => !content.published_sections || content.published_sections.includes(key)

  const featured: ProductCardData[] = content.featured_collection
    .map((f) => {
      const p = all.find((x) => x.slug === f.slug)
      if (!p) return null
      return {
        id: p.id,
        catalogId: p.id,
        slug: p.slug,
        badge: f.badge ?? p.badge,
        badgeColor: p.badge ? '#D4880A' : undefined,
        gradient: p.gradient,
        name: p.name,
        sub: p.sub || p.weave,
        price: p.price,
        priceNum: p.priceNum,
        label: p.label,
        aspect: f.aspect,
        images: p.images,
        sold: p.sold,
      } as ProductCardData
    })
    .filter(Boolean) as ProductCardData[]

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      {shown('hero') && <Hero slides={content.hero} />}
      {shown('marquee') && <Marquee items={content.marquee} />}
      {shown('featured_collection') && <FeaturedCollection products={featured} />}
      {shown('browse_by_category') && <BrowseByCategory data={content.browse_by_category} />}
      <SareeBorderDivider />
      {shown('our_heritage') && <OurHeritage data={content.our_heritage} />}
      {shown('jewellery_spotlight') && <JewellerySpotlight data={content.jewellery_spotlight} />}
      {/* sections 7 + 8 render as one combined block, so both must be live */}
      {shown('testimonials') && shown('instagram_strip') && (
        <ReviewsAndInstagram testimonials={content.testimonials} instagram={content.instagram_strip} />
      )}
      {shown('footer') && <Footer footer={content.footer} />}
    </main>
  )
}
