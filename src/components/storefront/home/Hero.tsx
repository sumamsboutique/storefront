'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlponaMotif } from '@/components/shared/primitives'

export type HeroPart = string | { italic: boolean; copper: boolean; text: string }

export interface HeroSlide {
  id: number
  gradient: string
  image?: string
  imageMobile?: string
  eyebrow: string
  bengali: string
  parts: HeroPart[]
  subtitle: string
  cta: string
  href: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    gradient: 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)',
    image: '/Banners/spring-edit.jpeg',
    imageMobile: '/Banners/spring-edit-mob.jpeg',
    eyebrow: 'FEATURED COLLECTION · বসন্ত ২০২৫',
    bengali: 'বসন্তের রঙে রাঙা',
    parts: ['The Spring Edit — Draped in ', { italic: true, copper: true, text: 'Heritage' }],
    subtitle: 'A curated story of bloom-season weaves and gold.',
    cta: 'SHOP THE COLLECTION',
    href: '/collections',
  },
  {
id: 2,
    gradient: 'linear-gradient(155deg, #1C0A06, #4A2010, #8C6A55)',
    image: '/Banners/banarasi-saree.png',
    imageMobile: '/Banners/banarasi-saree-mob.jpeg',
    eyebrow: 'BENARASI · বেনারসি',
    bengali: 'রাজকীয় বেনারসি',
    parts: ['Royal Crimson, ', { italic: true, copper: true, text: 'Handwoven' }, ' in Varanasi'],
    subtitle: 'Pure silk. Kadwa Jangla weave. Wedding-ready.',
    cta: 'SHOP BENARASI',
    href: '/sarees?weave=Benarasi',
  },
  {
    id: 3,
    gradient: 'linear-gradient(155deg, #2A1008, #5A2A14, #D4880A)',
    image: '/Banners/tant-saree.jpeg',
    imageMobile: '/Banners/tant-saree-mob.jpeg',
    eyebrow: 'TANT · তাঁত',
    bengali: 'বাংলার মাটির ছোঁয়া',
    parts: ['Everyday ', { italic: true, copper: true, text: 'Tant' }, ', Woven on Bengali Looms'],
    subtitle: 'Breathable cotton handlooms from Shantipur.',
    cta: 'SHOP TANT',
    href: '/sarees?weave=Tant',
  },
  {
    id: 4,
    gradient: 'linear-gradient(155deg, #3D1C0A, #6B2E0E, #C4611A)',
    image: '/Banners/temple-jewellery.jpeg',
    imageMobile: '/Banners/temple-jewellery-mob.jpeg',
    eyebrow: 'TEMPLE JEWELLERY · মন্দির গহনা',
    bengali: 'ঐতিহ্যের গহনা',
    parts: ['Heirloom ', { italic: true, copper: true, text: 'Temple' }, ' Pieces in Antique Gold'],
    subtitle: "Hand-cast designs inspired by Bengal's terracotta temples.",
    cta: 'SHOP JEWELLERY',
    href: '/jewellery',
  },
]

const SLIDE_DURATION = 5000

function renderParts(parts: HeroPart[]) {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <em key={i} className="italic text-copper font-medium not-italic">
        <span className="italic font-light">{p.text}</span>
      </em>
    )
  )
}

export default function Hero({ slides: slidesProp }: { slides?: HeroSlide[] }) {
  const slides = slidesProp && slidesProp.length ? slidesProp : HERO_SLIDES
  const [active, setActive] = useState(0)
  const [prog, setProg] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const slide = slides[active]

  const goTo = (i: number) => {
    setActive(i)
    setProg(0)
    startRef.current = null
  }

  useEffect(() => {
    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const p = Math.min((ts - startRef.current) / SLIDE_DURATION, 1)
      setProg(p)
      if (p >= 1) {
        setActive((a) => (a + 1) % slides.length)
        setProg(0)
        startRef.current = null
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, slides.length])

  return (
    <section className="relative w-full h-[720px] md:h-[88vh] md:min-h-[580px] md:max-h-[820px] overflow-hidden bg-dark">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? 'auto' : 'none' }}
        >
          <div className="absolute inset-0" style={{ background: s.gradient }} />
          {s.imageMobile && (
            <Image fill src={s.imageMobile} alt="" sizes="(max-width: 767px) 100vw, 0px" priority={i === 0} className="object-cover md:hidden" />
          )}
          {s.image && (
            <Image fill src={s.image} alt="" sizes="(max-width: 767px) 0px, 100vw" priority={i === 0} className="object-cover hidden md:block" />
          )}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundSize: '300px 300px',
            }}
          />
          {/* Desktop scrim */}
          <div
            className="absolute inset-0 hidden md:block pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, rgba(28,10,6,0.65) 0%, rgba(28,10,6,0.30) 45%, transparent 75%)',
            }}
          />
          {/* Mobile vertical scrim */}
          <div
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(28,10,6,0.25) 45%, rgba(28,10,6,0.72) 100%)',
            }}
          />
        </div>
      ))}

      {/* Alpona accent — mobile top-right, desktop bottom-right */}
      <div className="absolute md:bottom-14 top-6 md:top-auto right-6 z-20 pointer-events-none hidden md:block">
        <AlponaMotif size={80} opacity={0.22} />
      </div>
      <div className="absolute top-6 right-6 z-20 pointer-events-none md:hidden">
        <AlponaMotif size={40} opacity={0.22} />
      </div>

      {/* Content block */}
      <div className="absolute top-0 bottom-0 left-0 w-full z-10 flex items-end md:items-center px-5 md:px-0 pb-24 md:pb-0">
        <div className="w-full max-w-[540px] md:pl-[clamp(40px,7vw,100px)]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold shrink-0" />
            <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-gold">
              {slide.eyebrow}
            </span>
          </div>
          {/* Bengali */}
          <div className="font-bengali text-base md:text-[22px] font-light tracking-[0.04em] text-[rgba(212,136,10,0.85)] mb-2 leading-[1.3]">
            {slide.bengali}
          </div>
          {/* English headline */}
          <h1 className="font-display font-light text-[34px] md:text-[clamp(40px,4.2vw,60px)] leading-[1.08] text-ivory">
            {renderParts(slide.parts)}
          </h1>
          {/* Subtitle */}
          <p className="font-sans text-[13px] md:text-[15px] font-light tracking-[0.03em] text-[rgba(245,239,230,0.72)] mt-3 md:mt-[18px] leading-[1.5]">
            {slide.subtitle}
          </p>
          {/* CTA */}
          <Link
            key={slide.href}
            href={slide.href}
            className="mt-8 inline-flex items-center justify-center gap-2.5 bg-copper text-ivory border-0 rounded-none px-6 md:px-8 w-full md:w-auto h-12 md:h-auto md:py-[14px] font-sans text-[11px] font-medium tracking-[0.18em] uppercase cursor-pointer transition-all hover:bg-[#A0501A]"
          >
            {slide.cta}
            <span className="text-sm leading-none">→</span>
          </Link>
        </div>
      </div>

      {/* Slide controls — desktop (bottom center) */}
      <div className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2.5 z-30">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              className="w-[60px] h-[2px] bg-[rgba(245,239,230,0.22)] cursor-pointer relative overflow-hidden"
            >              {i === active && (
                <div className="absolute top-0 left-0 h-full bg-copper" style={{ width: `${prog * 100}%` }} />
              )}
              {i < active && <div className="absolute inset-0 bg-copper opacity-45" />}
            </div>
          ))}
        </div>
        <span className="font-display italic text-[12px] text-gold tracking-[0.06em]">
          0{active + 1} — 0{slides.length}
        </span>
      </div>

      {/* Mobile progress bars */}
      <div className="absolute bottom-[220px] left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
        {slides.map((_, i) => (
          <div key={i} className="w-9 h-[2px] bg-[rgba(245,239,230,0.25)] relative overflow-hidden">
            {i === active && (
              <div className="absolute inset-0 bg-[rgba(245,239,230,0.25)]" />
            )}
            {i === active && (
              <div className="absolute top-0 left-0 h-full bg-copper" style={{ width: `${prog * 100}%` }} />
            )}
            {i < active && <div className="absolute inset-0 bg-copper opacity-45" />}
          </div>
        ))}
      </div>

      {/* Prev / Next — desktop */}
      {(
        [
          ['←', (active - 1 + slides.length) % slides.length, 'left'],
          ['→', (active + 1) % slides.length, 'right'],
        ] as const
      ).map(([arrow, idx, side]) => (
        <button
          key={side}
          suppressHydrationWarning
          onClick={() => goTo(idx)}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-30 bg-[rgba(28,10,6,0.32)] border border-[rgba(212,136,10,0.28)] text-[rgba(245,239,230,0.7)] w-10 h-10 items-center justify-center cursor-pointer text-base font-display hover:bg-copper/50 hover:text-ivory transition-colors"
          style={side === 'left' ? { left: 20 } : { right: 20 }}
        >
          {arrow}
        </button>
      ))}
    </section>
  )
}
