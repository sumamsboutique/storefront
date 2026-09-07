import { Eyebrow } from '@/components/shared/primitives'
import { Reveal } from '@/lib/reveal'
import type { OurHeritageContent, HeroPart } from '@/lib/data'

const DEFAULT: OurHeritageContent = {
  eyebrow: 'OUR HERITAGE',
  headlineParts: [
    'A Boutique Born from ',
    { italic: true, copper: true, text: 'Love' },
    ' of Weave',
  ],
  blockquote:
    'Each saree we curate carries a piece of Shantiniketan — the same red soil where Tagore once walked, the same looms that have hummed for generations.',
  paragraphs: [
    "Sumam's Boutique began not as a business, but as a search — for sarees that still held the warmth of Bengali earth, the patience of handloom weavers, and the quiet grace of traditions passed down through generations.",
    'We travel each season to artisan families in Shantiniketan, Murshidabad, Bishnupur, and Shantipur — sourcing weaves that carry not just thread, but memory. Every piece is one-of-one. Once gone, never woven again.',
  ],
  image: '',
  founder: { en: 'Sumam', bn: 'সুমাম' },
  photoLabel: 'FOUNDER SUMAM AT THE SHANTINIKETAN LOOM',
}

function renderParts(parts: HeroPart[]) {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <em key={i} className="italic text-copper font-medium not-italic">
        <span className="italic font-light">{p.text}</span>
      </em>
    )
  )
}

export default function OurHeritage({ data }: { data?: OurHeritageContent }) {
  const d = data && data.blockquote ? data : DEFAULT
  return (
    <section className="bg-dark relative overflow-hidden px-5 py-[72px] md:px-[clamp(32px,6vw,85px)] md:py-[112px]">
      {/* Linen noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10">
        {/* Eyebrow */}
        <Reveal>
        <div className="hidden md:flex items-center gap-3 mb-14">
          <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-gold">
            {d.eyebrow}
          </span>
          <div className="w-7 h-px bg-gold" />
        </div>
        <Eyebrow label={d.eyebrow} color="text-gold" cn="md:hidden" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-6 md:gap-[60px] items-center">
          {/* LEFT — founder image */}
          <Reveal as="div">
          <div>
            <div className="relative w-full aspect-[5/6] overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #2A1008, #BF5E18)' }} />
              <div className="absolute inset-3 border border-[rgba(212,136,10,0.4)] z-20 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="font-bengali text-[64px] font-light text-ivory opacity-30 tracking-[0.04em] select-none">
                  {d.founder.bn}
                </span>
              </div>
              {/* Desktop photo label — dashed box */}
              <div className="hidden md:block absolute bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none">
                <div className="border border-dashed border-[rgba(245,239,230,0.15)] px-3.5 py-1.5">
                  <div className="font-sans text-[9px] tracking-[0.12em] uppercase text-[rgba(245,239,230,0.3)] text-center">
                    {d.photoLabel.split('/')[0]}
                    <br />
                    {d.photoLabel.split('/')[1]?.trim()}
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile photo label */}
            <div className="md:hidden text-center font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,230,0.35)] mt-5 mb-10">
              {d.photoLabel.toUpperCase()}
            </div>
          </div>
          </Reveal>

          {/* RIGHT — text */}
          <Reveal as="div" delay={100}>
          <div className="md:max-w-[480px]">
            <h2 className="font-display font-light text-[28px] md:text-[clamp(28px,2.8vw,38px)] leading-[1.2] text-ivory mb-7">
              {renderParts(d.headlineParts)}
            </h2>

            <blockquote className="border-l-2 border-copper pl-5 mb-6">
              <p className="font-display italic text-[17px] md:text-[22px] font-light text-[rgba(245,239,230,0.95)] leading-[1.5]">
                &quot;{d.blockquote}&quot;
              </p>
            </blockquote>

            {d.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-sans text-[14px] font-light text-[rgba(245,239,230,0.70)] leading-[1.8] mb-4"
              >
                {p}
              </p>
            ))}

            <div className="mt-7">
              <div className="font-display italic text-[18px] text-copper">— {d.founder.en}</div>
              <div className="font-bengali text-[13px] font-light text-[rgba(212,136,10,0.60)] mt-1">
                — {d.founder.bn}
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
