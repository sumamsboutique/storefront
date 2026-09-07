'use client'

import { Reveal } from '@/lib/reveal'
import type { TestimonialContent } from '@/lib/data'

const FALLBACK: TestimonialContent = [
  {
    id: 0,
    quote: 'The Benarasi arrived wrapped like a gift and draped even better than I dreamed. Worth every rupee.',
    name: 'Ananya Sen',
    detail: 'Bride, Kolkata · Banarasi',
    rating: 5,
  },
  {
    id: 1,
    quote: 'Sumam personally helped me choose a Tant for my mother-in-law. You can feel the loom in every thread.',
    name: 'Ishita Roy',
    detail: 'Shantiniketan Tant',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The temple jewellery is even more beautiful in person. Hand-finished, heirloom quality.',
    name: 'Priya Chatterjee',
    detail: 'Lakshmi Temple Necklace',
    rating: 5,
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= rating ? '#D4880A' : 'rgba(28,10,6,0.15)'}
          stroke={i <= rating ? '#D4880A' : 'transparent'}
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials({ data }: { data?: TestimonialContent }) {
  const items = data && data.length ? data : FALLBACK
  return (
    <section className="py-[52px] md:py-24 px-5 md:px-[clamp(32px,6vw,85px)] bg-[#FDFBF7]">
      <Reveal>
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-copper">
            Words from our patrons
          </span>
          <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-light text-dark mt-3 max-w-xl tracking-tight">
            Worn once, <span className="italic text-copper">remembered for a lifetime</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((t) => (
            <figure
              key={t.id}
              className="relative border border-[#DCC9A8]/50 bg-white p-7 md:p-8 flex flex-col"
            >
              <span className="absolute top-4 right-6 font-display text-[64px] leading-none text-[rgba(191,94,24,0.12)] select-none">
                “
              </span>
              <Stars rating={t.rating} />
              <blockquote className="font-display text-[17px] font-light leading-relaxed text-dark mt-4 flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[#DCC9A8]/40">
                <div className="font-sans text-xs font-semibold tracking-wide text-dark uppercase">{t.name}</div>
                <div className="font-sans text-[10px] tracking-[0.08em] text-muted uppercase mt-0.5">{t.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}