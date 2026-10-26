import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export const metadata = {
  title: "FAQs | Sumam's Boutique",
  description: "Frequently asked questions about orders, shipping, returns, handloom sarees, and care at Sumam's Boutique.",
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do you ship outside India?',
    a: 'Yes, we ship internationally to select countries. Shipping charges, duties, and customs fees may apply depending on your location. You will see the final shipping cost at checkout.',
  },
  {
    q: 'What are the shipping timelines?',
    a: 'Orders are dispatched within 1–2 business days. Domestic deliveries typically arrive within 5–7 business days. International deliveries take 10–21 business days depending on the destination and customs clearance.',
  },
  {
    q: 'Is shipping free?',
    a: 'Yes, we offer free domestic shipping on orders above ₹10,000. For orders below ₹10,000 and for international orders, shipping charges are calculated at checkout.',
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'Standard orders can be returned or exchanged within 3 days of delivery. One-of-one, limited edition, and sale items are inspected before acceptance. Items must be unworn, unwashed, in original condition with all tags and packaging intact. See our Shipping & Returns page for full details.',
  },
  {
    q: 'Are sarees one size?',
    a: 'All sarees are free-size: 6.5 meters length with a 0.8 meter blouse piece. The blouse piece is unstitched and can be tailored to your measurements by your local tailor.',
  },
  {
    q: 'Are your sarees handwoven?',
    a: 'Yes. We curate authentic handwoven sarees from Bengal — including Banarasi, Tant, Jamdani, Garad, Tussar, Ghicha, and other traditional weaves. Each piece is handcrafted by skilled artisans.',
  },
  {
    q: 'Will the color of the saree match the photos?',
    a: 'We make every effort to display colors as accurately as possible. However, slight variations may occur due to lighting, screen settings, and the natural characteristics of hand-dyed and handwoven textiles.',
  },
  {
    q: 'How should I care for my handloom saree?',
    a: 'For first wash, we recommend dry cleaning. Store wrapped in muslin cloth, away from direct sunlight and moisture. Avoid ironing directly on zari — use a pressing cloth on low heat. Keep perfumes and deodorants away from zari work.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes. Once your order is dispatched, you will receive a tracking link via email/SMS. You can also track your order using the "Track Order" page on our website with your order details.',
  },
  {
    q: 'Can I order through WhatsApp?',
    a: 'Yes. Share the product link/name and your preferred details on WhatsApp and our team will check availability and guide you through the process.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept secure payments via Razorpay — including UPI, Credit/Debit Cards, Net Banking, and Wallets. All transactions are encrypted and securely processed.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Orders can be cancelled before dispatch. Once dispatched, cancellations are not possible and our return policy will apply. Please reach out to us as soon as possible if you need to cancel.',
  },
]

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Help & Support" title="Frequently Asked" em="Questions" />
      <section className={cn(PAD, 'pb-16')}>
        <div className="mx-auto flex max-w-[820px] flex-col">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="border-b border-[rgba(140,106,85,0.2)] py-7">
              <h2 className="font-display text-[20px] md:text-[22px] font-light leading-[1.4] text-dark">{q}</h2>
              <p className="mt-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.85)]">{a}</p>
            </div>
          ))}
          <div className="mt-10 text-center">
            <p className="font-ui text-[15px] text-dark/80">
              Still have questions? Reach out to us at{' '}
              <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">
                hello@sumamsboutique.com
              </a>
            </p>
          </div>
        </div>
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
