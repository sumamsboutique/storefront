import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader, Bullets } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Guides" title="Size" em="Guide" />
      <section className={cn(PAD, 'grid gap-10 pb-16 md:grid-cols-2')}>
        <Bullets
          title="Sarees"
          items={['6.5 m saree length', '0.8 m blouse piece', '110 cm width']}
          note="Sarees are free-size. The included blouse piece is ready to be tailored — share your measurements and we will advise."
        />
        <Bullets
          title="Jewellery"
          items={['Chain length 45 cm', 'Width 3 cm', 'Drop 8 cm']}
          note="Dimensions are representative of each piece; confirm exact sizing on the product page."
        />
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}