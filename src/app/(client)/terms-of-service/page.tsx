import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Terms of Service | Sumam's Boutique",
  description: "Terms of Service for Sumam's Boutique.",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Terms of Service</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2026</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Acceptance of Terms</h2>
            <p>By accessing or using www.sumamsboutique.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Use of the Site</h2>
            <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You must not misuse the Site, interfere with its security, or attempt to access restricted areas.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Products, Pricing & Availability</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All prices are listed in Indian Rupees (INR) and are inclusive/exclusive of taxes as displayed at checkout.</li>
              <li>Product images are for representation only. Due to the handmade nature of handloom textiles, slight variations in weave, color, or motif may occur.</li>
              <li>We reserve the right to modify prices, update product information, or discontinue products without prior notice.</li>
              <li>Product availability is subject to change. We may cancel orders if an item becomes unavailable.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Orders & Payments</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order.</li>
              <li>Payments are securely processed via Razorpay. By placing an order, you authorize us (and Razorpay) to charge the full amount to your chosen payment method.</li>
              <li>We do not store full credit/debit card details on our servers.</li>
              <li>Order confirmation does not guarantee dispatch if there are pricing, stock, or fraud-related concerns.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">5. Shipping, Returns & Exchanges</h2>
            <p>Your purchase is subject to our <a className="text-copper underline" href="/shipping-returns">Shipping & Returns</a> policy. Please review it carefully before placing an order.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">6. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate, current, and complete information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">7. Intellectual Property</h2>
            <p>All content on the Site — including text, images, graphics, logos, designs, and trademarks — is the property of Sumam&apos;s Boutique or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use content without our written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Sumam&apos;s Boutique shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or purchase of products.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">10. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">11. Contact Us</h2>
            <p>For questions about these Terms, please contact us at <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a>.</p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
