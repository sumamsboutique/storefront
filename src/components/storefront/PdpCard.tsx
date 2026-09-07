'use client'

import Image from 'next/image'
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
  const img = images?.[0]
  return (
    <div className="group flex w-full flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        {img ? (
          <Image
            fill
            src={img}
            alt={name}
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ background: gradient }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="max-w-[80%] border border-dashed border-[rgba(245,239,230,0.22)] px-3 py-1.5 text-center font-sans text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-[rgba(245,239,230,0.4)]">
                {label}
              </span>
            </div>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[rgba(28,10,6,0.22)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {badge && (
          <span
            className="absolute left-3.5 top-3.5 z-10 px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-ivory"
            style={{ background: badgeColor || '#BF5E18' }}
          >
            {badge}
          </span>
        )}
        <span className="pointer-events-none absolute bottom-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-[rgba(245,239,230,0.92)] px-5 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Quick View
        </span>
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