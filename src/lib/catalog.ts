// Unified client-side product catalog (Phase 2 storefront). Single source of
// truth so PLP/PDP/homepage all read from the same data. Swap internals for
// Supabase queries in Phase 3 without changing component props.

export interface CatalogProduct {
  id: string
  slug: string
  type: 'saree' | 'jewel'
  name: string
  sub: string // category tag shown in card ("BENARASI · BRIDAL")
  tag: string // jewel eyebrow ("TEMPLE COLLECTION")
  price: string // display ("₹24,500")
  priceNum: number // for sorting
  badge: string | null
  gradient: string
  label: string // photo caption tail
  sold: boolean
  weave: string // filter bucket (Benarasi, Tant, …)
  occasion: string // Bridal, Festive, Everyday…
  images?: string[] // optional product photos (fallback → gradient placeholder)
}

const G = {
  benarasiHero: 'linear-gradient(155deg, #2A0D06, #6B2410 35%, #A04514 70%, #BF5E18)',
  benarasiAlt: 'linear-gradient(165deg, #3D1408, #7A2C0C 45%, #BF5E18 75%, #8B3A14)',
  tantLight: 'linear-gradient(170deg, #F5EFE6, #DCC9A8 45%, #B8956A 80%, #8C6A55)',
  muslinLight: 'linear-gradient(170deg, #EDE3D6, #C9B488 50%, #8E6F4A 90%)',
  jamdaniLight: 'linear-gradient(170deg, #EDE3D6, #C4A878 55%, #6B5238)',
  kanthaDark: 'linear-gradient(155deg, #1C0A06, #4A2010 45%, #8C6A55 90%)',
  silkDark: 'linear-gradient(155deg, #2A1008, #5A2A14 40%, #A04A18 75%, #D4880A)',
  silkBridal: 'linear-gradient(160deg, #3D1408, #6B2310 40%, #BF5E18 70%, #D4880A)',
  garadLight: 'linear-gradient(170deg, #F5EFE6, #E8D5B0 50%, #BF5E18 95%)',
  mishraBry: 'linear-gradient(145deg, #14301E, #1F5236 50%, #4A8B68)',
  ivoryBry: 'linear-gradient(145deg, #EDE3D6, #D4B896 50%, #BFA678)',
  rustBry: 'linear-gradient(145deg, #3D1C0A, #8B3A14 50%, #C4611A)',
  maroonBry: 'linear-gradient(145deg, #1C0A06, #4A2010 50%, #BF5E18)',
  templeJ: 'linear-gradient(165deg, #4A2010, #8B3A14 40%, #C4611A 70%, #7A2C0C)',
  maangtikkaJ: 'linear-gradient(165deg, #4A3810, #8B5E10 40%, #E8A820 70%, #BF5E18)',
  contemporaryJ: 'linear-gradient(165deg, #5A2A14, #8B3A14 40%, #C4611A 70%, #4A2010)',
}

const n = (s: string) => parseInt(s.replace(/[₹,]/g, ''), 10)

export const CATALOG: CatalogProduct[] = [
  { id: 'c1', slug: 'chandrakala-benarasi-silk', type: 'saree', name: 'Chandrakala Benarasi Silk', sub: 'Benarasi · Bridal', tag: '', price: '₹42,500', priceNum: n('42500'), badge: 'Featured', gradient: G.benarasiHero, label: 'chandrakala motif zari', sold: false, weave: 'Benarasi', occasion: 'Bridal', images: ['/Products/Banarasi/chandrakala-benarasi-silk.png'] },
  { id: 'c2', slug: 'nilima-tant-cotton', type: 'saree', name: 'Nilima Tant Cotton', sub: 'Tant · Everyday', tag: '', price: '₹3,800', priceNum: n('3800'), badge: 'New Arrival', gradient: G.tantLight, label: 'everyday tant weave', sold: false, weave: 'Tant', occasion: 'Everyday', images: ['/Products/Handlooms/nilima-tant-cotton.png'] },
  { id: 'c3', slug: 'aarohi-muslin-drape', type: 'saree', name: 'Aarohi Muslin Drape', sub: 'Muslin · Festive', tag: '', price: '₹12,200', priceNum: n('12200'), badge: null, gradient: G.muslinLight, label: 'airlight muslin', sold: false, weave: 'Muslin', occasion: 'Festive', images: ['/Products/Handlooms/aarohi-muslin-drape.png'] },
  { id: 'c4', slug: 'durga-temple-necklace-set', type: 'jewel', name: 'Durga Temple Necklace Set', sub: '', tag: 'Temple Collection', price: '₹18,750', priceNum: n('18750'), badge: null, gradient: G.templeJ, label: 'lakshmi temple necklace · antique gold', sold: false, weave: 'Temple', occasion: 'Festive', images: ['/Products/jewellery/durga-temple-necklace-set.png'] },
  { id: 'c5', slug: 'priya-kantha-stitch', type: 'saree', name: 'Priya Kantha Stitch', sub: 'Kantha · Everyday', tag: '', price: '₹8,900', priceNum: n('8900'), badge: null, gradient: G.kanthaDark, label: 'hand embroidered kantha', sold: true, weave: 'Kantha', occasion: 'Everyday', images: ['/Products/Handlooms/priya-kantha-stitch.png'] },
  { id: 'c6', slug: 'madhubani-silk-weave', type: 'saree', name: 'Madhubani Silk Weave', sub: 'Silk · Festive', tag: '', price: '₹28,000', priceNum: n('28000'), badge: 'New Arrival', gradient: G.silkDark, label: 'madhubani inspired silk', sold: false, weave: 'Silk', occasion: 'Festive', images: ['/Products/Handlooms/madhubani-silk-weave.png'] },
  { id: 'c7', slug: 'rukmini-jamdani-cotton', type: 'saree', name: 'Rukmini Jamdani Cotton', sub: 'Jamdani · Puja', tag: '', price: '₹14,500', priceNum: n('14500'), badge: null, gradient: G.jamdaniLight, label: 'fine jamdani resist', sold: false, weave: 'Jamdani', occasion: 'Puja', images: ['/Products/Handlooms/rukmini-jamdani-cotton.png'] },
  { id: 'c8', slug: 'shankha-garad-silk', type: 'saree', name: 'Shankha Garad Silk', sub: 'Garad · Wedding Guest', tag: '', price: '₹19,200', priceNum: n('19200'), badge: null, gradient: G.garadLight, label: 'wedding guest garad', sold: false, weave: 'Garad', occasion: 'Wedding Guest', images: ['/Products/Handlooms/shankha-garad-silk.png'] },
  { id: 'c9', slug: 'annapurna-benarasi-silk', type: 'saree', name: 'Annapurna Benarasi Silk', sub: 'Benarasi · Puja', tag: '', price: '₹36,800', priceNum: n('36800'), badge: 'Featured', gradient: G.benarasiAlt, label: 'puja gold zari', sold: false, weave: 'Benarasi', occasion: 'Puja', images: ['/Products/Banarasi/annapurna-benarasi-silk.png'] },
  { id: 'c10', slug: 'kolkata-contemporary-studs', type: 'jewel', name: 'Kolkata Contemporary Studs', sub: '', tag: 'Contemporary Collection', price: '₹6,400', priceNum: n('6400'), badge: null, gradient: G.contemporaryJ, label: 'contemporary studs', sold: false, weave: 'Contemporary', occasion: 'Everyday', images: ['/Products/jewellery/kolkata-contemporary-studs.png'] },
  { id: 'c11', slug: 'meera-tant-handloom', type: 'saree', name: 'Meera Tant Handloom', sub: 'Tant · Everyday', tag: '', price: '₹4,200', priceNum: n('4200'), badge: null, gradient: G.tantLight, label: 'handloom tant', sold: true, weave: 'Tant', occasion: 'Everyday', images: ['/Products/Handlooms/meera-tant-handloom.png'] },
  { id: 'c12', slug: 'devika-silk-drape', type: 'saree', name: 'Devika Silk Drape', sub: 'Silk · Bridal', tag: '', price: '₹52,000', priceNum: n('52000'), badge: null, gradient: G.silkBridal, label: 'bridal silk drape', sold: false, weave: 'Silk', occasion: 'Bridal', images: ['/Products/Handlooms/devika-silk-drape.png'] },
  // PDP resolve targets (also appear in related/styled strips)
  { id: 'p1', slug: 'royal-crimson-benarasi', type: 'saree', name: 'Royal Crimson Benarasi', sub: 'Benarasi · Bridal', tag: '', price: '₹24,500', priceNum: n('24500'), badge: null, gradient: 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)', label: 'one of one crimson', sold: false, weave: 'Benarasi', occasion: 'Bridal', images: ['/Products/Banarasi/royal-crimson-benarasi.png'] },
  { id: 'p2', slug: 'emerald-benarasi-silk', type: 'saree', name: 'Emerald Benarasi Silk', sub: 'Benarasi · Festive', tag: '', price: '₹26,800', priceNum: n('26800'), badge: 'New Arrival', gradient: G.mishraBry, label: 'emerald with silver zari', sold: false, weave: 'Benarasi', occasion: 'Festive', images: ['/Products/Banarasi/emerald-benarasi-silk.png'] },
  { id: 'p3', slug: 'maroon-heritage-benarasi', type: 'saree', name: 'Maroon Heritage Benarasi', sub: 'Benarasi · Festive', tag: '', price: '₹22,400', priceNum: n('22400'), badge: null, gradient: G.maroonBry, label: 'classic maroon pallu', sold: false, weave: 'Benarasi', occasion: 'Festive', images: ['/Products/Banarasi/maroon-heritage-benarasi.png'] },
  { id: 'p4', slug: 'ivory-royal-benarasi', type: 'saree', name: 'Ivory Royal Benarasi', sub: 'Benarasi · Bridal', tag: '', price: '₹28,500', priceNum: n('28500'), badge: 'Featured', gradient: G.ivoryBry, label: 'ivory with gold zari', sold: false, weave: 'Benarasi', occasion: 'Bridal', images: ['/Products/Banarasi/ivory-royal-benarasi.png'] },
  { id: 'p5', slug: 'rust-antique-benarasi', type: 'saree', name: 'Rust Antique Benarasi', sub: 'Benarasi · Festive', tag: '', price: '₹19,800', priceNum: n('19800'), badge: null, gradient: G.rustBry, label: 'rust antique gold work', sold: false, weave: 'Benarasi', occasion: 'Festive', images: ['/Products/Banarasi/rust-antique-benarasi.png'] },
  { id: 'j1', slug: 'lakshmi-temple-necklace', type: 'jewel', name: 'Lakshmi Temple Necklace', sub: '', tag: 'Temple Collection', price: '₹3,200', priceNum: n('3200'), badge: null, gradient: G.templeJ, label: 'lakshmi temple necklace · antique gold', sold: false, weave: 'Temple', occasion: 'Festive', images: ['/Products/jewellery/lakshmi-temple-necklace.png'] },
  { id: 'j2', slug: 'heirloom-maangtikka', type: 'jewel', name: 'Heirloom Maangtikka', sub: '', tag: 'Gold-Plated', price: '₹1,950', priceNum: n('1950'), badge: null, gradient: G.maangtikkaJ, label: 'golden maangtikka · forehead ornament', sold: false, weave: 'Gold-Plated', occasion: 'Festive', images: ['/Products/jewellery/heirloom-maangtikka.png'] },
  { id: 'j3', slug: 'drop-temple-earrings', type: 'jewel', name: 'Drop Temple Earrings', sub: '', tag: 'Temple Collection', price: '₹2,400', priceNum: n('2400'), badge: null, gradient: G.templeJ, label: 'temple earrings · drop style', sold: false, weave: 'Temple', occasion: 'Bridal', images: ['/Products/jewellery/drop-temple-earrings.png'] },
]

export const bySlug = (slug: string) => CATALOG.find((p) => p.slug === slug)

export const SAREES = CATALOG.filter((p) => p.type === 'saree')
export const JEWELLERY = CATALOG.filter((p) => p.type === 'jewel')

export const OPTIONS = {
  sarees: SAREES,
  jewellery: JEWELLERY,
  all: CATALOG,
} as const

export const WEAVES = ['Benarasi', 'Tant', 'Muslin', 'Jamdani', 'Kantha', 'Garad', 'Silk', 'Temple', 'Contemporary', 'Gold-Plated']
export const OCCASIONS = ['Bridal', 'Festive', 'Everyday', 'Puja', 'Wedding Guest']

export { n as numToPrice }
