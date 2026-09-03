'use client'

import { useState } from 'react'
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
  priceNum?: number
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
  const [hov, setHov] = useState(false)
  const add = useCart((s) => s.add)
  const wishlist = useWishlist((s) => s)
  const wished = product.catalogId ? wishlist.has(product.catalogId) : false

  const inner = (
    <>
      {/* Image */}
      <div
        className="relative shrink-0 overflow-hidden w-full bg-cream"
        style={{ height: imgHeight ? imgHeight : undefined, aspectRatio: imgHeight ? undefined : product.aspect ?? '3/4' }}
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{ background: product.gradient, transform: hov ? 'scale(1.04)' : 'scale(1)' }}
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
          onClick={(e) => {
            e.preventDefault()
            if (product.catalogId) wishlist.toggle(product.catalogId)
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center cursor-pointer transition-opacity duration-200 border border-[rgba(245,239,230,0.18)] bg-[rgba(245,239,230,0.88)] md:bg-[rgba(28,10,6,0.32)]"
          style={{ opacity: hov ? 1 : undefined }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon filled={wished} color="#BF5E18" outline="#1C0A06" />
        </button>
        {/* Quick view — desktop only */}
        <div
          className="hidden md:block absolute bottom-[14px] left-1/2 bg-[rgba(245,239,230,0.92)] text-dark font-sans text-[10px] font-medium tracking-[0.16em] uppercase px-5 py-2 whitespace-nowrap cursor-pointer border-0 transition-all duration-200"
          style={{
            transform: `translateX(-50%) translateY(${hov ? 0 : 8}px)`,
            opacity: hov ? 1 : 0,
          }}
        >
          QUICK VIEW
        </div>
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
            disabled={!product.catalogId}
            onClick={(e) => {
              e.preventDefault()
              if (product.catalogId) {
                add({
                  id: String(product.catalogId),
                  productId: String(product.catalogId),
                  slug: product.slug ?? '',
                  name: product.name,
                  price: product.price,
                  priceNum: product.priceNum ?? 0,
                  gradient: product.gradient,
                  label: product.label,
                })
              }
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

  if (product.slug) {
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={cn('bg-cream flex flex-col overflow-hidden cursor-pointer h-full', className)}
        style={imgHeight ? { height: '100%' } : undefined}
      >
        <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col h-full">
          {inner}
        </Link>
      </div>
    )
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn('bg-cream flex flex-col overflow-hidden cursor-pointer h-full', className)}
      style={imgHeight ? { height: '100%' } : undefined}
    >
      {inner}
    </div>
  )
}