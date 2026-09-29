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
    <label
      onClick={onToggle}
      className="group flex cursor-pointer items-center gap-2.5"
    >
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

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
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

      {/* Mobile Search & Filter Toolbar */}
      <div className="border-b border-[rgba(140,106,85,0.2)] px-4 py-3 md:hidden space-y-2.5">
        {/* Mobile Search Bar */}
        <div className="relative flex items-center">
          <span className="absolute left-3 text-copper pointer-events-none">
            <IconSearch size={14} color="#BF5E18" />
          </span>
          <input
            type="text"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search weaves, sarees, motifs..."
            className="w-full bg-cream/70 border border-[rgba(140,106,85,0.3)] pl-9 pr-8 py-2 font-ui text-xs text-dark placeholder:text-[rgba(28,10,6,0.45)] focus:outline-none focus:border-copper"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              aria-label="Clear search"
              className="absolute right-2.5 text-muted hover:text-dark text-sm px-1 leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Mobile Filter & Sort row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilters((v) => !v)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 border font-ui text-[10px] tracking-[0.16em] uppercase transition-colors',
              showMobileFilters || weaves.length > 0 || stock !== 'all' || price !== null
                ? 'border-copper bg-copper text-ivory'
                : 'border-[rgba(140,106,85,0.3)] bg-cream text-dark'
            )}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2 3.5h10M4 7h6M6 10.5h2" />
            </svg>
            Filters {weaves.length + (stock !== 'all' ? 1 : 0) + (price !== null ? 1 : 0) > 0 && `(${weaves.length + (stock !== 'all' ? 1 : 0) + (price !== null ? 1 : 0)})`}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
            className="flex-1 bg-cream/70 border border-[rgba(140,106,85,0.3)] px-2.5 py-1.5 font-ui text-[10px] tracking-[0.14em] text-dark uppercase outline-none"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="font-ui text-[10px] text-muted whitespace-nowrap">{filtered.length} items</span>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {showMobileFilters && (
        <div className="border-b border-[rgba(140,106,85,0.25)] bg-[#FAF6F0] px-5 py-4 md:hidden animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(140,106,85,0.2)]">
            <span className="font-ui text-xs font-semibold tracking-wider text-dark uppercase">Filter Collection</span>
            {(weaves.length > 0 || stock !== 'all' || price !== null) && (
              <button
                onClick={() => {
                  setWeaves([])
                  setStock('all')
                  setPrice(null)
                }}
                className="font-ui text-[10px] text-copper uppercase tracking-wider underline"
              >
                Clear All
              </button>
            )}
          </div>
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
          <FilterGroup title="Availability">
            <PriceCheck label="All pieces" active={stock === 'all'} onToggle={() => setStock('all')} />
            <PriceCheck label="In stock only" active={stock === 'in'} onToggle={() => setStock(stock === 'in' ? 'all' : 'in')} />
            <PriceCheck label="Sold out" active={stock === 'sold'} onToggle={() => setStock(stock === 'sold' ? 'all' : 'sold')} />
          </FilterGroup>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className={cn(PAD, 'w-[268px] hidden shrink-0 md:block border-r border-[rgba(140,106,85,0.2)]')}>
          <div className="pt-5 pb-2 flex items-center justify-between">
            <Eyebrow label="Filters" hairline={false} />
            {(weaves.length > 0 || stock !== 'all' || price !== null || term) && (
              <button
                onClick={() => {
                  setWeaves([])
                  setStock('all')
                  setPrice(null)
                  setTerm('')
                }}
                className="font-ui text-[10px] uppercase tracking-wider text-copper hover:underline"
              >
                Reset
              </button>
            )}
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
          <FilterGroup title="Availability">
            <PriceCheck label="All pieces" active={stock === 'all'} onToggle={() => setStock('all')} />
            <PriceCheck label="In stock only" active={stock === 'in'} onToggle={() => setStock(stock === 'in' ? 'all' : 'in')} />
            <PriceCheck label="Sold out" active={stock === 'sold'} onToggle={() => setStock(stock === 'sold' ? 'all' : 'sold')} />
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div className={cn(PAD, 'flex-1 pb-16')}>
          {/* Desktop Search & Sort Toolbar */}
          <div className="hidden items-center justify-between gap-4 pt-6 pb-5 border-b border-[rgba(140,106,85,0.2)] md:flex">
            {/* Desktop Search Input */}
            <div className="relative flex items-center max-w-sm flex-1">
              <span className="absolute left-3 text-copper pointer-events-none">
                <IconSearch size={14} color="#BF5E18" />
              </span>
              <input
                type="text"
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value)
                  setPage(1)
                }}
                placeholder="Search by name, weave, or motif..."
                className="w-full bg-cream/70 border border-[rgba(140,106,85,0.3)] pl-9 pr-8 py-2 font-ui text-xs text-dark placeholder:text-[rgba(28,10,6,0.45)] focus:outline-none focus:border-copper"
              />
              {term && (
                <button
                  onClick={() => setTerm('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 text-muted hover:text-dark text-sm px-1 leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Status Feedback & Sort */}
            <div className="flex items-center gap-4">
              <span className="font-ui text-[11px] text-muted whitespace-nowrap">
                {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-ui text-[10px] uppercase tracking-wider text-muted">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
                  className="bg-transparent font-ui text-[11px] tracking-[0.14em] text-dark uppercase outline-none cursor-pointer border-b border-copper/40 pb-0.5"
                  aria-label="Sort products"
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-dark">No pieces match your search</p>
              <p className="mt-2 font-ui text-xs font-light text-muted">
                {term ? `No products found for "${term}".` : 'Try clearing a filter or browse the full collection.'}
              </p>
              {(term || weaves.length > 0 || stock !== 'all' || price !== null) && (
                <button
                  onClick={() => {
                    setTerm('')
                    setWeaves([])
                    setStock('all')
                    setPrice(null)
                  }}
                  className="mt-4 inline-block px-4 py-2 bg-copper text-ivory font-ui text-[10px] uppercase tracking-[0.18em]"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {paged.map((p) => (
                <PlpCard key={p.id} product={p} />
              ))}
            </div>
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
