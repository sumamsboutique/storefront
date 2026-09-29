'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CatalogProduct } from '@/lib/catalog'
import { HeartIcon, IconCart } from '@/components/icons'
import { useCart, useWishlist } from '@/lib/store'
import { useMounted } from '@/lib/useMounted'

export function PlpCard({ product }: { product: CatalogProduct }) {
  const { type, name, sub, price, priceNum, badge, gradient, label, sold, slug, tag, images } = product
  const mounted = useMounted()
  const add = useCart((s) => s.add)
  const wishlist = useWishlist((s) => s)

  const wished = mounted ? wishlist.has(product.id) : false
  const img = images?.[0]

  return (
    <Link
      href={`/products/${slug}`}
      className="group block w-full h-full flex flex-col"
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
            <>
              <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-black text-white px-3.5 py-1.5 font-ui text-[10px] font-semibold tracking-[0.24em] uppercase shadow-lg border border-white/20">
                  SOLD OUT
                </span>
              </div>
              <span className="absolute left-3 top-3 z-20 bg-black text-white px-2 py-0.5 font-ui text-[8px] font-bold tracking-[0.2em] uppercase">
                SOLD
              </span>
            </>
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
      <div className="bg-cream p-4 pb-[18px] flex-1 flex flex-col justify-end">
        {/* Both sub-lines are always rendered: a jewel card's copper category and
            a saree card's grey fabric line take the same 15px, so cards in a row
            stay the same height regardless of type. */}
        {type === 'jewel' ? (
          <div className="mb-2 h-[15px] font-ui text-[10px] leading-[15px] tracking-[0.1em] text-copper uppercase">{sub || tag}</div>
        ) : (
          <div className="mb-2 h-[15px] font-ui text-[10px] leading-[15px] tracking-[0.1em] text-muted uppercase" aria-hidden="true" />
        )}
        {/* Two lines always reserved: 17px * 1.3 * 2. Without it a 1-line name
            makes that card shorter than its row neighbours. */}
        <div className="font-display text-[17px] leading-[1.3] text-dark line-clamp-2 min-h-[44px]">{name}</div>
        {type === 'saree' ? (
          <div className="mb-2.5 h-[15px] font-ui text-[10px] leading-[15px] tracking-[0.1em] text-muted uppercase">{sub}</div>
        ) : (
          <div className="mb-2.5 h-[15px]" aria-hidden="true" />
        )}
        <div className="flex items-center justify-between">
          <span className="font-ui text-sm font-medium text-copper">{price}</span>
          {sold ? (
            /* Same slot as the add-to-bag button so the row stays aligned. */
            <span className="inline-flex items-center justify-center h-8 shrink-0 bg-black text-white px-2.5 font-ui text-[10px] font-semibold tracking-[0.12em] uppercase">
              SOLD OUT
            </span>
          ) : (
            <>
              {/* Desktop — labelled button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  add({ id: product.id, productId: product.id, slug, name, price, priceNum, gradient, label, image: img })
                }}
                className="hidden md:inline-flex h-8 items-center border border-[rgba(191,94,24,0.45)] px-3 font-ui text-[9px] tracking-[0.16em] text-copper uppercase"
              >
                Add to Bag
              </button>
              {/* Mobile — icon only, matching the h-8 sold-out badge in this row */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  add({ id: product.id, productId: product.id, slug, name, price, priceNum, gradient, label, image: img })
                }}
                className="md:hidden h-8 w-8 flex items-center justify-center border border-[rgba(191,94,24,0.45)] text-copper"
                aria-label={`Add ${name} to bag`}
              >
                <IconCart size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}