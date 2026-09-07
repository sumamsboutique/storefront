import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader, Bullets } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function CareInstructionsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Care" title="Care" em="Instructions" />
      <section className={cn(PAD, 'grid gap-10 pb-16 md:grid-cols-2')}>
        <Bullets
          title="Sarees"
          items={[
            'Dry clean only',
            'Store wrapped in muslin cloth',
            'Avoid direct sunlight',
            'Do not iron directly on zari',
          ]}
        />
        <Bullets
          title="Jewellery"
          items={['Wipe with a soft cloth', 'Keep away from water and perfume', 'Store in the original pouch']}
        />
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}