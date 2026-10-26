import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'

export const metadata = {
  title: "Track Your Order | Sumam's Boutique",
  description: "Track the status of your Sumam's Boutique order with your Order ID and email address.",
}

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="mx-auto w-full max-w-[720px] px-[clamp(20px,6vw,48px)] py-12 md:py-16">
          <header className="text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted">Support</p>
            <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-light text-dark">
              Track your order
            </h1>
            <p className="mx-auto mt-3 max-w-[560px] font-ui text-sm font-light leading-relaxed text-muted">
              Check the status of a recent order using your order ID and the email address used at
              checkout.
            </p>
          </header>

          <section className="mt-10 border border-[#DCC9A8] bg-[#FDFBF7] p-6 sm:p-8">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                  Order ID
                </label>
                <input
                  name="orderId"
                  placeholder="e.g. 475b604a-..."
                  className="w-full border-b border-[rgba(140,106,85,0.35)] bg-transparent px-0 py-2 font-ui text-sm text-dark outline-none transition-colors focus:border-copper"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border-b border-[rgba(140,106,85,0.35)] bg-transparent px-0 py-2 font-ui text-sm text-dark outline-none transition-colors focus:border-copper"
                />
              </div>
              <button
                type="submit"
                disabled
                className="mt-2 self-start border border-dark bg-dark px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-copper hover:bg-copper disabled:opacity-50"
              >
                Track order
              </button>
              <p className="font-sans text-xs text-muted">
                For the fastest updates, sign in to{' '}
                <a className="text-copper underline" href="/account?tab=orders">
                  My Orders
                </a>{' '}
                to view full status, shipping details, and tracking links. If you need help, email{' '}
                <a className="text-copper underline" href="mailto:hello@sumamsboutique.com">
                  hello@sumamsboutique.com
                </a>{' '}
                with your Order ID.
              </p>
            </form>
          </section>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
