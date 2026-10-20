'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CatalogProduct } from '@/lib/catalog'
import { useWishlist } from '@/lib/store'
import { Eyebrow } from '@/components/shared/primitives'
import { HeartIcon } from '@/components/icons'
import { useMounted } from '@/lib/useMounted'

export function WishlistView({ products }: { products: CatalogProduct[] }) {
  const mounted = useMounted()
  const ids = useWishlist((s) => s.ids)
  const toggle = useWishlist((s) => s.toggle)

  const items = mounted ? products.filter((p) => ids.includes(p.slug)) : []

  return (
    <>
    <div className="pt-[26px]">
      <Eyebrow label="Saved for later" hairline={false} />
      <h1 className="mt-2 font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
        Your <em className="italic text-copper">Wishlist</em>
      </h1>
    </div>
    {items.length === 0 ? (
      <div className="py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(191,94,24,0.3)]">
          <HeartIcon color="#BF5E18" outline="#BF5E18" />
        </div>
        <p className="mt-5 font-display text-2xl text-dark">Nothing saved yet</p>
        <p className="mt-2 font-ui text-sm font-light text-muted">Tap the heart on any piece to keep it here.</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link href="/sarees" className="bg-dark px-8 py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">
            Browse Sarees
          </Link>
          <Link href="/collections" className="border-b border-[rgba(191,94,24,0.4)] pb-0.5 font-ui text-[11px] tracking-[0.18em] text-copper uppercase transition-colors hover:border-dark hover:text-dark">
            Explore Collections
          </Link>
        </div>
      </div>
    ) : (
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
        {items.map((p) => (
          <div key={p.id} className="group relative transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_32px_-26px_rgba(28,10,6,0.65)]">
            <Link href={`/products/${p.slug}`} className="block">
              <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: p.gradient }}>
                {p.images?.[0] && (
                <Image fill src={p.images[0]} alt={p.name} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              )}
                <span className="absolute left-3 top-3 bg-copper px-2 py-0.5 font-ui text-[8px] tracking-[0.14em] text-ivory uppercase">{p.type === 'jewel' ? 'JEWELLERY' : 'SAREE'}</span>
              </div>
              <div className="bg-cream p-3">
                <div className="font-display text-[15px] leading-tight text-dark">{p.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-ui text-sm text-copper">{p.price}</span>
                </div>
              </div>
            </Link>
            <button
              onClick={() => toggle(p.slug)}
              aria-label={`Remove ${p.name} from wishlist`}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-[rgba(245,239,230,0.9)]"
            >
              <HeartIcon filled color="#BF5E18" />
            </button>
          </div>
        ))}
      </div>
    )}
    </>
  )
}
