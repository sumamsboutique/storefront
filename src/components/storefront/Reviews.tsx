'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { submitReview } from '@/lib/account'
import { useMounted } from '@/lib/useMounted'
import { PAD, AlponaDivider } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

type ReviewRow = {
  id: string
  rating: number
  comment: string
  reviewer_name: string
  created_at: string
}

function Star({ filled, size = 14 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <polygon
        points="10,1.5 12.6,7 18.5,7.6 14.2,11.8 15.4,17.7 10,14.7 4.6,17.7 5.8,11.8 1.5,7.6 7.4,7"
        fill={filled ? '#BF5E18' : 'none'}
        stroke={filled ? '#BF5E18' : 'rgba(140,106,85,0.4)'}
        strokeWidth="1"
      />
    </svg>
  )
}

function Stars({ n, size }: { n: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={n >= i} size={size} />
      ))}
    </span>
  )
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Reviews({ productId }: { productId: string }) {
  const mounted = useMounted()
  const [rows, setRows] = useState<ReviewRow[] | null>(null)
  const [signedIn, setSignedIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [msg, setMsg] = useState('')
  const [pending, setPending] = useState(false)

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase
      .from('reviews')
      .select('id, rating, comment, reviewer_name, created_at')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    if (data) setRows(data as ReviewRow[])
  }

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('reviews')
      .select('id, rating, comment, reviewer_name, created_at')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setRows(data as ReviewRow[])
      })
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session))
  }, [productId])

  const submit = async () => {
    setMsg('')
    if (rating === 0) {
      setMsg('Choose a star rating first.')
      return
    }
    setPending(true)
    const res = await submitReview({ productId, rating, comment })
    if (res.ok) {
      setComment('')
      setRating(0)
      setMsg('Thank you! Your review has been posted.')
      await load()
    } else {
      setMsg(res.error)
    }
    setPending(false)
  }

  if (!mounted || !supabase) return null
  if (rows === null) return null

  const count = rows.length
  const avg = count ? rows.reduce((s, r) => s + r.rating, 0) / count : 0

  return (
    <section className={cn(PAD, 'py-12 lg:py-24')}>
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-7 bg-copper" />
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-copper">Customer Reviews</span>
        </div>
        <h2 className="font-display text-[34px] font-light leading-[1.15] text-dark md:text-[38px]">
          What <em className="text-copper italic">Customers</em> Say
        </h2>
      </div>
      <AlponaDivider />

      <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Summary + form */}
        <div className="lg:flex-[0_0_320px]">
          {count > 0 && (
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-light text-dark">{avg.toFixed(1)}</span>
              <div>
                <Stars n={Math.round(avg)} size={16} />
                <div className="mt-1 font-sans text-[11px] tracking-[0.08em] text-muted">
                  {count} {count === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          )}

          {signedIn ? (
            <div className="mt-8 rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-6">
              <div className="font-ui text-xs font-medium uppercase tracking-[0.16em] text-dark">Write a review</div>
              <div className="mt-3">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Your rating</span>
                <div className="mt-1.5 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button key={i} type="button" onClick={() => setRating(i)} aria-label={`${i} star${i > 1 ? 's' : ''}`}>
                      <Star filled={rating >= i} size={22} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                placeholder="Share your experience with this piece…"
                className="mt-4 w-full resize-none border border-[rgba(140,106,85,0.3)] bg-transparent p-3 font-ui text-sm text-dark outline-none placeholder:text-muted focus:border-copper"
                rows={4}
              />
              <button
                type="button"
                onClick={submit}
                disabled={pending}
                className="mt-4 w-full bg-copper py-3 font-ui text-[11px] font-medium uppercase tracking-[0.16em] text-ivory hover:bg-dark disabled:opacity-50"
              >
                {pending ? 'Posting…' : 'Post Review'}
              </button>
              {msg && (
                <p className={cn('mt-3 font-ui text-xs', msg.startsWith('Thank you') ? 'text-gold' : 'text-[#B00020]')}>
                  {msg}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-8 font-ui text-sm font-light leading-[1.7] text-muted">
              <a href="/account" className="border-b border-copper text-copper">Sign in</a> to share your thoughts
              with other shoppers.
            </p>
          )}
        </div>

        {/* List */}
        {count === 0 ? (
          <div className="flex-1">
            <p className="rounded-2xl border border-dashed border-[rgba(140,106,85,0.35)] p-8 text-center font-ui text-sm font-light text-muted">
              No reviews yet — be the first to share your experience.
            </p>
          </div>
        ) : (
          <ul className="flex-1 space-y-5">
            {rows.map((r) => (
              <li key={r.id} className="rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stars n={r.rating} />
                  <span className="font-ui text-[11px] text-muted">{fmtDate(r.created_at)}</span>
                </div>
                {r.comment && <p className="mt-3 font-ui text-[13px] font-light leading-[1.8] text-dark/85">{r.comment}</p>}
                <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.14em] text-copper">— {r.reviewer_name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}