import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Privacy Policy | Sumam's Boutique",
  description: "Privacy Policy for Sumam's Boutique",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Privacy Policy</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2025</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Introduction</h2>
            <p>Sumam&apos;s Boutique (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal information when you use www.sumamsboutique.com.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, phone number when you sign up or log in.</li>
              <li><strong>Checkout Details:</strong> Billing/shipping address, contact details to fulfill your orders.</li>
              <li><strong>Payment Information:</strong> Payments are securely processed by Razorpay. We do not store your full card details.</li>
              <li><strong>Authentication:</strong> If you sign in with Google, we receive your name, email and profile picture as permitted by Google.</li>
              <li><strong>Usage Data:</strong> Basic technical information like device/browser for site functionality.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and fulfill your orders</li>
              <li>To create and manage your customer account</li>
              <li>To communicate order updates</li>
              <li>To improve our website and customer experience</li>
              <li>To prevent fraud and ensure secure transactions</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Third-Party Services</h2>
            <p>We use trusted third-party providers to run our store:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> – Authentication, database and storage</li>
              <li><strong>Razorpay</strong> – Secure payment processing</li>
              <li><strong>Google</strong> – OAuth sign-in (if used)</li>
              <li><strong>Vercel</strong> – Hosting and infrastructure</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">5. Data Security</h2>
            <p>We use reasonable security measures to protect your personal data. All sensitive payment data is handled directly by Razorpay in line with industry standards.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">6. Your Rights</h2>
            <p>You may request access, correction or deletion of your personal information by emailing us at the contact details below.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-light text-dark">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a></p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
