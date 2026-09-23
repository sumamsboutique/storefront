'use client'

import { useState, useEffect } from 'react'
import { InstagramGlyph } from '@/components/icons'
import { Reveal } from '@/lib/reveal'
import type { TestimonialContent, InstaContent } from '@/lib/data'

type ModalStory = {
  id: string
  type: 'review' | 'instagram'
  author: string
  subtitle: string
  text: string
  rating?: number
  gradient: string
  tag: string
  location: string
  date: string
  instagramUrl: string
}

const DEFAULT_IG_URL = 'https://instagram.com/sumams.boutique'

const FALLBACK_TESTIMONIALS: TestimonialContent = [
  {
    id: 1,
    quote: 'The Benarasi arrived wrapped like a bridal gift and draped even better than I dreamed. The gold zari work has genuine heirloom weight.',
    name: 'Ananya Sen',
    detail: 'Bride, Kolkata · Chandrakala Benarasi',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Sumam personally helped me choose a Tant for my mother-in-law. You can truly feel the rhythm of the wooden loom in every fine cotton thread.',
    name: 'Ishita Roy',
    detail: 'Patron, Bengaluru · Shantiniketan Tant',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The temple jewellery is even more breathtaking in person. Hand-chased brass with antique gold finish, heirloom weight and museum quality.',
    name: 'Priya Chatterjee',
    detail: 'Festive Patron, Mumbai · Durga Temple Set',
    rating: 5,
  },
]

const FALLBACK_INSTA_POSTS = [
  { img: 1, user: '@sumams.boutique', capt: 'Benarasi in the morning light — pure mulberry silk bathed in Shantiniketan dawn #handloom', gradient: 'linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)' },
  { img: 2, user: '@sumams.boutique', capt: 'Founder Sumam supervising the cutting of a fine Shantiniketan Tant drape #craft', gradient: 'linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)' },
  { img: 3, user: '@sumams.boutique', capt: 'The Shantiniketan pit loom at work — two weeks for a single Jamdani pallu #heritage', gradient: 'linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)' },
  { img: 4, user: '@sumams.boutique', capt: 'Brass temple jewellery fresh from the artisan forge — chased and finished by hand #finejewels', gradient: 'linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)' },
]

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

export default function ReviewsAndInstagram({
  testimonials,
  instagram,
}: {
  testimonials?: TestimonialContent
  instagram?: InstaContent
}) {
  const [activeStory, setActiveStory] = useState<ModalStory | null>(null)
  const [filter, setFilter] = useState<'all' | 'reviews' | 'instagram'>('all')

  const igUrl = instagram?.url || DEFAULT_IG_URL
  const rawReviews = testimonials && testimonials.length ? testimonials : FALLBACK_TESTIMONIALS
  const rawPosts = instagram?.posts && instagram.posts.length ? instagram.posts : FALLBACK_INSTA_POSTS

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveStory(null)
      }
    }
    if (activeStory) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeStory])

  const reviewStories: ModalStory[] = rawReviews.map((t, idx) => ({
    id: `review-${t.id || idx}`,
    type: 'review',
    author: t.name,
    subtitle: t.detail,
    text: t.quote,
    rating: t.rating,
    gradient: idx % 2 === 0
      ? 'linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)'
      : 'linear-gradient(160deg, #3D1408, #6B2310 40%, #D4880A)',
    tag: 'Verified Patron',
    location: t.detail.includes('·') ? t.detail.split('·')[0].trim() : 'Kolkata, India',
    date: 'Recent Purchase',
    instagramUrl: igUrl,
  }))

  const instaStories: ModalStory[] = rawPosts.map((p, idx) => ({
    id: `insta-${p.img || idx}`,
    type: 'instagram',
    author: p.user || '@sumams.boutique',
    subtitle: 'Atelier Dispatch · Shantiniketan',
    text: p.capt,
    gradient: p.gradient || 'linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)',
    tag: 'Instagram Feed',
    location: 'Shantiniketan Atelier',
    date: 'Studio Journal',
    instagramUrl: igUrl,
  }))

  const allStories = [...reviewStories, ...instaStories]
  const displayedStories =
    filter === 'reviews'
      ? reviewStories
      : filter === 'instagram'
      ? instaStories
      : allStories

  return (
    <section className="py-14 md:py-24 px-5 md:px-[clamp(32px,6vw,85px)] bg-[#FDFBF7] border-t border-[#DCC9A8]/40 relative">
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
            Explore authentic patron reflections and live studio dispatches from our Shantiniketan handloom atelier. Click any review or post to read the full story.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-xs font-sans uppercase tracking-wider transition-all border ${
                filter === 'all'
                  ? 'bg-[#1C0A06] text-ivory border-[#1C0A06] shadow-sm'
                  : 'bg-white text-muted border-[#DCC9A8]/60 hover:text-dark hover:border-copper'
              }`}
            >
              All Stories ({allStories.length})
            </button>
            <button
              onClick={() => setFilter('reviews')}
              className={`px-4 py-1.5 text-xs font-sans uppercase tracking-wider transition-all border ${
                filter === 'reviews'
                  ? 'bg-[#1C0A06] text-ivory border-[#1C0A06] shadow-sm'
                  : 'bg-white text-muted border-[#DCC9A8]/60 hover:text-dark hover:border-copper'
              }`}
            >
              Patron Reviews ({reviewStories.length})
            </button>
            <button
              onClick={() => setFilter('instagram')}
              className={`px-4 py-1.5 text-xs font-sans uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                filter === 'instagram'
                  ? 'bg-[#1C0A06] text-ivory border-[#1C0A06] shadow-sm'
                  : 'bg-white text-muted border-[#DCC9A8]/60 hover:text-dark hover:border-copper'
              }`}
            >
              <InstagramGlyph className="w-3 h-3" />
              Instagram Moments ({instaStories.length})
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stories Grid */}
      <Reveal delay={80}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setActiveStory(story)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveStory(story)
                }
              }}
              className="group relative bg-white border border-[#DCC9A8]/60 hover:border-copper p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-left"
            >
              {/* Type Badge & Meta */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.16em] font-sans px-2 py-0.5 ${
                      story.type === 'instagram'
                        ? 'bg-[#BF5E18]/10 text-copper border border-[#BF5E18]/25'
                        : 'bg-[#1C0A06]/5 text-dark border border-[#1C0A06]/15 font-semibold'
                    }`}
                  >
                    {story.type === 'instagram' && <InstagramGlyph className="w-2.5 h-2.5" />}
                    {story.tag}
                  </span>
                  {story.rating && <Stars rating={story.rating} />}
                </div>

                {/* Visual Accent Banner */}
                {story.type === 'instagram' ? (
                  <div
                    className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-3 flex items-center justify-center"
                    style={{ background: story.gradient }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <span className="font-display text-2xl font-light text-white/90 drop-shadow select-none">
                      সু
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/90 font-sans">
                      <span className="font-medium truncate">@sumams.boutique</span>
                      <InstagramGlyph className="w-3 h-3 shrink-0" />
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1C0A06] text-[#E8D5B0] flex items-center justify-center font-display text-sm shrink-0">
                      {story.author.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-sans text-xs font-semibold text-dark truncate">
                        {story.author}
                      </div>
                      <div className="font-sans text-[10px] text-muted truncate">
                        {story.subtitle}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quote / Caption text */}
                <p className="font-display text-sm font-light leading-relaxed text-dark line-clamp-3">
                  {story.type === 'review' ? `“${story.text}”` : story.text}
                </p>
              </div>

              {/* Bottom prompt */}
              <div className="mt-4 pt-3 border-t border-[#DCC9A8]/30 flex items-center justify-between text-[11px] font-sans text-copper font-medium group-hover:underline">
                <span>Read Full Story</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Interactive Modal Popup */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveStory(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Review and Story Details"
        >
          <div
            className="relative w-full max-w-xl bg-[#FDFBF7] border border-[#DCC9A8] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Author and Close */}
            <div className="p-5 sm:p-6 border-b border-[#DCC9A8]/50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C0A06] text-[#E8D5B0] flex items-center justify-center font-display text-base font-medium shrink-0 shadow-sm">
                  {activeStory.type === 'instagram' ? 'সু' : activeStory.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-base font-medium text-dark">
                      {activeStory.author}
                    </h3>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-copper text-white rounded-full text-[9px]" title="Verified">
                      ✓
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted">
                    {activeStory.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full flex items-center justify-center text-dark/70 hover:text-dark hover:bg-black/5 transition-colors text-lg font-sans"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Story Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-5 flex-1">
              {/* Visual artwork preview */}
              <div
                className="w-full h-44 sm:h-52 rounded-sm overflow-hidden relative flex flex-col justify-between p-4 shadow-inner"
                style={{ background: activeStory.gradient }}
              >
                <div className="flex items-center justify-between text-white/90 text-xs font-sans">
                  <span className="uppercase tracking-widest text-[10px] bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                    {activeStory.tag}
                  </span>
                  <span className="text-[10px] bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                    {activeStory.location}
                  </span>
                </div>

                <div className="text-center select-none">
                  <span className="font-display text-4xl text-white/95 drop-shadow">
                    সু
                  </span>
                  <p className="font-sans text-[11px] text-white/80 tracking-widest uppercase mt-1">
                    Sumam&apos;s Handloom Atelier
                  </p>
                </div>

                <div className="flex items-center justify-between text-white/90 text-xs font-sans">
                  <span className="text-[11px]">{activeStory.date}</span>
                  <InstagramGlyph className="w-4 h-4" />
                </div>
              </div>

              {/* Rating if review */}
              {activeStory.rating && (
                <div className="flex items-center gap-2 pt-1">
                  <Stars rating={activeStory.rating} />
                  <span className="font-sans text-xs text-copper font-medium">
                    5.0 / 5.0 Rating
                  </span>
                </div>
              )}

              {/* Full Text */}
              <div className="space-y-3">
                <blockquote className="font-display text-base sm:text-lg font-light leading-relaxed text-dark">
                  {activeStory.type === 'review' ? `“${activeStory.text}”` : activeStory.text}
                </blockquote>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  Each handloom creation at Sumam&apos;s is handwoven by master artisans across Shantiniketan, Murshidabad, and Bishnupur, preserving the traditional craft heritage of Bengal.
                </p>
              </div>
            </div>

            {/* Bottom Actions Bar with 'Check Our Instagram' Button */}
            <div className="p-4 sm:p-5 border-t border-[#DCC9A8]/60 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-sans uppercase tracking-wider text-muted hover:text-dark transition-colors border border-transparent hover:border-[#DCC9A8]/60"
              >
                Close Preview
              </button>

              <a
                href={activeStory.instagramUrl}
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
