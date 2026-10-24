import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Cookie Policy | Sumam's Boutique",
  description: "Cookie Policy for Sumam's Boutique",
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Cookie Policy</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device to help websites function properly and improve your experience.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. How We Use Cookies</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for cart, checkout, authentication and security.</li>
              <li><strong>Analytics Cookies:</strong> If enabled, Google Analytics helps us understand traffic to improve the site.</li>
              <li><strong>Preference Cookies:</strong> Help remember your choices (like session state).</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Managing Cookies</h2>
            <p>You can control or disable cookies through your browser settings. Disabling essential cookies may affect core functionality like login and checkout.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Contact</h2>
            <p>For questions about our Cookie Policy, email <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a></p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
