import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider, AlponaDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function Story() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <div className={cn(PAD, 'pt-[26px] pb-[18px] text-center')}>
        <div className="flex items-center justify-center gap-2.5 pb-3.5">
          <span className="h-px w-5 bg-copper" />
          <span className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase">Bengal heritage, hand-curated</span>
          <span className="h-px w-5 bg-copper" />
        </div>
        <h1 className="font-display text-[clamp(34px,5vw,52px)] font-light leading-[1.1] text-dark">
          Woven from <em className="italic text-copper">stories</em>
        </h1>
        <AlponaDivider />
      </div>

      <div className={cn(PAD, 'grid gap-8 pb-16 md:grid-cols-2')}>
        <div className="flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#2A0D06,#6B2410 35%,#A04514 70%,#BF5E18)] p-10 text-center">
          <div className="border border-dashed border-[rgba(245,239,230,0.25)] px-4 py-2 font-ui text-[10px] tracking-[0.18em] text-[rgba(245,239,230,0.6)] uppercase">
            Sumam&apos;s Boutique · বাংলার ঐতিহ্য
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">
            Sumam&apos;s Boutique began with a single loom in a Bengal village — and a belief that
            heritage should be worn, not just admired. Every saree and piece of jewellery in our
            collection is hand-picked by Sumam herself, travelling to cooperatives and artisan
            homes to choose pieces that carry their craft forward.
          </p>
          <p className="mt-4 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]">
            From the fine jamdani of Dhaka to the regal Benarasi of Varanasi, the temple gold of
            South India to the contemporary silhouettes of today — we bridge tradition and modern
            life, one hand-verified piece at a time.
          </p>
        </div>
      </div>

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}