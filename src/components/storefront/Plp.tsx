'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { CatalogProduct } from '@/lib/catalog'
import { WEAVES } from '@/lib/catalog'
import { PlpCard } from './PlpCard'
import { PAD, Eyebrow } from '@/components/shared/primitives'
import { IconSearch } from '@/components/icons'
import { cn } from '@/lib/cn'

const LIMIT = 12

function PriceCheck({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5">
      <span
        className={cn(
          'flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors',
          active ? 'border-copper bg-copper' : 'border-[rgba(140,106,85,0.4)] bg-transparent group-hover:border-copper'
        )}
      />
      <span className="font-ui text-xs font-light text-[rgba(28,10,6,0.8)]">{label}</span>
    </label>
  )
}

function FilterGroup({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[rgba(140,106,85,0.25)] py-5">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-left">
        <span className="font-ui text-[11px] font-medium tracking-[0.18em] text-dark uppercase">{title}</span>
        <span className="font-ui text-base text-muted leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="mt-4 flex flex-col gap-3">{children}</div>}
    </div>
  )
}

function PageHeader({ keyword, title, count }: { keyword: string; title: string; count: number }) {
  return (
    <div className="bg-ivory">
      <div className={cn(PAD, 'pt-[26px] pb-[18px]')}>
        <div className="flex items-center gap-2 font-ui text-[10px] tracking-[0.1em] uppercase">
          <span className="text-muted">Home</span>
          <span className="text-[rgba(140,106,85,0.5)]">/</span>
          <span className="text-copper border-b border-[rgba(191,94,24,0.4)] pb-px">{keyword}</span>
        </div>
        <h1 className="mt-3 font-display text-[clamp(30px,4vw,42px)] font-light leading-[1.1] text-dark">{title}</h1>
        <p className="mt-2 font-ui text-xs font-light text-[rgba(28,10,6,0.6)]">
          {count} pieces · every piece, hand-verified by Sumam
        </p>
        <div className="mt-5 h-px bg-[rgba(140,106,85,0.25)]" />
      </div>
    </div>
  )
}

const SORTS = ['Featured', 'Price: Low to High', 'Price: High to Low'] as const

export default function Plp({ products, keyword, title, types = ['saree'] }: { products: CatalogProduct[]; keyword: string; title: string; types?: CatalogProduct['type'][] }) {
  const params = useSearchParams()
  const q = params.get('q') ?? ''

  const [term, setTerm] = useState(q)
  const [weaves, setWeaves] = useState<string[]>(() => {
    const w = params.get('weave')
    return w ? w.split(',').filter(Boolean) : []
  })
  const [stock, setStock] = useState<'all' | 'in' | 'sold'>('all')
  const [price, setPrice] = useState<number | null>(null)
  const [sort, setSort] = useState<(typeof SORTS)[number]>('Featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [page, setPage] = useState(1)

  const toggleWeave = (w: string) =>
    setWeaves((ws) => (ws.includes(w) ? ws.filter((x) => x !== w) : [...ws, w]))

  const filtered = useMemo(() => {
    let list = products.filter((p) => types.includes(p.type))
    const t = term.trim().toLowerCase()
    if (t) list = list.filter((p) => (p.name + ' ' + p.weave + ' ' + (p.sub || '')).toLowerCase().includes(t))
    if (weaves.length) list = list.filter((p) => weaves.includes(p.weave))
    if (stock === 'in') list = list.filter((p) => !p.sold)
    if (stock === 'sold') list = list.filter((p) => p.sold)
    if (price !== null) {
      const [lo, hi] = price === 1 ? [0, 5000] : price === 2 ? [5000, 15000] : price === 3 ? [15000, 30000] : [30000, Infinity]
      list = list.filter((p) => p.priceNum >= lo && (hi === Infinity || p.priceNum < hi))
    }
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.priceNum - b.priceNum)
    if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.priceNum - a.priceNum)
    return list
  }, [products, types, term, weaves, stock, price, sort])

  const weaveOptions = useMemo(
    () => WEAVES.filter((w) => products.some((p) => types.includes(p.type) && p.weave === w)),
    [products, types],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / LIMIT))
  const safePage = Math.min(page, pageCount)
  const paged = filtered.slice((safePage - 1) * LIMIT, safePage * LIMIT)

  return (
    <div className="bg-ivory">
      <PageHeader keyword={keyword} title={title} count={filtered.length} />

      {/* Mobile filter/sort bar */}
      <div className="flex items-center gap-1 border-b border-[rgba(140,106,85,0.2)] pb-1 md:hidden">
        <button onClick={() => setShowMobileFilters((v) => !v)} className="flex items-center gap-2 px-3 py-2 font-ui text-[10px] tracking-[0.18em] text-dark uppercase">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1C0A06" strokeWidth="1.2" strokeLinecap="round">
            <path d="M2 3.5h10M4 7h6M6 10.5h2" />
          </svg>
          Filters
        </button>
        <span className="h-4 w-px bg-[rgba(140,106,85,0.25)]" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
          className="flex-1 bg-transparent px-3 py-2 font-ui text-[10px] tracking-[0.18em] text-dark uppercase outline-none"
          aria-label="Sort products"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="ml-auto pr-3 font-ui text-[10px] text-muted">{filtered.length} items</span>
      </div>

      {/* Mobile filter sheet */}
      {showMobileFilters && (
        <div className="border-b border-[rgba(140,106,85,0.2)] px-5 py-4 md:hidden">
          <FilterGroup title="Weave">
            {weaveOptions.map((w) => (
              <PriceCheck
                key={w}
                label={w}
                active={weaves.includes(w)}
                onToggle={() => toggleWeave(w)}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            {[['Under ₹5,000'], ['₹5,000 – ₹15,000'], ['₹15,000 – ₹30,000'], ['₹30,000+']].map(([l], i) => (
              <PriceCheck key={l} label={l} active={price === i + 1} onToggle={() => setPrice(price === i + 1 ? null : i + 1)} />
            ))}
          </FilterGroup>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className={cn(PAD, 'w-[268px] hidden shrink-0 md:block border-r border-[rgba(140,106,85,0.2)]')}>
          <div className="pt-5 pb-2">
            <Eyebrow label="Filters" hairline={false} />
          </div>
          <FilterGroup title="Weave">
            {weaveOptions.map((w) => (
              <PriceCheck key={w} label={w} active={weaves.includes(w)} onToggle={() => toggleWeave(w)} />
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            {[['Under ₹5,000', 1], ['₹5,000 – ₹15,000', 2], ['₹15,000 – ₹30,000', 3], ['₹30,000+', 4]].map(([l, v]) => (
              <PriceCheck key={l as string} label={l as string} active={price === v} onToggle={() => setPrice(price === v ? null : (v as number))} />
            ))}
          </FilterGroup>
          <FilterGroup title="Availability" defaultOpen={false}>
            <PriceCheck label="In stock only" active={stock === 'in'} onToggle={() => setStock(stock === 'in' ? 'all' : 'in')} />
            <PriceCheck label="Sold" active={stock === 'sold'} onToggle={() => setStock(stock === 'sold' ? 'all' : 'sold')} />
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div className={cn(PAD, 'flex-1')}>
          <div className="hidden items-center gap-3 pt-6 pb-5 md:flex">
            <IconSearch size={15} color="#BF5E18" />
            <span className="font-ui text-[11px] tracking-[0.18em] text-dark uppercase">Result for “{keyword}”</span>
            <span className="font-ui text-[11px] text-muted">· {filtered.length} pieces</span>
            <div className="ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
                className="bg-transparent font-ui text-[11px] tracking-[0.14em] text-dark uppercase outline-none"
                aria-label="Sort products"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-dark">No pieces match your filters</p>
              <p className="mt-2 font-ui text-xs font-light text-muted">Try clearing a filter or browse the full collection.</p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-4 gap-x-4 gap-y-10 md:grid">
                {paged.map((p) => (
                  <PlpCard key={p.id} product={p} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:hidden">
                {paged.map((p) => (
                  <PlpCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}

          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-1 pt-12 pb-4">
              <button onClick={() => setPage(Math.max(1, safePage - 1))} className="px-2 py-1.5 font-ui text-sm text-[rgba(140,106,85,0.6)]" aria-label="Previous page">‹</button>
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn('h-9 w-9 font-ui text-xs transition-colors', safePage === i + 1 ? 'bg-copper text-ivory' : 'text-muted hover:text-dark')}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(Math.min(pageCount, safePage + 1))} className="px-2 py-1.5 font-ui text-sm text-[rgba(140,106,85,0.6)]" aria-label="Next page">›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
