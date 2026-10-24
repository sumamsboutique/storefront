import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Cancellation Policy | Sumam's Boutique",
  description: "Cancellation Policy for Sumam's Boutique",
}

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Cancellation Policy</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Order Cancellation</h2>
            <p>Orders can be cancelled only before they are shipped. Once an order has been dispatched, cancellation is not possible.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. How to Cancel</h2>
            <p>To request cancellation, email <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a> with your Order ID and registered email address as soon as possible.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Refund for Cancelled Orders</h2>
            <p>If cancellation is approved before dispatch, the full amount will be refunded to the original payment method via Razorpay within 5-7 business days.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Failed/Unpaid Orders</h2>
            <p>Orders left unpaid do not get confirmed and are automatically cancelled by the system.</p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
