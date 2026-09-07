'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CatalogProduct } from '@/lib/catalog'
import { HeartIcon } from '@/components/icons'
import { useCart, useWishlist } from '@/lib/store'

export function PlpCard({ product }: { product: CatalogProduct }) {
  const { type, name, sub, price, priceNum, badge, gradient, label, sold, slug, tag, images } = product
  const add = useCart((s) => s.add)
  const wishlist = useWishlist((s) => s)
  const wished = wishlist.has(product.id)
  const img = images?.[0]

  return (
    <Link
      href={`/products/${slug}`}
      className="group block w-full"
    >
      <div className="relative overflow-hidden">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden bg-cream"
        >
          {img ? (
            <Image fill src={img} alt={name} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: gradient }} />
          )}
          {sold && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex h-10 w-10 rotate-45 items-center justify-center border border-[rgba(245,239,230,0.5)]">
                <span className="-rotate-45 font-ui text-[9px] font-medium tracking-[0.18em] text-[rgba(245,239,230,0.85)]">SOLD</span>
              </div>
            </div>
          )}
          {badge && !sold && (
            <span className="absolute left-4 top-4 z-10 bg-copper px-2.5 py-1 font-ui text-[9px] font-medium tracking-[0.18em] text-ivory uppercase">
              {badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              wishlist.toggle(product.id)
            }}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-[rgba(245,239,230,0.88)] transition-opacity md:opacity-0 md:group-hover:opacity-100"
          >
            <HeartIcon filled={wished} color="#BF5E18" outline="#1C0A06" />
          </button>
        </div>
      </div>
      <div className="bg-cream p-4 pb-[18px]">
        {type === 'jewel' ? (
          <div className="mb-2 font-ui text-[10px] tracking-[0.1em] text-copper uppercase">{sub || tag}</div>
        ) : null}
        <div className="font-display text-[17px] leading-[1.3] text-dark">{name}</div>
        {type === 'saree' ? (
          <div className="mb-2.5 font-ui text-[10px] tracking-[0.1em] text-muted uppercase">{sub}</div>
        ) : null}
        <div className="flex items-center justify-between">
          <span className="font-ui text-sm font-medium text-copper">{price}</span>
          {sold ? (
            <span className="font-ui text-[9px] tracking-[0.16em] text-muted uppercase">Sold out</span>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                add({ id: product.id, productId: product.id, slug, name, price, priceNum, gradient, label, image: img })
              }}
              className="h-8 border border-[rgba(191,94,24,0.45)] px-3 font-ui text-[9px] tracking-[0.16em] text-copper uppercase"
            >
              Add to Bag
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}