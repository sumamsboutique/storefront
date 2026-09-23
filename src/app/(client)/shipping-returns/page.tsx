import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader, Bullets } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Policies" title="Shipping &" em="Returns" />
      <section className={cn(PAD, 'grid gap-10 pb-16 md:grid-cols-2')}>
        <Bullets
          title="Shipping"
          items={[
            'Free shipping above ₹10,000',
            'Delivers within 5–7 business days',
            'International shipping available',
          ]}
          note="Orders dispatch within 1–2 business days and arrive with a tracking link."
        />
        <Bullets
          title="Returns"
          items={['7–day return window', 'Returns subject to inspection', 'One-of-one items: inspection applies']}
          note="Begin a return within the window; handloom pieces are inspected before acceptance."
        />
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}