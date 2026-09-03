'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Reveal } from '@/lib/reveal'
import type { BbcContent } from '@/lib/data'

interface Cat {
  id: string
  bn: string
  en: string
  gradient: string
  image?: string
  dark?: boolean
  hero?: boolean
}

const SAREE_HERO: Cat = {
  id: 'benarasi',
  bn: 'বেনারসি',
  en: 'Benarasi',
  gradient: 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)',
  image: '/Products/Banarasi/royal-crimson-benarasi.png',
  dark: true,
  hero: true,
}

const SAREE_SMALL: Cat[] = [
  { id: 'tant', bn: 'তাঁত', en: 'Tant', gradient: 'linear-gradient(175deg, #F5EFE6, #D4B896 50%, #8C6A55)', image: '/Products/Handlooms/nilima-tant-cotton.png', dark: false },
  { id: 'muslin', bn: 'মসলিন', en: 'Muslin', gradient: 'linear-gradient(175deg, #EDE3D6, #C4A87A 60%, #8C6A55)', image: '/Products/Handlooms/aarohi-muslin-drape.png', dark: false },
  { id: 'silk', bn: 'সিল্ক', en: 'Silk', gradient: 'linear-gradient(175deg, #2A1008, #6B2E0E 50%, #BF5E18)', image: '/Products/Handlooms/madhubani-silk-weave.png', dark: true },
  { id: 'kantha', bn: 'কাঁথা', en: 'Kantha', gradient: 'linear-gradient(175deg, #1C0A06, #4A2010 50%, #8C6A55)', image: '/Products/Handlooms/priya-kantha-stitch.png', dark: true },
  { id: 'jamdani', bn: 'জামদানি', en: 'Jamdani', gradient: 'linear-gradient(175deg, #EDE3D6, #BFA678 60%, #6B5238)', image: '/Products/Handlooms/rukmini-jamdani-cotton.png', dark: false },
  { id: 'garad', bn: 'গরদ', en: 'Garad', gradient: 'linear-gradient(175deg, #F5EFE6, #E8D5B0 50%, #BF5E18)', image: '/Products/Handlooms/shankha-garad-silk.png', dark: false },
]

const JEWEL_CATS: Cat[] = [
  { id: 'temple', bn: 'মন্দির গহনা', en: 'Temple', gradient: 'linear-gradient(175deg, #1C0A06, #4A2010 50%, #BF5E18)', image: '/Products/jewellery/lakshmi-temple-necklace.png', dark: true },
  { id: 'contemporary', bn: 'সমসাময়িক', en: 'Contemporary', gradient: 'linear-gradient(175deg, #2A1008, #5A2A14 50%, #D4880A)', image: '/Products/jewellery/kolkata-contemporary-studs.png', dark: true },
  { id: 'gold-plated', bn: 'সোনার মোড়ক', en: 'Gold-Plated', gradient: 'linear-gradient(175deg, #1C1406, #4A3810 50%, #D4880A)', image: '/Products/jewellery/heirloom-maangtikka.png', dark: true },
]

const DEFAULT: BbcContent = {
  sarees: { hero: SAREE_HERO, small: SAREE_SMALL },
  jewellery: JEWEL_CATS,
}

/* Desktop hero tile — spans 2 rows */
function HeroTile({ cat }: { cat: Cat }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={`/sarees?weave=${cat.en}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="cursor-pointer relative overflow-hidden min-h-[420px] block bg-cream"
      style={{ gridRow: '1 / 3' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gold z-20" />
      {cat.image ? (
        <img src={cat.image} alt={cat.en} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500" style={{ transform: hov ? 'scale(1.03)' : 'scale(1)' }} />
      ) : (
        <div className="absolute inset-0 transition-transform duration-500" style={{ background: cat.gradient, transform: hov ? 'scale(1.03)' : 'scale(1)' }} />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.62) 0%, transparent 60%)' }} />
      <div
        className="absolute inset-0 bg-[rgba(28,10,6,0.18)] transition-opacity"
        style={{ opacity: hov ? 1 : 0 }}
      />
      <div className="absolute bottom-7 left-7 z-30">
        <div className="font-bengali text-[22px] font-light text-[rgba(212,136,10,0.85)] mb-1 leading-[1.2]">
          {cat.bn}
        </div>
        <div className="font-display text-[32px] font-normal text-ivory leading-[1.1] mb-3">
          {cat.en}
        </div>
        <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-0.5">
          Explore →
        </span>
      </div>
    </Link>
  )
}

/* Desktop small tile */
function SmallTile({ cat, showHover = false }: { cat: Cat; showHover?: boolean }) {
  const [hov, setHov] = useState(showHover)
  const barColor = cat.dark ? '#D4880A' : '#BF5E18'
  return (
    <Link
      href={`/sarees?weave=${cat.en}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => !showHover && setHov(false)}
      className="cursor-pointer relative overflow-hidden min-h-[200px] block bg-cream"
    >
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-copper z-20 transition-all duration-300"
        style={{ background: barColor, width: hov ? '100%' : '0%' }}
      />
      {cat.image ? (
        <img src={cat.image} alt={cat.en} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500" style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
      ) : (
        <div className="absolute inset-0 transition-transform duration-500" style={{ background: cat.gradient, transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
      )}
      {cat.dark ? (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.55) 0%, transparent 55%)' }} />
      ) : (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(237,227,214,0.85) 0%, transparent 100%)' }} />
      )}
      <div
        className="absolute inset-0 bg-[rgba(28,10,6,0.15)]"
        style={{ opacity: hov ? 1 : 0 }}
      />
      <div className="absolute bottom-4 left-4 z-30">
        <div className="font-bengali text-sm font-light leading-[1.2] mb-[3px]" style={{ color: cat.dark ? 'rgba(212,136,10,0.85)' : '#8C6A55' }}>
          {cat.bn}
        </div>
        <div className="font-display text-[18px] font-normal leading-[1.1]" style={{ color: cat.dark ? '#F5EFE6' : '#1C0A06' }}>
          {cat.en}
        </div>
      </div>
    </Link>
  )
}

/* Mobile category tile (full-width or 2-col) */
function MobileTile({ cat, height }: { cat: Cat; height?: string | number }) {
  return (
    <Link
      href={`/sarees?weave=${cat.en}`}
      className="relative w-full overflow-hidden cursor-pointer shrink-0 block bg-cream"
      style={{ height: height ?? '100%' }}
    >
      {cat.image ? (
        <img src={cat.image} alt={cat.en} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: cat.gradient }} />
      )}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] z-20" style={{ background: cat.dark ? '#D4880A' : '#BF5E18' }} />
      {cat.dark ? (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.55) 0%, transparent 55%)' }} />
      ) : (
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(237,227,214,0.8) 0%, transparent 100%)' }} />
      )}
      <div className="absolute bottom-3 left-3.5">
        <div className="font-bengali text-[13px] font-light leading-[1.2] mb-0.5" style={{ color: cat.dark ? 'rgba(212,136,10,0.85)' : '#8C6A55' }}>
          {cat.bn}
        </div>
        <div className="font-display text-base font-normal" style={{ color: cat.dark ? '#F5EFE6' : '#1C0A06' }}>
          {cat.en}
        </div>
      </div>
    </Link>
  )
}

/* Mobile full-width hero tile */
function MobileHeroTile({ hero }: { hero: Cat }) {
  const c = hero
  return (
    <Link href="/sarees" className="relative w-full h-[219px] overflow-hidden block bg-cream">
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gold" />
      {c.image ? (
        <img src={c.image} alt={c.en} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: c.gradient }} />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.65) 0%, transparent 55%)' }} />
      <div className="absolute bottom-5 left-5">
        <div className="font-bengali text-[18px] font-light text-[rgba(212,136,10,0.85)] mb-1">{c.bn}</div>
        <div className="font-display text-2xl font-normal text-ivory mb-2">{c.en}</div>
        <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-0.5">
          Explore →
        </span>
      </div>
    </Link>
  )
}

/* Desktop jewellery tile */
function JewelleryCategoryTile({ cat }: { cat: Cat }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href="/jewellery"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="cursor-pointer relative overflow-hidden block bg-cream"
      style={{ aspectRatio: '1 / 1.4' }}
    >
      <div className="absolute top-0 left-0 h-[2.5px] bg-gold z-20 transition-all duration-300" style={{ width: hov ? '100%' : '0%' }} />
      {cat.image ? (
        <img src={cat.image} alt={cat.en} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500" style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
      ) : (
        <div className="absolute inset-0 transition-transform duration-500" style={{ background: cat.gradient, transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.6) 0%, transparent 55%)' }} />
      {hov && <div className="absolute inset-0 bg-[rgba(28,10,6,0.18)]" />}
      <div className="absolute bottom-5 left-5 z-30">
        <div className="font-bengali text-sm font-light text-[rgba(212,136,10,0.85)] mb-[3px]">{cat.bn}</div>
        <div className="font-display text-xl font-normal text-ivory">{cat.en}</div>
      </div>
    </Link>
  )
}

/* Mobile jewellery tile */
function MobileJewelleryTile({ cat }: { cat: Cat }) {
  return (
    <Link href="/jewellery" className="relative w-full h-[196px] overflow-hidden block bg-cream">
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gold" />
      {cat.image ? (
        <img src={cat.image} alt={cat.en} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: cat.gradient }} />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.6) 0%, transparent 55%)' }} />
      <div className="absolute bottom-4 left-4">
        <div className="font-bengali text-[13px] font-light text-[rgba(212,136,10,0.85)] mb-[3px]">{cat.bn}</div>
        <div className="font-display text-xl font-normal text-ivory">{cat.en}</div>
      </div>
    </Link>
  )
}

function SubHeader({ bn, en }: { bn: string; en: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-bengali text-[11px] font-normal text-gold">{bn}</span>
      <div className="w-4 h-px bg-[rgba(212,136,10,0.45)]" />
      <span className="font-sans text-[10px] font-normal tracking-[0.25em] uppercase text-muted">{en}</span>
    </div>
  )
}

export default function BrowseByCategory({ data }: { data?: BbcContent }) {
  const d = data && data.sarees?.hero?.en ? data : DEFAULT
  const { sarees, jewellery } = d
  return (
    <section className="bg-cream px-5 py-14 md:py-24 md:px-[clamp(32px,6vw,85px)]">
      {/* Header */}
      <Reveal className="mb-10">
        <div className="flex items-center gap-3 mb-3.5">
          <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-copper">
            BROWSE BY CATEGORY
          </span>
          <div className="w-7 h-px bg-copper" />
        </div>
        <h2 className="font-display font-light text-[28px] md:text-[clamp(30px,3vw,42px)] leading-[1.15] text-dark">
          Sarees &amp; <em className="italic text-copper">Jewellery</em>
        </h2>
        <div className="mt-4">
          <SubHeader bn="শাড়ি" en="SAREES" />
        </div>
      </Reveal>

      {/* Desktop asymmetric grid */}
      <Reveal as="div" delay={80}>
      <div className="hidden md:grid gap-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <HeroTile cat={sarees.hero} />
        <SmallTile cat={sarees.small[0]} />
        <SmallTile cat={sarees.small[1]} />
        <SmallTile cat={sarees.small[2]} showHover />
        <SmallTile cat={sarees.small[3]} />
        <div style={{ gridColumn: '1 / 2' }}>
          <SmallTile cat={sarees.small[4]} />
        </div>
        <div style={{ gridColumn: '2 / 4' }}>
          <SmallTile cat={sarees.small[5]} />
        </div>
      </div>
      </Reveal>

      {/* Mobile: hero + 2-col grid */}
      <Reveal as="div">
      <div className="md:hidden">
        <MobileHeroTile hero={sarees.hero} />
        <div className="grid grid-cols-2 gap-3 my-8">
          {sarees.small.map((t, i) => (
            <div key={i} style={{ aspectRatio: '1/1.4', overflow: 'hidden' }}>
              <MobileTile cat={t} />
            </div>
          ))}
        </div>
      </div>
      </Reveal>

      {/* One-of-one promise */}
      <Reveal>
      <div className="text-center mt-12">
        <div className="w-[60px] h-px bg-copper mx-auto mb-5" />
        <p className="font-display italic text-[14px] md:text-base text-muted tracking-[0.02em] leading-[1.6]">
          &quot;Each piece, woven once. <br className="md:hidden" />
          When it&apos;s gone, it&apos;s gone.&quot;
        </p>
      </div>
      </Reveal>

      {/* Jewellery sub-header */}
      <Reveal delay={60}>
      <div className="mt-12 mb-6">
        <SubHeader bn="গহনা" en="JEWELLERY" />
      </div>
      <div className="hidden md:grid grid-cols-3 gap-3">
        {jewellery.map((c) => (
          <JewelleryCategoryTile key={c.id} cat={c} />
        ))}
      </div>

      {/* Mobile jewellery tiles */}
      <div className="md:hidden flex flex-col gap-3 mb-8">
        {jewellery.map((c, i) => (
          <div key={i}>
            <MobileJewelleryTile cat={c} />
          </div>
        ))}
      </div>
      </Reveal>

      <div className="h-8" />
    </section>
  )
}
