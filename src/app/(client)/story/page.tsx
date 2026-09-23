import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider, AlponaDivider, AlponaMotif, PAD, Eyebrow } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

const WEAVING_CLUSTERS = [
  {
    name: 'Shantiniketan & Birbhum',
    bn: 'শান্তিনিকেতন ও বীরভূম',
    craft: 'Kantha Stitch & Earth-Tone Handlooms',
    desc: 'Born from Tagore’s creative retreat, where artisan women stitch folk narratives layer by layer into repurposed tussar silks with needle and thread.',
    tag: 'Folk Embroidery',
  },
  {
    name: 'Shantipur & Phulia',
    bn: 'শান্তিপুর ও ফুলিয়া',
    craft: 'Fine Tant & Cotton Drapes',
    desc: 'Centuries of cotton weaving along the Hooghly river. Featherlight 100-count cottons that breathe effortlessly with summer warmth.',
    tag: 'Featherlight Tant',
  },
  {
    name: 'Murshidabad',
    bn: 'মুর্শিদাবাদ',
    craft: 'Pure Mulberry Silk',
    desc: 'The historic capital of Bengal nawabs, renowned for silkworm rearing, natural luster, and fluid drapes hand-printed with timeless block patterns.',
    tag: 'Royal Silk',
  },
  {
    name: 'Bishnupur & Bankura',
    bn: 'বিষ্ণুপুর ও বাঁকুড়া',
    craft: 'Baluchari & Terracotta Motifs',
    desc: 'Intricate jacquard looms narrating scenes from epics and temple architecture across the pallu, preserved across generations of master weavers.',
    tag: 'Narrative Weave',
  },
  {
    name: 'Varanasi-Bengal Belt',
    bn: 'বেনারসি কারুশিল্প',
    craft: 'Kadwa Jangla Benarasi',
    desc: 'Pure Katan silk woven with authentic gold zari kadwa motifs, individually hand-locked into the warp so no loose threads remain on the reverse.',
    tag: 'Bridal Heirloom',
  },
  {
    name: 'Temple Atelier',
    bn: 'মন্দির গহনা',
    craft: 'Hand-Finished Temple Jewellery',
    desc: 'Brass and alloy bases adorned with motifs of deities, lotus petals, and peacocks, finished with 24-carat micro-plating and antique patina.',
    tag: 'Heirloom Jewels',
  },
]

const MILESTONES = [
  {
    year: '2021',
    title: 'The First Loom in Birbhum',
    desc: 'Sumam embarked on solo journeys across rural West Bengal, sitting alongside fourth-generation weavers to understand how authentic handloom was losing ground to powerloom copies.',
  },
  {
    year: '2023',
    title: 'Fair-Weave Artisan Collective',
    desc: 'Formalized direct partnerships with 45+ master weaver families across Shantipur, Murshidabad, and Bishnupur, paying fair wages directly without middlemen.',
  },
  {
    year: '2025',
    title: 'The Heirloom Jewellery Atelier',
    desc: 'Expanded the curation to temple jewellery and antique-finished ornaments, pairing classical Bengal sarees with authentic South Indian and regional metal craft.',
  },
  {
    year: '2026',
    title: 'The Digital Flagship & One-of-One Standard',
    desc: 'Launched the digital boutique with strict single-piece provenance: every piece in our catalogue is uniquely hand-verified, photographed, and never mass-reproduced.',
  },
]

export default function Story() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />

      {/* ── 1. Hero Philosophy (sunitsaha.dev inspired editorial statement) ── */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[rgba(140,106,85,0.2)]">
        {/* Background Subtle Noise Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '200px 200px',
          }}
        />

        <div className={cn(PAD, 'relative z-10 max-w-4xl')}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-copper" />
            <span className="font-ui text-[10px] tracking-[0.28em] text-copper uppercase font-medium">
              Sumam&apos;s Boutique · The Atelier Narrative
            </span>
          </div>

          <h1 className="font-display text-[clamp(32px,5.2vw,60px)] font-light leading-[1.12] text-dark tracking-tight">
            We believe handloom is fine art —{' '}
            <em className="italic text-copper font-serif font-normal">our medium just happens to be the loom.</em>
          </h1>

          <p className="mt-8 font-ui text-[16px] md:text-[18px] font-light leading-[1.8] text-dark/85 max-w-2xl">
            Sumam&apos;s Boutique is born from an uncompromising pursuit: finding sarees and jewellery that carry
            the fragrance of Bengali earth, the rhythm of wooden shuttles, and the quiet dignity of generational craft.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-ui tracking-wider text-muted">
            <span className="px-3 py-1.5 bg-cream border border-[rgba(140,106,85,0.25)] text-dark">
              100% Handloom Verified
            </span>
            <span className="px-3 py-1.5 bg-cream border border-[rgba(140,106,85,0.25)] text-dark">
              One-of-One Pieces
            </span>
            <span className="px-3 py-1.5 bg-cream border border-[rgba(140,106,85,0.25)] text-dark">
              Direct Weaver Sourcing
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Founder's Philosophy & Visual Anchor ── */}
      <section className={cn(PAD, 'py-16 md:py-24')}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-10 md:gap-16 items-center">
          {/* Left: Atelier Vignette Box */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(155deg,#2A0D06,#6B2410_35%,#A04514_70%,#BF5E18)] flex flex-col justify-between p-8 md:p-10 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="border border-dashed border-ivory/30 px-3.5 py-1 font-ui text-[9px] tracking-[0.2em] text-ivory/70 uppercase">
                FOUNDER ARCHIVE
              </div>
              <AlponaMotif size={56} opacity={0.25} />
            </div>

            <div className="text-center my-auto">
              <span className="font-bengali text-[54px] md:text-[68px] font-light text-ivory/35 select-none block leading-none">
                সুমাম
              </span>
              <span className="font-ui text-[11px] tracking-[0.24em] text-ivory/80 uppercase mt-4 block">
                Sumam&apos;s Boutique · Shantiniketan
              </span>
            </div>

            <div className="border-t border-ivory/20 pt-4 text-center">
              <p className="font-display italic text-ivory/90 text-sm md:text-base">
                &quot;When you wrap a handloom drape, you wear four hundred hours of human patience.&quot;
              </p>
            </div>
          </div>

          {/* Right: Detailed Brand Narrative */}
          <div className="space-y-6">
            <Eyebrow label="Origin & Purpose" hairline={false} />
            <h2 className="font-display text-3xl md:text-4xl font-light text-dark leading-tight">
              Sourced by hand, <span className="italic text-copper">cherished for generations.</span>
            </h2>

            <div className="space-y-4 font-ui text-sm md:text-[15px] font-light leading-[1.85] text-dark/80">
              <p>
                In an era dominated by rapid synthetic production, the true Bengali handloom is a sanctuary of touch,
                breath, and memory. Each motif on our Jamdani, every rib of our Tant, and each intricate kadwa cluster on
                our Benarasi is woven by hand on wooden pit-looms.
              </p>
              <p>
                Sumam travels personally across rural Bengal each season. We sit inside the mud-plastered homes of
                weavers in Birbhum, the riverside ateliers of Nadia, and the old quarters of Murshidabad. We inspect yarn
                density, verify hand-dyed natural palettes, and select only pieces that meet our standards of drape and durability.
              </p>
              <p>
                Our pieces are strictly <strong>one-of-one</strong>. Because human hands guide the shuttle, no two drapes are ever
                identical. When a saree leaves our boutique, that exact pattern in that exact dye run is never woven again.
              </p>
            </div>

            <div className="pt-2 border-l-2 border-copper pl-5 my-6">
              <p className="font-display italic text-lg md:text-xl text-dark leading-relaxed">
                &quot;We don&apos;t keep warehouses. We keep relationships with master artisans who have carried Bengal&apos;s pride
                through centuries.&quot;
              </p>
              <div className="font-ui text-xs font-semibold uppercase tracking-wider text-copper mt-2">
                — Sumam, Founder & Atelier Director
              </div>
            </div>
          </div>
        </div>
      </section>

      <AlponaDivider />

      {/* ── 3. The Weaving Clusters (The Craft Library) ── */}
      <section className={cn(PAD, 'py-16 md:py-24 bg-cream/50')}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow label="Geographic Heritage" hairline={false} cn="justify-center" />
          <h2 className="font-display text-3xl md:text-4xl font-light text-dark mt-2">
            The Weaving <span className="italic text-copper">Clusters</span>
          </h2>
          <p className="font-ui text-xs md:text-sm text-muted mt-2 font-light">
            Every region in Bengal has its own dialect of thread. Explore the traditional weaving belts we champion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEAVING_CLUSTERS.map((cluster) => (
            <div
              key={cluster.name}
              className="bg-white border border-[rgba(140,106,85,0.25)] p-6 md:p-7 flex flex-col justify-between hover:border-copper transition-all duration-300 shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-cream font-ui text-[9px] font-semibold uppercase tracking-wider text-copper">
                    {cluster.tag}
                  </span>
                  <span className="font-bengali text-xs text-muted/70">{cluster.bn}</span>
                </div>
                <h3 className="font-display text-xl text-dark group-hover:text-copper transition-colors">
                  {cluster.name}
                </h3>
                <div className="font-ui text-[11px] font-medium tracking-wide text-copper uppercase mt-0.5 mb-3">
                  {cluster.craft}
                </div>
                <p className="font-ui text-xs font-light text-dark/75 leading-relaxed">
                  {cluster.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(140,106,85,0.15)] flex items-center justify-between">
                <span className="font-ui text-[10px] text-muted uppercase tracking-wider">Atelier Verified</span>
                <span className="text-copper text-xs font-medium group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. The Journey Milestones (sunitsaha.dev timeline inspired) ── */}
      <section className={cn(PAD, 'py-16 md:py-24')}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow label="Our Path" hairline={false} cn="justify-center" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-dark mt-2">
              The Journey of <span className="italic text-copper">Sumam&apos;s</span>
            </h2>
            <p className="font-ui text-xs md:text-sm text-muted mt-2 font-light">
              How a passion for authentic Bengali craft transformed into a curated boutique atelier.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-px before:bg-[rgba(140,106,85,0.25)]">
            {MILESTONES.map((item) => (
              <div key={item.year} className="relative flex items-start gap-6 pl-10">
                <div className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full bg-ivory border-2 border-copper flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-copper" />
                </div>
                <div className="bg-cream/60 border border-[rgba(140,106,85,0.2)] p-5 md:p-6 flex-1 hover:border-copper/60 transition-colors">
                  <span className="font-ui text-[11px] font-bold tracking-widest text-copper uppercase block">
                    {item.year}
                  </span>
                  <h4 className="font-display text-lg md:text-xl text-dark mt-1 font-normal">
                    {item.title}
                  </h4>
                  <p className="font-ui text-xs md:text-sm font-light text-dark/75 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Atelier Invitation CTA ── */}
      <section className="bg-dark text-ivory py-16 md:py-20 text-center relative overflow-hidden">
        <div className={cn(PAD, 'relative z-10 max-w-xl mx-auto space-y-5')}>
          <div className="inline-block px-3 py-1 border border-gold/40 text-gold font-ui text-[10px] tracking-[0.24em] uppercase">
            ATELIER EXPERIENCE
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-light leading-tight">
            Discover Your <em className="italic text-copper">One-of-One</em> Heirloom
          </h2>
          <p className="font-ui text-xs md:text-sm font-light text-ivory/70 leading-relaxed">
            Every piece is ready for immediate dispatch, wrapped by hand in our signature packaging with craft notes and authentication details.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/sarees"
              className="px-6 py-3.5 bg-copper hover:bg-[#A04A18] text-ivory font-ui text-[11px] font-medium tracking-[0.2em] uppercase transition-colors"
            >
              Explore Saree Collection
            </Link>
            <Link
              href="/jewellery"
              className="px-6 py-3.5 bg-transparent border border-ivory/40 hover:border-ivory text-ivory font-ui text-[11px] font-medium tracking-[0.2em] uppercase transition-colors"
            >
              View Temple Jewellery
            </Link>
          </div>
        </div>
      </section>

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}