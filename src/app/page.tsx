import Navbar from '@/components/storefront/Navbar'
import Hero from '@/components/storefront/home/Hero'
import Marquee from '@/components/storefront/home/Marquee'
import FeaturedCollection from '@/components/storefront/home/FeaturedCollection'
import BrowseByCategory from '@/components/storefront/home/BrowseByCategory'
import { SareeBorderDivider } from '@/components/shared/primitives'
import OurHeritage from '@/components/storefront/home/OurHeritage'
import JewellerySpotlight from '@/components/storefront/home/JewellerySpotlight'
import InstagramStrip from '@/components/storefront/home/InstagramStrip'
import Footer from '@/components/storefront/Footer'
import { getHomeContent, getAllProducts } from '@/lib/data'
import type { ProductCardData } from '@/components/storefront/ProductCard'

export const revalidate = 300

export default async function Home() {
  const [content, all] = await Promise.all([getHomeContent(), getAllProducts()])

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
      } as ProductCardData
    })
    .filter(Boolean) as ProductCardData[]

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Hero slides={content.hero} />
      <Marquee items={content.marquee} />
      <FeaturedCollection products={featured} />
      <BrowseByCategory data={content.browse_by_category} />
      <SareeBorderDivider />
      <OurHeritage data={content.our_heritage} />
      <JewellerySpotlight data={content.jewellery_spotlight} />
      <InstagramStrip data={content.instagram_strip} />
      <Footer footer={content.footer} />
    </main>
  )
}
