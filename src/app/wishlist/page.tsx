'use client'

import Link from 'next/link'
import { CATALOG } from '@/lib/catalog'
import { useWishlist } from '@/lib/store'
import { PAD, Eyebrow } from '@/components/shared/primitives'
import { HeartIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

export default function Wishlist() {
  const ids = useWishlist((s) => s.ids)
  const toggle = useWishlist((s) => s.toggle)
  const items = CATALOG.filter((p) => ids.includes(p.id))

  return (
    <div className="min-h-screen bg-ivory">
      <div className={cn(PAD)}>
        <div className="pt-[26px]">
          <Eyebrow label="Saved for later" hairline={false} />
          <h1 className="mt-2 font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
            Your <em className="italic text-copper">Wishlist</em>
          </h1>
        </div>
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-dark">Nothing saved yet</p>
            <p className="mt-2 font-ui text-sm font-light text-muted">Tap the heart on any piece to keep it here.</p>
            <Link href="/sarees" className="mt-8 inline-block bg-dark px-8 py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">
              Browse Sarees
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
            {items.map((p) => (
              <div key={p.id} className="group relative">
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: p.gradient }}>
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
                  onClick={() => toggle(p.id)}
                  aria-label={`Remove ${p.name} from wishlist`}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-[rgba(245,239,230,0.9)]"
                >
                  <HeartIcon filled color="#BF5E18" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}