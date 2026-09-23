import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { PageHeader, Bullets } from '@/components/storefront/InfoPage'
import { SareeBorderDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <PageHeader eyebrow="Get In Touch" title="Contact" em="Us" />
      <section className={cn(PAD, 'pb-16')}>
        <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
          <ul className="w-full space-y-3">
            <li className="flex items-start gap-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">
              <span className="mt-[12px] h-px w-4 shrink-0 bg-gold" />
              Write to us at{' '}
              <a href="mailto:hello@sumamsboutique.com" className="text-copper underline underline-offset-4">
                hello@sumamsboutique.com
              </a>
            </li>
            <li className="flex items-start gap-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">
              <span className="mt-[12px] h-px w-4 shrink-0 bg-gold" />
              We usually reply within one business day.
            </li>
            <li className="flex items-start gap-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">
              <span className="mt-[12px] h-px w-4 shrink-0 bg-gold" />
              For rush orders and custom sizing, ask us on WhatsApp.
            </li>
          </ul>
        </div>
      </section>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}