import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { SareeBorderDivider, AlponaDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'
import { getAllProducts } from '@/lib/data'
import { PlpCard } from '@/components/storefront/PlpCard'
import { SHOP_CATEGORIES } from '@/lib/catalog'

/* Card copy/photos for the five shop categories; hrefs derive from SHOP_CATEGORIES. */
const img = (p: string) => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sarees/${p}`

const TILE_META: Record<string, { desc: string; gradient: string; image?: string }> = {
  'silk-sarees': {
    desc: 'Rich silk drapes for weddings and celebrations.',
    gradient: 'linear-gradient(155deg,#2A0D06,#6B2E0E 50%,#BF5E18)',
    image: 'bangalore-silk-katha/01_Main_Product.png',
  },
  'tussar-ghicha-sarees': {
    desc: 'Textured tussar and ghicha weaves with a natural sheen.',
    gradient: 'linear-gradient(175deg,#2A1408,#6B4A1E 55%,#A07038)',
    image: 'madhubani-ghicha/01_Main_Product.png',
  },
  'cotton-blended-sarees': {
    desc: 'Light, breathable cotton blends for everyday grace.',
    gradient: 'linear-gradient(175deg,#1A1C14,#3E4432 55%,#6E7455)',
    image: 'cotton-silk-pashmina/01_Main_Product.png',
  },
  'printed-artistic-sarees': {
    desc: 'Artful prints carrying a painter’s touch.',
    gradient: 'linear-gradient(160deg,#16222B,#2E4658 55%,#55788F)',
    image: 'kalamkari/01_Main_Product.png',
  },
  'traditional-weaves-special-designs': {
    desc: 'Timeless weaves and special-design sarees.',
    gradient: 'linear-gradient(175deg,#1C0A06,#4A2010 55%,#8C6A55)',
    image: 'jaal-katal/01_Main_Product.png',
  },
}

export default async function Collections() {
  const bridal = (await getAllProducts()).filter((p) => p.occasion === 'Bridal')
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <div className={cn(PAD, 'pt-[26px] pb-[18px]')}>
        <div className="flex items-center gap-2.5 pb-3.5">
          <span className="h-px w-5 bg-copper" />
          <span className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase">Curated edits</span>
        </div>
        <h1 className="font-display text-[clamp(30px,4vw,42px)] font-light text-dark">
          Our <em className="italic text-copper">Collections</em>
        </h1>
        <AlponaDivider />
      </div>

      <div className={cn(PAD, 'grid grid-cols-1 gap-6 pb-12 sm:grid-cols-2')}>
        {SHOP_CATEGORIES.map((c) => {
          const m = TILE_META[c.slug] ?? { desc: '', gradient: 'linear-gradient(170deg,#EDE3D6,#C4A878 55%,#6B5238)' }
          return (
            <Link key={c.slug} href={`/sarees/${c.slug}`} className="group block">
              <div className="relative flex aspect-[4/3] items-end overflow-hidden p-6" style={{ background: m.gradient }}>
                {m.image && (
                  <Image fill src={img(m.image)} alt={c.label} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                )}
                <div className="absolute inset-0 bg-[rgba(28,10,6,0.25)] transition-opacity group-hover:opacity-0" />
                <div className="relative">
                  <div className="font-display text-3xl font-light text-ivory">{c.label}</div>
                  <p className="mt-1 font-ui text-xs font-light text-[rgba(245,239,230,0.8)]">{m.desc}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className={cn(PAD, 'pb-14')}>
        <div className="flex items-center justify-between pb-6">
          <div className="font-display text-3xl font-light text-dark">
            Bridal <em className="italic text-copper">Picks</em>
          </div>
          <Link href="/sarees" className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase border-b border-copper pb-0.5">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4">
          {bridal.slice(0, 4).map((p) => (
            <PlpCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}