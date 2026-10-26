import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Privacy Policy | Sumam's Boutique",
  description: "Privacy Policy for Sumam's Boutique.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 mx-auto w-full max-w-[900px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
        <header className="text-center mb-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">Privacy Policy</h1>
          <p className="mt-2 font-ui text-sm text-muted">Last updated: October 2026</p>
        </header>
        <div className="prose prose-sm max-w-none font-ui text-dark/90 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-xl font-light text-dark">1. Introduction</h2>
            <p>Sumam&apos;s Boutique (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal information when you use www.sumamsboutique.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, phone number when you create an account or sign in.</li>
              <li><strong>Checkout Details:</strong> Billing and shipping address, contact details required to fulfill your orders.</li>
              <li><strong>Payment Information:</strong> Payments are securely processed by Razorpay. We do not store your full card, UPI, or banking details.</li>
              <li><strong>Authentication:</strong> If you sign in with Google, we receive your name, email address, and profile picture as permitted by Google&apos;s OAuth flow.</li>
              <li><strong>Usage Data:</strong> Basic technical information (browser type, device, IP address) for security, analytics, and site functionality.</li>
              <li><strong>Communications:</strong> Information you provide when contacting us via email or forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process, fulfill, and track your orders</li>
              <li>To create and manage your customer account</li>
              <li>To communicate order updates, shipping notifications, and support responses</li>
              <li>To prevent fraud, secure transactions, and protect against abuse</li>
              <li>To improve our website, products, and customer experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">4. Sharing Your Information</h2>
            <p>We only share your information with trusted third parties necessary to operate our business:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> – Authentication, database, and secure storage</li>
              <li><strong>Razorpay</strong> – Secure payment processing</li>
              <li><strong>Google</strong> – OAuth sign-in (if used)</li>
              <li><strong>Vercel</strong> – Hosting and infrastructure</li>
              <li><strong>Shipping/Courier Partners</strong> – To deliver your orders (limited to delivery-related details)</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">5. Data Security</h2>
            <p>We use industry-standard security measures including encryption, secure authentication, and access controls. All sensitive payment data is handled directly by Razorpay in compliance with PCI DSS standards.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">6. Cookies</h2>
            <p>We use essential cookies to maintain sessions, authentication, and cart functionality. These are necessary for the Site to work properly.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">7. Your Rights</h2>
            <p>You may request access, correction, or deletion of your personal information. You may also withdraw consent where applicable. To make such a request, email us at <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">8. Data Retention</h2>
            <p>We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The "Last updated" date will reflect the most recent revision.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-light text-dark">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">hello@sumamsboutique.com</a>.</p>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
