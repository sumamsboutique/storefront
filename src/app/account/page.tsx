import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider, PAD, Eyebrow } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function Account() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <div className={cn(PAD, 'pt-[26px] pb-16')}>
        <Eyebrow label="Your account" hairline={false} />
        <h1 className="mt-2 font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
          Sign <em className="italic text-copper">in</em>
        </h1>
        <p className="mt-2 max-w-md font-ui text-sm font-light leading-relaxed text-muted">
          Orders, wishlist and address book live here. Full accounts arrive with the Phase 3
          backend — for now, this is a graceful placeholder.
        </p>
        <div className="mt-8 grid max-w-md gap-4">
          <input placeholder="Email address" className="border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2.5 font-ui text-sm text-dark outline-none" />
          <input placeholder="Password" type="password" className="border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2.5 font-ui text-sm text-dark outline-none" />
          <button className="bg-copper py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">Continue</button>
          <a href="/wishlist" className="text-center font-ui text-xs text-copper underline-offset-4 hover:underline">Or view your saved wishlist →</a>
        </div>
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}