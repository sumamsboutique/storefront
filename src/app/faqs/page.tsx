import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do you ship outside India?',
    a: 'Yes — international shipping is available. Delivery timelines depend on your destination.',
  },
  {
    q: 'What is your return window?',
    a: 'Standard orders can be returned within 7–day window; one-of-one pieces are subject to inspection. See Shipping & Returns.',
  },
  {
    q: 'Are sarees one size?',
    a: 'All sarees are free-size: 6.5 m length with an 0.8 m blouse piece. Jewellery dimensions are indicative per piece.',
  },
  {
    q: 'How should I store a handloom saree?',
    a: 'Dry clean, wrap it in muslin cloth, keep it away from direct sunlight, and never iron directly on the zari.',
  },
  {
    q: 'Can I order through WhatsApp?',
    a: 'Yes — share the product and your measurements on WhatsApp and we will confirm availability before dispatch.',
  },
]

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Support" title="Frequently Asked" em="Questions" />
      <section className={cn(PAD, 'pb-16')}>
        <div className="mx-auto flex max-w-[720px] flex-col">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-[rgba(140,106,85,0.2)] py-6">
              <h2 className="font-display text-[20px] font-light leading-[1.4] text-dark">{q}</h2>
              <p className="mt-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}