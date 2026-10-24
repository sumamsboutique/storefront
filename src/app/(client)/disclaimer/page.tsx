import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Disclaimer | Sumam's Boutique",
  description: "Disclaimer for Sumam's Boutique",
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Disclaimer</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. General Information</h2>
            <p>The information provided on www.sumamsboutique.com is for general informational purposes only. All product details, images and descriptions are as accurate as possible.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Handcrafted Products</h2>
            <p>Our sarees and jewellery are handcrafted. Minor variations in colour, weave, texture or embellishment are natural and part of their unique character. These do not qualify as defects.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. Colour Accuracy</h2>
            <p>Due to differences in screen settings and photography lighting, actual product colours may vary slightly from images shown.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. External Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">5. Changes</h2>
            <p>We reserve the right to update this disclaimer at any time without prior notice.</p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
