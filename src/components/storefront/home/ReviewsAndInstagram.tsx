'use client'

import { useState, useEffect, useRef } from 'react'
import { InstagramGlyph } from '@/components/icons'
import { Reveal } from '@/lib/reveal'
import { splitReviewDetail } from '@/lib/reviews'
import type { TestimonialContent, InstaContent, InstaPost } from '@/lib/data'

type Card = {
  id: string
  kind: 'review' | 'instagram'
  author: string
  context: string
  product: string
  caption: string
  review: string
  rating?: number
  image?: string
  gradient: string
  instagramUrl: string
  tag: string
}

const DEFAULT_IG_URL = 'https://instagram.com/sumams.boutique'

const REVIEW_GRADIENTS = [
  'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)',
  'linear-gradient(160deg, #3D1408, #6B2310 40%, #D4880A)',
]

const FALLBACK_TESTIMONIALS: TestimonialContent = [
  {
    id: 1,
    quote: 'The Benarasi arrived wrapped like a bridal gift and draped even better than I dreamed. The gold zari work has genuine heirloom weight.',
    name: 'Ananya Sen',
    detail: 'Bride, Kolkata · Chandrakala Benarasi',
    rating: 5,
    image: '/Products/Banarasi/chandrakala-benarasi-silk.png',
  },
  {
    id: 2,
    quote: 'Sumam personally helped me choose a Tant for my mother-in-law. You can truly feel the rhythm of the wooden loom in every fine cotton thread.',
    name: 'Ishita Roy',
    detail: 'Patron, Bengaluru · Shantiniketan Tant',
    rating: 5,
    image: '/Products/Handlooms/nilima-tant-cotton.png',
  },
  {
    id: 3,
    quote: 'The temple jewellery is even more breathtaking in person. Hand-chased brass with antique gold finish, heirloom weight and museum quality.',
    name: 'Priya Chatterjee',
    detail: 'Festive Patron, Mumbai · Durga Temple Set',
    rating: 5,
    image: '/Products/jewellery/durga-temple-necklace-set.png',
  },
]

const FALLBACK_INSTA_POSTS: InstaPost[] = [
  { user: '@sumams.boutique', capt: 'Benarasi in the morning light — pure mulberry silk bathed in Shantiniketan dawn #handloom', gradient: 'linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)', image: '/Banners/banarasi-saree.png' },
  { user: '@sumams.boutique', capt: 'Founder Sumam supervising the cutting of a fine Shantiniketan Tant drape #craft', gradient: 'linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)', image: '/Banners/spring-edit.jpeg' },
  { user: '@sumams.boutique', capt: 'The Shantiniketan pit loom at work — two weeks for a single Jamdani pallu #heritage', gradient: 'linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)', image: '/Banners/tant-saree.jpeg' },
  { user: '@sumams.boutique', capt: 'Brass temple jewellery fresh from the artisan forge — chased and finished by hand #finejewels', gradient: 'linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)', image: '/Banners/temple-jewellery.jpeg' },
]

// CMS images may be absolute URLs or site-relative; normalize bare paths to root.
function imageSrc(image?: string) {
  if (!image) return undefined
  return image.startsWith('http') || image.startsWith('/') ? image : `/${image}`
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
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

// Post media: the real Instagram thumbnail when set, gradient placeholder otherwise.
function PostMedia({
  image,
  gradient,
  className,
  children,
}: {
  image?: string
  gradient: string
  className?: string
  children?: React.ReactNode
}) {
  const src = imageSrc(image)
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={src ? undefined : { background: gradient }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-display text-4xl font-light text-white/85 drop-shadow select-none">
          সু
        </span>
      )}
      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
      {children}
    </div>
  )
}

export default function ReviewsAndInstagram({
  testimonials,
  instagram,
}: {
  testimonials?: TestimonialContent
  instagram?: InstaContent
}) {
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [nav, setNav] = useState({ start: true, end: true })

  const igUrl = instagram?.url || DEFAULT_IG_URL
  const rawReviews = testimonials && testimonials.length ? testimonials : FALLBACK_TESTIMONIALS
  const rawPosts = instagram?.posts && instagram.posts.length ? instagram.posts : FALLBACK_INSTA_POSTS

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveCard(null)
      }
    }
    if (activeCard) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeCard])

  const reviewCards: Card[] = rawReviews.map((t, idx) => {
    const { context, product } = splitReviewDetail(t.detail || '')
    return {
      id: `review-${t.id || idx}`,
      kind: 'review',
      author: t.name,
      context,
      product,
      caption: '',
      review: t.quote,
      rating: t.rating,
      image: t.image,
      gradient: REVIEW_GRADIENTS[idx % REVIEW_GRADIENTS.length],
      instagramUrl: igUrl,
      tag: 'Verified Patron',
    }
  })

  const postCards: Card[] = rawPosts.map((p, idx) => ({
    id: `insta-${p.img ?? idx}`,
    kind: 'instagram',
    author: p.user || `@${instagram?.handle || 'sumams.boutique'}`,
    context: 'Atelier Dispatch · Shantiniketan',
    product: '',
    caption: p.capt,
    review: '',
    image: p.image,
    gradient: p.gradient || 'linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)',
    instagramUrl: igUrl,
    tag: 'Instagram Post',
  }))

  const cards = [...reviewCards, ...postCards]

  // Slider: 4 cards per view; arrows page by one view. Track scroll state to enable/disable arrows.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () => {
      setNav({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [cards.length])

  const page = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  const hasOverflow = !(nav.start && nav.end)

  return (
    <section className="py-14 md:py-24 px-5 md:px-[clamp(32px,6vw,85px)] bg-[#FDFBF7] border-t border-[#DCC9A8]/40 relative">
      <div className="mx-auto w-full max-w-[1440px]">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          <div className="flex items-center gap-2 mb-2">
            <InstagramGlyph className="text-copper w-4 h-4" />
            <span className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-copper">
              Community, Reviews & Instagram
            </span>
          </div>
          <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-light text-dark max-w-2xl tracking-tight leading-tight">
            Worn with pride, <span className="italic text-copper">celebrated across the world</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-muted max-w-xl mt-3 leading-relaxed">
            Our patrons share their fits on Instagram. Tap any post to open the full reel, its caption, and the review behind it.
          </p>
        </div>
      </Reveal>

      {/* Cards slider — 4 per view, arrow-paged */}
      <Reveal delay={80}>
        <div>
          {hasOverflow && (
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                type="button"
                onClick={() => page(-1)}
                disabled={nav.start}
                aria-label="Previous posts and reviews"
                className="w-9 h-9 flex items-center justify-center border border-[#DCC9A8]/70 text-dark hover:border-copper hover:text-copper transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => page(1)}
                disabled={nav.end}
                aria-label="Next posts and reviews"
                className="w-9 h-9 flex items-center justify-center border border-[#DCC9A8]/70 text-dark hover:border-copper hover:text-copper transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setActiveCard(card)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveCard(card)
                }
              }}
              className="group relative bg-white border border-[#DCC9A8]/60 hover:border-copper flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-left overflow-hidden h-full snap-start shrink-0 basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)] xl:basis-[calc((100%-3.75rem)/4)]"
            >
              {/* Top: Instagram post / thumbnail */}
              <PostMedia image={card.image} gradient={card.gradient} className="w-full aspect-[4/5]">
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.16em] font-sans px-2 py-0.5 bg-black/45 text-white/95 backdrop-blur-sm">
                  {card.tag}
                </span>
                <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/45 text-white/95 backdrop-blur-sm flex items-center justify-center">
                  <InstagramGlyph className="w-3.5 h-3.5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-white bg-black/55 px-3 py-1 backdrop-blur-sm">
                    {card.kind === 'instagram' ? 'View Post' : 'Read Review'}
                  </span>
                </div>
              </PostMedia>

              {/* Bottom: reviewer detail + purchased product */}
              <div className="p-4 flex flex-col gap-3 grow">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#1C0A06] text-[#E8D5B0] flex items-center justify-center font-display text-sm shrink-0">
                      {card.kind === 'instagram' ? 'সু' : card.author.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-sans text-xs font-semibold text-dark truncate">{card.author}</div>
                      {card.context && (
                        <div className="font-sans text-[10px] text-muted truncate">{card.context}</div>
                      )}
                    </div>
                  </div>
                  {card.rating && <Stars rating={card.rating} />}
                </div>

                {card.product && (
                  <div className="mt-auto pt-3 border-t border-[#DCC9A8]/30 flex items-baseline gap-1.5 font-sans">
                    <span className="text-[9px] uppercase tracking-[0.16em] text-muted shrink-0">Purchased</span>
                    <span className="text-[11px] font-medium text-dark truncate">{card.product}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>
      </Reveal>
      </div>

      {/* Expanded post / review */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveCard(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Instagram post and review details"
        >
          <div
            className="relative w-full max-w-xl bg-[#FDFBF7] border border-[#DCC9A8] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with author and close */}
            <div className="p-5 sm:p-6 border-b border-[#DCC9A8]/50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#1C0A06] text-[#E8D5B0] flex items-center justify-center font-display text-base font-medium shrink-0 shadow-sm">
                  {activeCard.kind === 'instagram' ? 'সু' : activeCard.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-base font-medium text-dark truncate">{activeCard.author}</h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-copper text-white rounded-full text-[9px] shrink-0" title="Verified">
                      ✓
                    </span>
                  </div>
                  {activeCard.context && <p className="font-sans text-xs text-muted truncate">{activeCard.context}</p>}
                </div>
              </div>

              <button
                onClick={() => setActiveCard(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-dark/70 hover:text-dark hover:bg-black/5 transition-colors text-lg font-sans shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              <PostMedia
                image={activeCard.image}
                gradient={activeCard.gradient}
                className="w-full aspect-[4/5] sm:aspect-[4/3]"
              >
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-black/45 text-white px-2 py-0.5 backdrop-blur-sm">
                  {activeCard.tag}
                </span>
                <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center backdrop-blur-sm">
                  <InstagramGlyph className="w-4 h-4" />
                </span>
              </PostMedia>

              <div className="p-6 sm:p-7 space-y-4">
                {activeCard.rating && (
                  <div className="flex items-center gap-2">
                    <Stars rating={activeCard.rating} />
                    <span className="font-sans text-xs text-copper font-medium">
                      {activeCard.rating.toFixed(1)} / 5.0 Rating
                    </span>
                  </div>
                )}

                {/* Instagram caption */}
                {activeCard.caption && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-copper font-sans">
                      <InstagramGlyph className="w-3 h-3" />
                      Post Caption
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-dark">{activeCard.caption}</p>
                  </div>
                )}

                {/* Customer review */}
                {activeCard.review && (
                  <div className="space-y-1.5">
                    {activeCard.caption && (
                      <div className="text-[10px] uppercase tracking-[0.16em] text-copper font-sans">
                        Patron Review
                      </div>
                    )}
                    <blockquote className="font-display text-base sm:text-lg font-light leading-relaxed text-dark">
                      “{activeCard.review}”
                    </blockquote>
                  </div>
                )}

                {activeCard.product && (
                  <div className="pt-3 border-t border-[#DCC9A8]/40 flex items-baseline gap-2 font-sans">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-muted">Purchased</span>
                    <span className="text-sm font-medium text-dark">{activeCard.product}</span>
                  </div>
                )}

                <p className="font-sans text-xs text-muted leading-relaxed">
                  Each handloom creation at Sumam&apos;s is handwoven by master artisans across Shantiniketan, Murshidabad, and Bishnupur, preserving the traditional craft heritage of Bengal.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 sm:p-5 border-t border-[#DCC9A8]/60 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveCard(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-sans uppercase tracking-wider text-muted hover:text-dark transition-colors border border-transparent hover:border-[#DCC9A8]/60"
              >
                Close Preview
              </button>

              <a
                href={activeCard.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1C0A06] hover:bg-[#8B3A14] text-ivory text-xs font-sans font-semibold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg"
              >
                <InstagramGlyph className="w-4 h-4 text-ivory" />
                Check Our Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
