'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CatalogProduct } from '@/lib/catalog'
import { CATALOG, JEWELLERY } from '@/lib/catalog'
import { PdpCard } from './PdpCard'
import { AlponaDivider, PAD, SareeBorderDivider } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'
import { useCart, useWishlist } from '@/lib/store'
import { useMounted } from '@/lib/useMounted'

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

/* ── Per-section PDP copy, faithful to the prototype's Royal Crimson example ── */
function accordionCopy(p: CatalogProduct) {
  const isSaree = p.type === 'saree'
  const fabric =
    p.weave === 'Benarasi'
      ? isSaree
        ? ['Pure Mulberry Silk', 'Banarasi Kadwa Jangla weave', '24-carat gold zari work']
        : ['Antique-finish brass base', 'Hand-plated 24k gold', 'Traditional temple motifs']
      : p.weave === 'Tant'
        ? ['Fine cotton yarn', 'Traditional tant handloom weave', 'Lightweight, breathable drape']
        : p.weave === 'Muslin'
          ? ['Air-light mull cotton', 'Handspun muslin weave', 'Delicate, sheer body']
          : p.weave === 'Kantha'
            ? ['Hand-embroidered kantha stitch', 'Recycled cotton sari base', 'Threadwork built in layers']
            : p.weave === 'Jamdani'
              ? ['Fine cotton jamdani', 'Supplementary weft motifs', 'Hand-picked pattern rows']
              : p.weave === 'Garad'
                ? ['Pure tussar garad silk', 'Classic Bengali border', 'Soft matte finish']
                : p.weave === 'Silk'
                  ? ['Pure mulberry silk', 'Handwoven body', 'Subtle zari accents']
                  : p.weave === 'Temple'
                    ? ['Antique-finish brass base', 'Hand-plated gold', 'Traditional temple columns']
                    : p.weave === 'Contemporary'
                      ? ['Oxidised alloy', 'Modern geometric studs', 'Everyday-friendly finish']
                      : p.weave === 'Gold-Plated'
                        ? ['Brass core', '24k gold plating', 'Timeless heirloom styling']
                        : ['Handcrafted materials', 'Traditional technique', 'Finished by hand']
  const occasion =
    p.occasion === 'Bridal'
      ? ['Wedding', 'Reception', 'Puja', 'Festive']
      : p.occasion === 'Festive'
        ? ['Festive', 'Puja', 'Reception']
        : p.occasion === 'Everyday'
          ? ['Everyday', 'Casual', 'Office']
          : p.occasion === 'Puja'
            ? ['Puja', 'Festive', 'Ceremonial']
            : ['Wedding Guest', 'Reception', 'Festive']
  const dimensions = isSaree
    ? ['6.5 m saree length', '0.8 m blouse piece', '110 cm width']
    : ['Chain length 45 cm', 'Width 3 cm', 'Drop 8 cm']
  const care = isSaree
    ? ['Dry clean only', 'Store wrapped in muslin cloth', 'Avoid direct sunlight', 'Do not iron directly on zari']
    : ['Wipe with a soft cloth', 'Keep away from water and perfume', 'Store in the original pouch']
  const shipping = ['Free shipping above ₹10,000', 'Delivers within 5–7 business days', 'International shipping available', '7–day return window', 'One-of-one items: returns subject to inspection']
  return { fabric, occasion, dimensions, care, shipping }
}

// ── 1. Breadcrumb ──
function Breadcrumb({ p }: { p: CatalogProduct }) {
  return (
    <div className={cn(PAD, 'flex items-center gap-0 py-[20px] md:py-4')}>
      {[
        { label: p.type === 'jewel' ? 'Jewellery' : 'Sarees', href: p.type === 'jewel' ? '/jewellery' : '/sarees', link: true },
        { label: '/', sep: true },
        { label: p.weave, href: p.type === 'jewel' ? '/jewellery' : `/sarees?weave=${p.weave}`, link: true },
        { label: '/', sep: true },
        { label: p.name, current: true },
      ].map((item, i) =>
        item.sep ? (
          <span key={i} className="mx-1 font-sans text-[11px] uppercase tracking-[0.16em] text-[rgba(140,106,85,0.5)]">
            {item.label}
          </span>
        ) : item.link ? (
          <Link
            key={i}
            href={item.href!}
            className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted border-b border-[rgba(140,106,85,0.3)]"
          >
            {item.label}
          </Link>
        ) : (
          <span key={i} className="font-sans text-[11px] uppercase tracking-[0.16em] text-[rgba(28,10,6,0.7)]">
            {item.label}
          </span>
        )
      )}
    </div>
  )
}

// ── 2. Gallery — luxury editorial layout ──
function Gallery({ p }: { p: CatalogProduct }) {
  const [active, setActive] = useState(0)
  const hasImages = !!p.images?.length
  const shots = p.images ?? []

  if (!hasImages) {
    // Fallback: gradient placeholder, full width
    return (
      <div className="flex flex-col gap-3 lg:flex-[0_0_60%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden" style={{ background: p.gradient }}>
            <span className="border border-dashed border-[rgba(245,239,230,0.25)] px-3 py-1.5 text-center font-sans text-[9px] tracking-[0.18em] text-[rgba(245,239,230,0.5)] uppercase">
              {p.type === 'jewel' ? 'JEWELLERY PHOTOGRAPHY' : 'SAREE PHOTOGRAPHY'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const displayShots = shots.length < 4 ? Array.from({ length: 4 }, () => shots[0]) : shots

  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row lg:gap-6 lg:flex-[0_0_60%]">
      {/* Thumbnail strip — horizontal on mobile, vertical on desktop */}
      <div className="flex gap-3 lg:flex-col lg:w-[80px] lg:shrink-0 overflow-x-auto lg:overflow-x-visible">
        {displayShots.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              'relative aspect-[3/4] w-[64px] shrink-0 overflow-hidden bg-cream transition-all duration-200',
              'lg:w-full',
              active === i
                ? 'border border-copper opacity-100'
                : 'border border-transparent opacity-50 hover:opacity-80'
            )}
          >
            <Image fill src={src} alt="" sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Hero image */}
      <div className="relative flex-1 overflow-hidden bg-cream">
        <div className="group relative aspect-[3/4] w-full">
          <Image
            key={active}
            fill
            priority={active === 0}
            src={displayShots[active]}
            alt={p.name}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
        {/* Mobile slide indicator dots */}
        <div className="flex justify-center gap-1.5 py-2.5 lg:hidden">
          {displayShots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                active === i ? 'w-5 bg-copper' : 'w-1.5 bg-[rgba(140,106,85,0.3)]'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Accordion ──
function AccordionRow({ title, icon, defaultOpen = false, children }: { title: string; icon?: string; defaultOpen?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[rgba(140,106,85,0.2)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-full items-center justify-between text-left py-3 group cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-copper/60 group-hover:bg-copper transition-colors" />
          <span className="font-ui text-xs font-semibold tracking-[0.18em] text-dark uppercase">{title}</span>
        </div>
        <span
          className="flex h-6 w-6 items-center justify-center font-ui text-sm text-copper/80 border border-copper/30 transition-transform duration-300 group-hover:border-copper"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      {open && <div className="pb-6 pt-2 animate-fadeIn">{children}</div>}
    </div>
  )
}

function FeaturePills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream/80 border border-[rgba(140,106,85,0.25)] font-ui text-xs text-dark/90 tracking-wide"
        >
          <span className="h-1 w-1 rounded-full bg-copper" />
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2.5">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2.5 p-2 bg-cream/40 border-l-2 border-copper">
          <span className="font-ui text-xs font-light leading-[1.7] text-dark/85">{item}</span>
        </div>
      ))}
    </div>
  )
}

// ── 3. Info panel ──
function ProductInfo({ p }: { p: CatalogProduct }) {
  const mounted = useMounted()
  const { add } = useCart()
  const { has, toggle } = useWishlist()

  const wished = mounted ? has(p.id) : false
  const sub = p.type === 'jewel' ? p.tag : p.sub
  const copy = accordionCopy(p)
  const addItem = () => add({ id: p.id, productId: p.id, slug: p.slug, name: p.name, price: p.price, priceNum: p.priceNum, gradient: p.gradient, label: p.label, image: p.images?.[0] })

  return (
    <div className="flex flex-col gap-8 lg:flex-[0_0_40%]">
      {/* A — Identity */}
      <div>
        <div className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-copper">
          {p.type === 'jewel' ? p.tag : `${p.weave} · Bengali Heritage Weave`}
        </div>
        <h1 className="mb-2 font-display text-[28px] font-light leading-[1.15] tracking-[-0.01em] text-dark md:text-4xl">{p.name}</h1>
        <div className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
          {p.type === 'jewel' ? p.sub || p.name : `${p.weave} · Handwoven · Bengal`}
        </div>
      </div>

      {/* B — Price + stock */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-display text-2xl font-medium tracking-[-0.005em] text-copper md:text-3xl">{p.price}</span>
          {p.sold ? (
            <span className="bg-black text-white px-3 py-1 font-ui text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
              SOLD OUT
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <rect x="1" y="1" width="6" height="6" fill="#BF5E18" transform="rotate(45,4,4)" />
              </svg>
              <span className="font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                Only 1 Piece — One of One
              </span>
            </div>
          )}
        </div>
        <div className="font-ui text-[11px] font-light text-muted">Inclusive of all taxes · Hand-verified heirloom piece</div>
      </div>

      {/* C — Quick Highlights Spec Strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 p-3.5 bg-cream/70 border border-[rgba(140,106,85,0.25)]">
        <div>
          <div className="font-ui text-[9px] uppercase tracking-wider text-muted">Weave / Craft</div>
          <div className="font-ui text-xs font-semibold text-dark mt-0.5">{p.weave}</div>
        </div>
        <div>
          <div className="font-ui text-[9px] uppercase tracking-wider text-muted">Category</div>
          <div className="font-ui text-xs font-semibold text-dark mt-0.5">{p.type === 'saree' ? 'Handloom Saree' : 'Fine Jewellery'}</div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="font-ui text-[9px] uppercase tracking-wider text-muted">Craft Guarantee</div>
          <div className="font-ui text-xs font-semibold text-copper mt-0.5">Sumam Hand-Verified</div>
        </div>
      </div>

      {/* D — CTA cluster (WhatsApp removed per client MOM) */}
      <div>
        <div className="flex gap-3">
          <button
            onClick={addItem}
            disabled={p.sold}
            className={cn(
              'h-[52px] flex-1 font-ui text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-out',
              p.sold
                ? 'cursor-not-allowed bg-black text-white'
                : 'bg-dark text-ivory hover:bg-copper hover:tracking-[0.22em]'
            )}
          >
            {p.sold ? 'Sold Out' : 'Add to Bag'}
          </button>
          <button
            onClick={() => toggle(p.id)}
            aria-label="Add to wishlist"
            className={cn(
              'h-[52px] w-[52px] shrink-0 flex items-center justify-center border bg-transparent transition-colors duration-200',
              wished ? 'border-copper' : 'border-[rgba(140,106,85,0.4)] hover:border-copper'
            )}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill={wished ? '#BF5E18' : 'none'} stroke={wished ? '#BF5E18' : '#1C0A06'} strokeWidth="1.5">
              <path d="M10 17.5S2.5 12.5 2.5 7A4 4 0 0110 3.85 4 4 0 0117.5 7c0 5.5-7.5 10.5-7.5 10.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* E — Description */}
      <div>
        <div className="mb-3 font-display text-lg text-dark">
          About This {p.type === 'jewel' ? 'Piece' : 'Saree'}
        </div>
        <div className="mb-3 h-px w-6 bg-copper" />
        <p className="font-ui text-[13px] font-light leading-[1.8] text-[rgba(28,10,6,0.85)]">
          {p.type === 'jewel'
            ? `${p.name} is crafted from hand-finished materials, each piece personally checked by Sumam before it reaches you. A one-of-one piece drawn from Bengal's temple and heirloom traditions.`
            : `A ${p.weave} handwoven in the traditional technique, where each motif is woven separately into the fabric — never stitched on. The ${p.occasion.toLowerCase()} palette is hand-dyed, with intricate zari work across the pallu and border. Sourced directly from a fourth-generation weaving family in Bengal.`}
        </p>
      </div>

      {/* F — Enhanced Accordions */}
      <div className="space-y-1">
        <AccordionRow title="Fabric & Weave" defaultOpen>
          <BulletList items={copy.fabric} />
        </AccordionRow>
        <AccordionRow title="Occasion & Pairing">
          <FeaturePills items={copy.occasion} />
        </AccordionRow>
        <AccordionRow title="Dimensions & Specifications">
          <BulletList items={copy.dimensions} />
        </AccordionRow>
        <AccordionRow title="Wash & Care Preservation">
          <BulletList items={copy.care} />
        </AccordionRow>
        <AccordionRow title="Complimentary Shipping & Returns">
          <BulletList items={copy.shipping} />
        </AccordionRow>
      </div>
    </div>
  )
}

// ── 3. ProductHero (two-column) ──
function ProductHero({ p }: { p: CatalogProduct }) {
  return (
    <section className={cn(PAD, 'flex flex-col gap-10 pb-24 pt-8 lg:flex-row lg:gap-[60px] lg:pb-24')}>
      <Gallery p={p} />
      <ProductInfo p={p} />
    </section>
  )
}

// ── 4. Trust strip ──
function TrustIcon({ n }: { n: number }) {
  const s = { stroke: '#D4880A', strokeWidth: 1, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" {...s}>
      {n === 0 && (
        <>
          <polygon points="14,3 17,9 24,10 19,15 20.5,22 14,18.5 7.5,22 9,15 4,10 11,9" />
          <polyline points="10,14 13,17 18,11" />
        </>
      )}
      {n === 1 && (
        <>
          <rect x="3" y="8" width="17" height="12" rx="1" />
          <polyline points="20,12 25,12 25,20 20,20" />
          <circle cx="8" cy="21" r="2" />
          <circle cx="18" cy="21" r="2" />
          <line x1="3" y1="12" x2="8" y2="12" />
          <line x1="22" y1="11" x2="25" y2="14" />
        </>
      )}
      {n === 2 && (
        <>
          <path d="M5 14A9 9 0 1 0 7 8.5" />
          <polyline points="3,6 7,9 10,6" />
        </>
      )}
      {n === 3 && (
        <>
          <path d="M5 6h18a1 1 0 011 1v11a1 1 0 01-1 1H9l-5 4V7a1 1 0 011-1z" />
          <line x1="10" y1="11" x2="18" y2="11" />
          <line x1="10" y1="15" x2="15" y2="15" />
        </>
      )}
    </svg>
  )
}

const TRUST_ITEMS = [
  { n: 0, title: 'Authenticity Certified', sub: 'Each piece, hand-verified by Sumam' },
  { n: 1, title: 'Free Shipping', sub: 'On orders above ₹10,000' },
  { n: 2, title: '7-Day Returns', sub: 'Easy returns, subject to inspection' },
  { n: 3, title: 'Atelier Concierge', sub: 'Personal guidance from our boutique' },
] as const

function TrustStrip() {
  return (
    <section className={cn(PAD, 'border-y border-[rgba(212,136,10,0.3)] bg-cream py-10')}>
      <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:justify-between sm:items-start">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex flex-1 flex-col items-center p-0 text-center sm:px-3">
            <div className="mb-3"><TrustIcon n={item.n} /></div>
            <div className="mb-1 font-sans text-xs font-medium uppercase tracking-[0.16em] text-dark">{item.title}</div>
            <div className="font-sans text-[11px] font-light leading-[1.5] text-muted">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Section heading ──
function StripHeading({ eyebrow, em, rest, sub }: { eyebrow: string; em: string; rest: string; sub?: string }) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-7 bg-copper" />
        <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-copper">{eyebrow}</span>
      </div>
      <h2 className="font-display text-[34px] font-light leading-[1.15] text-dark md:text-[38px]">
        <em className="text-copper italic">{em}</em> {rest}
      </h2>
      {sub && <p className="mt-3 max-w-[480px] font-sans text-sm font-light leading-[1.7] text-muted">{sub}</p>}
    </div>
  )
}

// ── 5. Style This With (grid) ──
function StyleThisWith({ p }: { p: CatalogProduct }) {
  const styled = JEWELLERY.slice(0, 3)
  return (
    <section className={cn(PAD, 'py-12 lg:py-24')}>
      <StripHeading eyebrow="Hand-Curated Pairings" em="Style" rest="This With" sub={`Jewellery pieces personally chosen by Sumam to complement this ${p.type}.`} />
      <AlponaDivider />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {styled.map((j) => (
          <Link key={j.id} href={`/products/${j.slug}`}>
            <PdpCard tag={j.tag} gradient={j.gradient} label={j.label} name={j.name} price={j.price} images={j.images} sold={j.sold} />
          </Link>
        ))}
      </div>
    </section>
  )
}

// ── 6. More From ──
function MoreFrom({ p }: { p: CatalogProduct }) {
  const sameType = p.type === 'jewel' ? JEWELLERY : CATALOG.filter((x) => x.type === 'saree')
  const others = sameType.filter((x) => x.id !== p.id)
  const byWeave = others.filter((x) => x.weave === p.weave)
  const pool = byWeave.length >= 4 ? byWeave : others
  const items = pool.slice(0, 4)
  return (
    <section className={cn(PAD, 'border-t border-[rgba(212,136,10,0.12)] bg-cream py-12 lg:py-24')}>
      <div className="mb-12 flex items-end justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-7 bg-copper" />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-copper">
              {p.type === 'jewel' ? 'Related Jewellery' : 'Related Sarees'}
            </span>
          </div>
          <h2 className="font-display text-[34px] font-light leading-[1.15] text-dark md:text-[38px]">
            More from <em className="text-copper italic">{p.weave}</em>
          </h2>
        </div>
        <Link href={p.type === 'jewel' ? '/jewellery' : `/sarees?weave=${p.weave}`} className="mb-1.5 whitespace-nowrap border-b border-copper pb-0.5 font-sans text-[10px] uppercase tracking-[0.2em] text-copper">
          View All {p.type === 'jewel' ? 'Jewellery' : `${p.weave} Sarees`} →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {items.map((r) => (
          <Link key={r.id} href={`/products/${r.slug}`}>
            <PdpCard badge={r.badge} badgeColor={r.badge === 'New Arrival' || r.badge === 'Featured' ? '#BF5E18' : '#D4880A'} gradient={r.gradient} label={r.label} name={r.name} sub={r.sub} price={r.price} images={r.images} sold={r.sold} />
          </Link>
        ))}
      </div>
    </section>
  )
}

// ── Sticky mobile bottom bar ──
function StickyBar({ p }: { p: CatalogProduct }) {
  const { add } = useCart()
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center gap-3 border-t border-[rgba(212,136,10,0.12)] bg-dark px-[clamp(20px,6vw,85px)] py-2 md:hidden">
      <div className="min-w-0 flex-1">
        <div className="font-sans text-[9px] uppercase tracking-[0.18em] text-[rgba(212,136,10,0.6)]">{p.price}</div>
        <div className="truncate font-display text-sm text-ivory">{p.name}</div>
      </div>
      <button
        onClick={() => add({ id: p.id, productId: p.id, slug: p.slug, name: p.name, price: p.price, priceNum: p.priceNum, gradient: p.gradient, label: p.label, image: p.images?.[0] })}
        disabled={p.sold}
        className={cn(
          'h-12 shrink-0 px-6 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors',
          p.sold ? 'bg-black text-white cursor-not-allowed border border-white/20' : 'bg-copper text-ivory hover:bg-[#A04A18]'
        )}
      >
        {p.sold ? 'Sold Out' : 'Add to Bag'}
      </button>
    </div>
  )
}

export default function Pdp({ product }: { product: CatalogProduct }) {
  return (
    <div className="bg-ivory">
      <Breadcrumb p={product} />
      <ProductHero p={product} />
      <SareeBorderDivider />
      <TrustStrip />
      <StyleThisWith p={product} />
      <SareeBorderDivider />
      <MoreFrom p={product} />
      <StickyBar p={product} />
    </div>
  )
}