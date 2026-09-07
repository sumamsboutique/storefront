'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useCart, useWishlist } from '@/lib/store'

export interface ProductCardData {
  id?: number | string
  badge?: string | null
  badgeColor?: string
  gradient: string
  name: string
  sub: string
  price: string
  priceNum: number
  label: string
  aspect?: number
  slug?: string
  catalogId?: string
  images?: string[]
}

export function ProductCard({
  product,
  imgHeight,
  className,
}: {
  product: ProductCardData
  imgHeight?: number
  className?: string
}) {
  const add = useCart((s) => s.add)
  const wishlist = useWishlist((s) => s)
  const wished = product.catalogId ? wishlist.has(product.catalogId) : false
  const [qvOpen, setQvOpen] = useState(false)

  const addItem = () => {
    if (product.catalogId) {
      add({
        id: String(product.catalogId),
        productId: String(product.catalogId),
        slug: product.slug ?? '',
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        gradient: product.gradient,
        label: product.label,
        image: product.images?.[0],
      })
    }
  }

  const inner = (
    <>
      {/* Image */}
      <div
        className="relative shrink-0 overflow-hidden w-full bg-cream"
        style={{ height: imgHeight ? imgHeight : undefined, aspectRatio: imgHeight ? undefined : product.aspect ?? '3/4' }}
      >
        {product.images?.[0] ? (
          <Image
            fill
            src={product.images[0]}
            alt={product.name}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ background: product.gradient }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border border-dashed border-[rgba(245,239,230,0.18)] px-3 py-[7px] text-center max-w-[80%]">
                <div className="font-sans text-[9px] tracking-[0.12em] uppercase text-[rgba(245,239,230,0.3)] leading-[1.5]">
                  Saree photography —<br />
                  {product.label}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-[14px] left-[14px] font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-ivory px-2.5 py-1"
            style={{ background: product.badgeColor ?? '#BF5E18' }}
          >
            {product.badge}
          </div>
        )}
        {/* Wishlist */}
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.preventDefault()
            if (product.catalogId) wishlist.toggle(product.catalogId)
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer transition-opacity duration-200 border border-[rgba(245,239,230,0.18)] bg-[rgba(245,239,230,0.88)] md:bg-[rgba(28,10,6,0.32)]"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wished} color="#BF5E18" outline="#1C0A06" />
        </button>
        {/* Quick view — desktop hover reveal */}
        <button
          suppressHydrationWarning
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setQvOpen(true)
          }}
          className="hidden md:flex absolute bottom-[14px] left-1/2 -translate-x-1/2 translate-y-2 items-center gap-1.5 border-0 bg-[rgba(245,239,230,0.92)] px-6 py-2 whitespace-nowrap font-sans text-[10px] font-medium tracking-[0.16em] text-dark uppercase opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ivory"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BF5E18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Quick View
        </button>
      </div>

      {/* Info */}
      <div className="px-5 py-[18px] pb-[22px] bg-cream flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-[17px] font-normal text-dark mb-1 leading-[1.3]">
            {product.name}
          </h3>
          <p className="font-sans text-[10px] font-normal tracking-[0.1em] uppercase text-muted leading-[1.5]">
            {product.sub}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3.5">
          <span className="font-sans text-[15px] font-medium text-copper">{product.price}</span>
          <button
            suppressHydrationWarning
            disabled={!product.catalogId}
            onClick={(e) => {
              e.preventDefault()
              addItem()
            }}
            className="bg-none border border-[rgba(191,94,24,0.38)] text-copper font-sans text-[9px] tracking-[0.16em] uppercase px-3 py-1.5 cursor-pointer transition-colors duration-200 hover:bg-copper hover:text-ivory disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Add ${product.name} to bag`}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className={cn('group bg-cream flex flex-col overflow-hidden cursor-pointer h-full', className)} style={imgHeight ? { height: '100%' } : undefined}>
        {product.slug ? (
          <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col h-full">
            {inner}
          </Link>
        ) : (
          inner
        )}
      </div>
      {qvOpen && <QuickViewModal product={product} onClose={() => setQvOpen(false)} />}
    </>
  )
}

function QuickViewModal({ product, onClose }: { product: ProductCardData; onClose: () => void }) {
  const add = useCart((s) => s.add)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const addItem = () => {
    if (product.catalogId) {
      add({
        id: String(product.catalogId),
        productId: String(product.catalogId),
        slug: product.slug ?? '',
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        gradient: product.gradient,
        label: product.label,
        image: product.images?.[0],
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-[rgba(28,10,6,0.6)]" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        className="relative flex max-h-[90vh] w-full max-w-[680px] flex-col overflow-y-auto bg-ivory shadow-2xl md:flex-row"
      >
        <button
          suppressHydrationWarning
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 font-ui text-2xl leading-none text-muted transition-colors hover:text-copper"
        >
          ×
        </button>
        <div className="relative aspect-[3/4] bg-cream md:aspect-auto md:w-[46%] md:shrink-0">
          {product.images?.[0] ? (
            <Image fill src={product.images[0]} alt={product.name} sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: product.gradient }} />
          )}
        </div>
        <div className="flex flex-1 flex-col p-8 pb-7 md:p-10 md:pb-9">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-copper" />
            <span className="font-ui text-[10px] uppercase tracking-[0.24em] text-copper">Quick View</span>
          </div>
          <h3 className="mt-3 font-display text-2xl leading-[1.15] text-dark">{product.name}</h3>
          <p className="mt-1.5 font-ui text-[10px] uppercase tracking-[0.1em] text-muted">{product.sub}</p>
          <div className="mt-4 font-display text-xl font-medium text-copper">{product.price}</div>
          <p className="mt-5 h-px w-6 bg-copper" />
          <p className="mt-5 font-ui text-xs font-light leading-[1.7] text-[rgba(28,10,6,0.75)]">{product.label}</p>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <button
              suppressHydrationWarning
              onClick={addItem}
              disabled={!product.catalogId}
              className="w-full bg-dark py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-copper disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Bag
            </button>
            {product.slug && (
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="w-full border border-[rgba(191,94,24,0.45)] py-3.5 text-center font-ui text-[11px] font-medium tracking-[0.18em] text-copper uppercase transition-colors hover:border-copper"
              >
                View Full Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}