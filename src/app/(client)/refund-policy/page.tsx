import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Refund Policy | Sumam's Boutique",
  description: "Refund Policy for Sumam's Boutique",
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Refund Policy</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Eligibility for Refund</h2>
            <p>Since our products are handcrafted sarees and jewellery, we take great care in quality checks before dispatch. Refunds are only considered in case of a verified manufacturing defect or damage during transit.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Reporting a Issue</h2>
            <p>You must notify us within 48 hours of delivery with clear photos of the damaged/defective product and the packaging. Email <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a> with your Order ID.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Return Process</h2>
            <p>Once approved, we will guide you on returning the product in its original packaging with all tags and accessories intact. The product must be unused and unworn.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Refund Timeline</h2>
            <p>Approved refunds will be processed to the original payment method via Razorpay within 7-10 business days after we receive and verify the returned item.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">5. Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Products damaged due to misuse or improper care</li>
              <li>Products without original tags/packaging</li>
              <li>Customised or made-to-order items</li>
            </ul>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
