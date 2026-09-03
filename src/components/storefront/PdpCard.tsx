'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

// PDP card — single column used in Style This With / More From strips.
// Mirrors the PDP prototype's SareeCard/JewelleryCard with hover zoom + QUICK VIEW.
export function PdpCard({
  tag,
  gradient,
  label,
  name,
  sub,
  price,
  badge,
  badgeColor,
  images,
}: {
  tag?: string
  gradient: string
  label: string
  name: string
  sub?: string
  price: string
  badge?: string | null
  badgeColor?: string
  images?: string[]
}) {
  const [hov, setHov] = useState(false)
  const img = images?.[0]
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group flex w-full flex-col"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        {img ? (
          <img
            src={img}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: hov ? 'scale(1.03)' : 'scale(1)' }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{ background: gradient, transform: hov ? 'scale(1.03)' : 'scale(1)' }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="max-w-[80%] border border-dashed border-[rgba(245,239,230,0.22)] px-3 py-1.5 text-center font-sans text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-[rgba(245,239,230,0.4)]">
                {label}
              </span>
            </div>
          </>
        )}
        {hov && <div className="absolute inset-0 bg-[rgba(28,10,6,0.22)]" />}
        {badge && (
          <span
            className="absolute left-3.5 top-3.5 z-10 px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-ivory"
            style={{ background: badgeColor || '#BF5E18' }}
          >
            {badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-[rgba(245,239,230,0.88)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1C0A06" strokeWidth="1.2">
            <path d="M7 12.5S1 8.5 1 4.8A3 3 0 017 2.9 3 3 0 0113 4.8C13 8.5 7 12.5 7 12.5z" />
          </svg>
        </button>
        {hov && (
          <span className="absolute bottom-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-[rgba(245,239,230,0.92)] px-5 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-dark">
            Quick View
          </span>
        )}
      </div>
      <div className={cn('flex flex-col bg-cream p-5 pb-[22px]', sub ? '' : '!pt-[18px]')}>
        {tag && <div className="mb-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-copper">{tag}</div>}
        <div className="mb-1.5 font-display text-[17px] leading-[1.3] text-dark">{name}</div>
        {sub && <div className="mb-3.5 font-sans text-[10px] uppercase tracking-[0.1em] text-muted">{sub}</div>}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-sans text-[15px] font-medium text-copper">{price}</span>
          <button className="h-8 border border-[rgba(191,94,24,0.38)] px-4 font-sans text-[10px] uppercase tracking-[0.18em] text-copper transition-colors hover:bg-copper hover:text-ivory">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  )
}