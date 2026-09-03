'use client'

import { useState } from 'react'
import { InstagramGlyph } from '@/components/icons'
import { Reveal } from '@/lib/reveal'
import type { InstaContent } from '@/lib/data'

type Post = { img: number; user: string; capt: string; gradient: string }

const IG_URL = 'https://instagram.com/sumams.boutique'

const POSTS: Post[] = [
  { img: 1, user: '@sumams.boutique', capt: 'Benarasi in the morning light #canvas', gradient: 'linear-gradient(145deg,#2A1008,#8B3A14 55%,#BF5E18)' },
  { img: 2, user: '@sumams.boutique', capt: 'Founder Sumam cutting a Tant #weave', gradient: 'linear-gradient(145deg,#F5EFE6,#D4B896 55%,#8C6A55)' },
  { img: 3, user: '@sumams.boutique', capt: 'The Shantiniketan loom at work #loom', gradient: 'linear-gradient(145deg,#EDE3D6,#C4A87A 55%,#6B5238)' },
  { img: 4, user: '@sumams.boutique', capt: 'Brass temple jewellery #heritage', gradient: 'linear-gradient(145deg,#4A2010,#D4880A 55%,#5A2A14)' },
]

function PostThumb({ post, url }: { post: Post; url: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative w-full aspect-square overflow-hidden cursor-pointer block"
      style={{ background: post.gradient }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.35) 0%, transparent 45%)' }} />
      {/* dashed label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-sans text-[8px] tracking-[0.1em] uppercase text-[rgba(245,239,230,0.35)]">
          instagram
        </span>
      </div>
      {/* caption overlay — desktop on hover, mobile always */}
      <div
        className="absolute inset-x-0 bottom-0 p-3 bg-[rgba(28,10,6,0.65)] md:bg-transparent"
        style={{ background: 'linear-gradient(to top, rgba(28,10,6,0.82) 0%, transparent 100%)' }}
      >
        <div className="md:grid md:grid-cols-[auto_1fr] md:items-center md:gap-2.5">
          <InstagramGlyph className="hidden md:block text-ivory shrink-0" />
          <div>
            <div className="font-sans text-[11px] font-medium text-ivory">{post.user}</div>
            <div className="font-sans text-[10px] font-light text-[rgba(245,239,230,0.7)] mt-0.5 leading-snug">
              {post.capt}
            </div>
          </div>
        </div>
      </div>
      {/* desktop overlay toggle */}
      <div
        className="hidden md:block absolute inset-0 bg-[rgba(28,10,6,0.35)] transition-opacity duration-300 pointer-events-none"
        style={{ opacity: hov ? 1 : 0 }}
      />
    </a>
  )
}

export default function InstagramStrip({ data }: { data?: InstaContent }) {
  const posts = data && data.posts && data.posts.length ? data.posts : POSTS
  const handle = data?.handle ?? 'sumams.boutique'
  const url = data?.url ?? IG_URL
  return (
    <section className="py-[52px] md:py-24 px-5 md:px-[clamp(32px,6vw,85px)]" style={{ background: 'repeating-linear-gradient(90deg, rgba(28,10,6,0.025) 0 2px, transparent 2px 6px), #F5EFE6' }}>
      <Reveal>
      <div className="flex items-center justify-center gap-2.5 mb-8 md:mb-12">
        <InstagramGlyph className="text-copper w-5 h-5" />
        <span className="font-sans text-[10px] font-normal tracking-[0.28em] uppercase text-copper py-3">
          Follow @{handle}
        </span>
        <div className="hidden md:block w-7 h-px bg-copper" />
      </div>
      </Reveal>

      <Reveal delay={80}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {posts.map((p) => (
          <PostThumb key={p.img} post={p} url={url} />
        ))}
      </div>
      </Reveal>
    </section>
  )
}
