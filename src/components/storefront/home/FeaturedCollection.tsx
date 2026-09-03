import Link from 'next/link'
import { ProductCard, type ProductCardData } from '../ProductCard'
import { AlponaDivider } from '@/components/shared/primitives'
import { Reveal } from '@/lib/reveal'

const FEATURED: ProductCardData[] = [
  {
    id: 1,
    catalogId: 'p1',
    slug: 'royal-crimson-benarasi',
    badge: 'NEW ARRIVAL',
    badgeColor: '#BF5E18',
    gradient: 'linear-gradient(145deg, #2A0D06, #6B2E0E 35%, #BF5E18 70%, #8B3A14)',
    name: 'Royal Crimson Benarasi',
    sub: 'Pure Silk · Handwoven · Varanasi',
    price: '₹24,500',
    priceNum: 24500,
    label: 'Benarasi silk — rich crimson with gold zari',
    aspect: 2 / 3,
    images: ['/Products/Banarasi/royal-crimson-benarasi.png'],
  },
  {
    id: 2,
    catalogId: 'c2',
    slug: 'nilima-tant-cotton',
    badge: null,
    gradient: 'linear-gradient(145deg, #EDE3D6, #D4B896 40%, #B8956A 70%, #8C6A55)',
    name: 'Nilima Tant Cotton',
    sub: 'Cotton Tant · West Bengal',
    price: '₹3,800',
    priceNum: 3800,
    label: 'Tant cotton — ivory with delicate border',
    aspect: 3 / 4,
    images: ['/Products/Handlooms/nilima-tant-cotton.png'],
  },
  {
    id: 3,
    catalogId: 'c5',
    slug: 'priya-kantha-stitch',
    badge: 'FEATURED',
    badgeColor: '#D4880A',
    gradient: 'linear-gradient(145deg, #1C0A06, #4A2010 45%, #8C6A55 90%)',
    name: 'Priya Kantha Stitch',
    sub: 'Kantha Embroidery · Hand-stitched',
    price: '₹8,900',
    priceNum: 8900,
    label: 'Kantha silk — hand embroidered',
    aspect: 3 / 4,
    images: ['/Products/Handlooms/priya-kantha-stitch.png'],
  },
]

const GH = 780

export default function FeaturedCollection({ products = FEATURED }: { products?: ProductCardData[] }) {
  const FEAT = products.length ? products : FEATURED
  return (
    <section className="bg-ivory px-5 py-14 md:py-24 md:px-[clamp(32px,6vw,85px)]">
      {/* Header */}
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-copper">
                FEATURED SAREES
              </span>
              <div className="w-7 h-px bg-copper" />
            </div>
            <h2 className="font-display font-light text-[28px] md:text-[clamp(30px,3vw,42px)] leading-[1.15] text-dark">
              The <em className="italic text-copper">Season&apos;s</em> Finest Drapes
            </h2>
          </div>
          <Link
            href="/sarees"
            className="hidden md:inline-block font-sans text-[10px] font-normal tracking-[0.2em] uppercase text-copper no-underline border-b border-copper pb-0.5 mb-1.5 whitespace-nowrap hover:text-[#A0501A] transition-colors"
          >
            View All Sarees →
          </Link>
        </div>
      </Reveal>

      {/* Mobile "View All" link */}
      <Link
        href="/sarees"
        className="md:hidden inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-copper no-underline border-b border-copper pb-0.5 mt-2 hover:text-[#A0501A] transition-colors"
      >
        View All Sarees →
      </Link>

      <Reveal delay={80}>
        <AlponaDivider className="my-8" />
      </Reveal>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-8 md:hidden">
        {FEAT.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>

      {/* Desktop: asymmetric grid */}
      <div
        className="hidden md:grid gap-5"
        style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: `${GH * 0.58}px ${GH * 0.58}px` }}
      >
        <div style={{ gridRow: '1 / 3' }}>
          <Reveal className="h-full" as="div">
            <ProductCard product={FEAT[0]} imgHeight={GH * 1.02} />
          </Reveal>
        </div>
        <div style={{ gridRow: '1 / 2' }}>
          <Reveal as="div" className="h-full" delay={120}>
            <ProductCard product={FEAT[1]} imgHeight={GH * 0.58 * 0.72} />
          </Reveal>
        </div>
        <div style={{ gridRow: '2 / 3' }}>
          <Reveal as="div" className="h-full" delay={200}>
            <ProductCard product={FEAT[2]} imgHeight={GH * 0.58 * 0.72} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}