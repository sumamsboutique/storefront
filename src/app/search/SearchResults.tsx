'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CATALOG } from '@/lib/catalog'
import { PAD, Eyebrow } from '@/components/shared/primitives'
import { IconSearch } from '@/components/icons'
import { cn } from '@/lib/cn'

export default function SearchResults() {
  const params = useSearchParams()
  const initial = params.get('q') ?? ''
  const [term, setTerm] = useState(initial)

  const results = useMemo(() => {
    const t = term.trim().toLowerCase()
    if (!t) return []
    return CATALOG.filter((p) =>
      (p.name + ' ' + p.weave + ' ' + p.sub + ' ' + (p.tag || '')).toLowerCase().includes(t),
    )
  }, [term])

  return (
    <div className="bg-ivory">
      <div className={cn(PAD, 'pt-[26px] pb-[18px]')}>
        <div className="pt-[26px]">
          <Eyebrow label="Search" hairline={false} />
          <h1 className="mt-2 font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
            Find your <em className="italic text-copper">piece</em>
          </h1>
        </div>
        <div className="mt-5 flex items-center gap-4 border-b border-[rgba(140,106,85,0.35)] pb-3">
          <IconSearch size={20} color="#BF5E18" />
          <input
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search sarees, weaves, jewellery…"
            className="flex-1 bg-transparent font-ui text-base text-dark outline-none placeholder:text-[rgba(140,106,85,0.5)]"
            aria-label="Search products"
          />
        </div>
        <div className="mt-6">
          {term.trim() === '' ? (
            <p className="font-ui text-sm font-light text-muted">
              Try “Benarasi”, “tant”, “temple”, “gold”.
            </p>
          ) : results.length === 0 ? (
            <p className="font-display text-xl text-dark">No matches for “{term}”.</p>
          ) : (
            <p className="font-ui text-xs tracking-[0.1em] text-muted uppercase">
              {results.length} result{results.length === 1 ? '' : 's'}
            </p>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4 md:pt-2">
          {results.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: p.gradient }}>
                {p.images?.[0] && (
                <Image fill src={p.images[0]} alt={p.name} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              )}
                <span className="absolute left-3 top-3 bg-copper px-2 py-0.5 font-ui text-[8px] tracking-[0.14em] text-ivory uppercase">
                  {p.type === 'jewel' ? 'JEWELLERY' : 'SAREE'}
                </span>
              </div>
              <div className="bg-cream p-3">
                <div className="font-display text-[15px] leading-tight text-dark">{p.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-ui text-sm text-copper">{p.price}</span>
                  <span className="font-ui text-[9px] tracking-[0.1em] text-muted uppercase">{p.weave}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}