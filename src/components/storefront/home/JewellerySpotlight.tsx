'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlponaDivider } from '@/components/shared/primitives'
import { HeartIcon } from '@/components/icons'
import { Reveal } from '@/lib/reveal'
import { useCart, useWishlist } from '@/lib/store'
import type { JewelSpotContent, HeroPart } from '@/lib/data'

interface Jewellery {
  id: number
  tag: string
  gradient: string
  label: string
  name: string
  price: string
  priceNum: number
  slug: string
  catalogId: string
  images?: string[]
}

const JEWEL: Jewellery[] = [
  {
    id: 1,
    tag: 'TEMPLE COLLECTION',
    gradient: 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)',
    label: 'Lakshmi temple necklace, antique gold finish',
    name: 'Lakshmi Temple Necklace',
    price: '₹3,200',
    priceNum: 3200,
    slug: 'lakshmi-temple-necklace',
    catalogId: 'j1',
    images: ['/Products/jewellery/lakshmi-temple-necklace.png'],
  },
  {
    id: 2,
    tag: 'CONTEMPORARY',
    gradient: 'linear-gradient(165deg, #5A2A14, #8B5E10 40%, #D4880A 70%, #4A3810)',
    label: 'Drop temple earrings, hammered copper tone',
    name: 'Drop Temple Earrings',
    price: '₹2,400',
    priceNum: 2400,
    slug: 'drop-temple-earrings',
    catalogId: 'j3',
    images: ['/Products/jewellery/drop-temple-earrings.png'],
  },
  {
    id: 3,
    tag: 'GOLD-PLATED',
    gradient: 'linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)',
    label: 'Gold-plated maangtikka · forehead ornament',
    name: 'Heirloom Maangtikka',
    price: '₹1,950',
    priceNum: 1950,
    slug: 'heirloom-maangtikka',
    catalogId: 'j2',
    images: ['/Products/jewellery/heirloom-maangtikka.png'],
  },
]

function JewelleryCard({ product }: { product: Jewellery }) {
  const [hov, setHov] = useState(false)
  const add = useCart((s) => s.add)
  const wishlist = useWishlist((s) => s)
  const wished = wishlist.has(product.catalogId)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex flex-col cursor-pointer"
    >
      {/* Image — 3:4 */}
      <Link href={`/products/${product.slug}`} className="relative w-full aspect-[3/4] overflow-hidden block bg-cream">
        {product.images?.[0] ? (
          <Image
            fill
            src={product.images[0]}
            alt={product.name}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{ background: product.gradient, transform: hov ? 'scale(1.04)' : 'scale(1)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border border-dashed border-[rgba(245,239,230,0.15)] px-3 py-[7px] max-w-[75%]">
                <div className="font-sans text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,230,0.28)] text-center leading-[1.5]">
                  {product.label}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Wishlist */}
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.preventDefault()
            wishlist.toggle(product.catalogId)
          }}
          className="absolute top-3 right-3 w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-[rgba(245,239,230,0.85)] md:bg-[rgba(28,10,6,0.32)] border border-[rgba(245,239,230,0.18)] transition-opacity duration-200"
          style={{ opacity: hov ? 1 : undefined }}
          aria-label={`Add ${product.name} to wishlist`}
        >
          <HeartIcon filled={wished} outline="#1C0A06" />
        </button>
        {/* Quick view — desktop */}
        <div
          className="hidden md:block absolute bottom-[14px] left-1/2 bg-[rgba(245,239,230,0.92)] text-dark font-sans text-[10px] font-medium tracking-[0.16em] uppercase px-5 py-2 whitespace-nowrap cursor-pointer border-0 transition-all duration-200"
          style={{ transform: `translateX(-50%) translateY(${hov ? 0 : 8}px)`, opacity: hov ? 1 : 0 }}
        >
          QUICK VIEW
        </div>
      </Link>

      {/* Info panel */}
      <div className="bg-cream px-5 py-[18px] pb-[22px] flex-1 flex flex-col justify-between">
        <div>
          <div className="font-sans text-[10px] font-normal tracking-[0.2em] uppercase text-copper mb-2.5">
            {product.tag}
          </div>
          <h3 className="font-display text-[16px] md:text-[17px] font-normal text-dark mb-3.5 leading-[1.3]">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[15px] font-medium text-copper">{product.price}</span>
          <button
            suppressHydrationWarning
            onClick={() =>
              add({
                id: product.catalogId,
                productId: product.catalogId,
                slug: product.slug,
                name: product.name,
                price: product.price,
                priceNum: product.priceNum,
                gradient: product.gradient,
                label: product.label,
                image: product.images?.[0],
              })
            }
            className="bg-none border border-[rgba(191,94,24,0.38)] text-copper font-sans text-[9px] tracking-[0.16em] uppercase px-3 py-1.5 cursor-pointer transition-colors hover:bg-copper hover:text-ivory"
            aria-label={`Add ${product.name} to bag`}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  )
}

function renderParts(parts: HeroPart[]) {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <em key={i} className="italic text-gold font-medium not-italic">
        <span className="italic font-light">{p.text}</span>
      </em>
    )
  )
}

export default function JewellerySpotlight({ data }: { data?: JewelSpotContent }) {
  const items = data && data.items && data.items.length ? data.items : JEWEL
  const eyebrow = data?.eyebrow ?? 'JEWELLERY · গহনা'
  const headlineParts = data?.headlineParts
  const sub = data?.sub ?? 'Heirloom pieces, hand-cast and never repeated'
  return (
    <section className="bg-dark relative overflow-hidden pt-14 md:pt-16 px-5 md:px-[clamp(32px,6vw,85px)] pb-[72px] md:pb-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10">
        <AlponaDivider className="mb-8 md:mb-16" />

        {/* Header */}
        <Reveal>
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-gold">
                {eyebrow}
              </span>
              <div className="w-7 h-px bg-gold" />
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[clamp(28px,2.8vw,38px)] leading-[1.15] text-ivory mb-3">
              {headlineParts ? renderParts(headlineParts) : <>The <em className="italic text-gold">Golden</em> Touch</>}
            </h2>
            <p className="font-sans text-[13px] md:text-[14px] font-light text-[rgba(245,239,230,0.65)] leading-[1.6]">
              {sub}
            </p>
          </div>
          <Link
            href="/jewellery"
            className="hidden md:inline-block font-sans text-[10px] font-normal tracking-[0.2em] uppercase text-gold no-underline border-b border-gold pb-0.5 mb-1.5 whitespace-nowrap hover:text-ivory transition-colors"
          >
            View All Jewellery →
          </Link>
        </div>
        </Reveal>

        {/* Mobile View All */}
        <Link
          href="/jewellery"
          className="md:hidden inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-gold no-underline border-b border-gold pb-0.5 mb-8 hover:text-ivory transition-colors"
        >
          View All Jewellery →
        </Link>

        {/* Cards */}
        <Reveal delay={80}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {items.map((p) => (
            <JewelleryCard key={p.id} product={p} />
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}
