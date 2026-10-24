import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Terms of Service | Sumam's Boutique",
  description: "Terms of Service for Sumam's Boutique",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Terms of Service</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Acceptance of Terms</h2>
            <p>By accessing or using www.sumamsboutique.com, you agree to be bound by these Terms of Service.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Products & Pricing</h2>
            <p>All prices are listed in INR. We reserve the right to change prices without prior notice. Product images are for representation; slight variations may occur due to handcrafting.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Orders & Payments</h2>
            <p>Orders are subject to availability and confirmation. Payments are securely processed via Razorpay. By placing an order, you authorize the transaction for the full amount.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Shipping & Returns</h2>
            <p>Please refer to our <a className="text-copper underline" href="/shipping-returns">Shipping & Returns</a> page for details regarding delivery timelines, returns and exchanges.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">5. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and up-to-date information.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">6. Intellectual Property</h2>
            <p>All content on this website including logos, images, text and design is the property of Sumam&apos;s Boutique and may not be reproduced without permission.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">7. Limitation of Liability</h2>
            <p>Sumam&apos;s Boutique shall not be liable for any indirect or consequential damages arising from the use of this website.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">8. Contact</h2>
            <p>For any questions regarding these Terms, reach out to <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a></p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
