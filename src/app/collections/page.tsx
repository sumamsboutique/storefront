import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider, AlponaDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'
import { getAllProducts } from '@/lib/data'
import { PlpCard } from '@/components/storefront/PlpCard'

const COLLECTIONS = [
  {
    name: 'Bridal Edit',
    href: '/sarees',
    desc: 'Showstopping Benarasi & garad for the big day.',
    gradient: 'linear-gradient(155deg,#2A0D06,#7A2C0C 50%,#BF5E18)',
  },
  {
    name: 'Festive Weaves',
    href: '/sarees',
    desc: 'Puja-ready silk, tant & jamdani with a golden glow.',
    gradient: 'linear-gradient(160deg,#3D1408,#6B2310 40%,#BF5E18 70%,#D4880A)',
  },
  {
    name: 'Everyday Heritage',
    href: '/sarees',
    desc: 'Breathable muslin & kantha for daily grace.',
    gradient: 'linear-gradient(170deg,#EDE3D6,#C9B488 50%,#8E6F4A)',
  },
  {
    name: 'Temple Jewellery',
    href: '/jewellery',
    desc: 'Antique-gold craft, hand-finished to last.',
    gradient: 'linear-gradient(165deg,#4A2010,#8B3A14 40%,#C4611A 70%,#7A2C0C)',
  },
]

export default async function Collections() {
  const bridal = (await getAllProducts()).filter((p) => p.occasion === 'Bridal')
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <div className={cn(PAD, 'pt-[26px] pb-[18px]')}>
        <div className="flex items-center gap-2.5 pb-3.5">
          <span className="h-px w-5 bg-copper" />
          <span className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase">Curated edits</span>
        </div>
        <h1 className="font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
          Our <em className="italic text-copper">Collections</em>
        </h1>
        <AlponaDivider />
      </div>

      <div className={cn(PAD, 'grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2')}>
        {COLLECTIONS.map((c) => (
          <a key={c.name} href={c.href} className="group block">
            <div className="relative flex aspect-[4/3] items-end overflow-hidden p-6" style={{ background: c.gradient }}>
              <div className="absolute inset-0 bg-[rgba(28,10,6,0.25)] transition-opacity group-hover:opacity-0" />
              <div className="relative">
                <div className="font-display text-3xl font-light text-ivory">{c.name}</div>
                <p className="mt-1 font-ui text-xs font-light text-[rgba(245,239,230,0.8)]">{c.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className={cn(PAD, 'pb-14')}>
        <div className="flex items-center justify-between pb-6">
          <div className="font-display text-3xl font-light text-dark">
            Bridal <em className="italic text-copper">Picks</em>
          </div>
          <a href="/sarees" className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase border-b border-copper pb-0.5">View all →</a>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
          {bridal.slice(0, 4).map((p) => (
            <PlpCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}