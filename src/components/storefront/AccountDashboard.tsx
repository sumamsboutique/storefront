'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getMyOrders, uploadMyAvatar, removeMyAvatar, type CustomerOrder } from '@/lib/account'
import { customerLogoutAction } from '@/lib/admin/actions'
import { useWishlist } from '@/lib/store'
import { useMounted } from '@/lib/useMounted'
import { Eyebrow } from '@/components/shared/primitives'
import ProfileTab, { type AccountProfile } from './ProfileTab'
import OrdersList from './OrdersList'
import AddressBook from './AddressBook'

export type AccountTab = 'profile' | 'orders' | 'addresses'

// Tabs are links, not state: they work without JS, are shareable, and the
// browser back button behaves. The route validates `?tab` and falls back to profile.
const TABS: { key: AccountTab; ordinal: string; label: string }[] = [
  { key: 'profile', ordinal: 'I', label: 'Profile' },
  { key: 'orders', ordinal: 'II', label: 'Orders' },
  { key: 'addresses', ordinal: 'III', label: 'Addresses' },
]

const LABEL = 'font-sans text-[10px] tracking-[0.16em] text-muted uppercase'
const BRAND = 'সু'

const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

// Cancelled and refunded orders were never paid, so they must not inflate value.
const isPaid = (o: CustomerOrder) => o.status !== 'cancelled' && o.status !== 'refunded'

// Downscale to a square before upload. Two jobs: keeps the payload far under the
// 2 MB bucket limit, and a canvas re-encode drops EXIF (including GPS) that
// phone photos carry.
async function squareJpeg(file: File, size = 512): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const side = Math.min(bitmap.width, bitmap.height)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas unavailable')
  ctx.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size)
  bitmap.close()
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85))
  if (!blob) throw new Error('encode failed')
  return blob
}

function monogram(name: string | null, email: string): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return (email.trim()[0] || BRAND).toUpperCase()
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function Avatar({
  url,
  name,
  email,
  onChanged,
}: {
  url: string | null
  name: string | null
  email: string
  onChanged: (url: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (file: File | undefined) => {
    if (!file) return
    setError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return setError('Use a JPG, PNG or WebP image.')
    }
    setBusy(true)
    try {
      const blob = await squareJpeg(file)
      const res = await uploadMyAvatar({ file: new File([blob], 'avatar.jpg', { type: 'image/jpeg' }) })
      if (!res.ok) setError(res.error)
      else onChanged(res.data.avatarUrl)
    } catch {
      setError('Could not read that image.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const clear = async () => {
    setError('')
    setBusy(true)
    const res = await removeMyAvatar()
    setBusy(false)
    if (!res.ok) return setError(res.error)
    onChanged(null)
  }

  return (
    <div className="relative h-28 w-28 shrink-0">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-copper/30 bg-dark">
        {url ? (
          <Image src={url} alt="" fill sizes="112px" className="object-cover" unoptimized />
        ) : (
          <span aria-hidden className="font-bengali text-4xl font-light text-ivory select-none">
            {monogram(name, email)}
          </span>
        )}
      </div>
      <label
        title={busy ? 'Uploading…' : 'Change photo'}
        className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-copper bg-ivory text-copper transition-colors hover:bg-copper hover:text-ivory"
      >
        <span className="sr-only">Change profile photo</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          className="sr-only"
          onChange={(e) => void pick(e.target.files?.[0])}
        />
      </label>
      {url && !busy && (
        <button
          type="button"
          onClick={() => void clear()}
          className="absolute bottom-0 left-0 h-8 w-8 cursor-pointer rounded-full border border-[#DCC9A8] bg-ivory text-muted transition-colors hover:border-copper hover:text-copper"
        >
          <span className="sr-only">Remove profile photo</span>
          <svg aria-hidden viewBox="0 0 24 24" className="mx-auto h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {error && <p className="absolute top-full left-0 mt-1 w-28 font-sans text-[10px] text-[#B00020]">{error}</p>}
    </div>
  )
}

function LedgerRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
      {items.map((i) => (
        <div key={i.label}>
          <dt className={LABEL}>{i.label}</dt>
          <dd className="mt-1 font-display text-2xl font-light text-dark">{i.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function AccountDashboard({
  tab,
  initialProfile,
}: {
  tab: AccountTab
  initialProfile: AccountProfile
}) {
  const [profile, setProfile] = useState(initialProfile)
  const [orders, setOrders] = useState<CustomerOrder[] | null>(null)
  const [orderError, setOrderError] = useState('')
  const mounted = useMounted()
  const wishlistCount = useWishlist((s) => s.ids.length)

  useEffect(() => {
    getMyOrders().then((res) => {
      if (res.ok) setOrders(res.data)
      else {
        setOrders([])
        setOrderError(res.error)
      }
    })
  }, [])

  const paid = orders?.filter(isPaid) ?? []

  return (
    <div className="mx-auto w-full max-w-[1080px] px-[clamp(20px,6vw,48px)] py-14 md:py-20">
      <Eyebrow label="Your account" />

      <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
        <Avatar
          url={profile.avatarUrl}
          name={profile.fullName}
          email={profile.email}
          onChanged={(avatarUrl) => setProfile((p) => ({ ...p, avatarUrl }))}
        />

        <div>
          <h1 className="font-display text-[clamp(34px,6vw,58px)] leading-[1.05] font-light text-dark">
            {profile.fullName || 'Your account'}
          </h1>
          <p className="mt-3 font-sans text-sm font-light text-muted">{profile.email}</p>
          {profile.createdAt && (
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-muted">
              Patron since {longDate(profile.createdAt)}
            </p>
          )}
          {profile.pendingEmail && (
            <p role="status" className="mt-4 max-w-prose border-l-2 border-copper pl-4 font-sans text-xs leading-relaxed text-muted">
              Email change to <span className="text-copper">{profile.pendingEmail}</span> is
              waiting on your confirmation link.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 border-t border-[#DCC9A8] pt-8">
        <LedgerRow
          items={[
            { label: 'Orders placed', value: orders === null ? '—' : String(paid.length) },
            { label: 'Lifetime value', value: orders === null ? '—' : inr(paid.reduce((a, o) => a + o.total, 0)) },
            { label: 'Sarees saved', value: mounted ? String(wishlistCount) : '—' },
          ]}
        />
      </div>

      <nav aria-label="Account sections" className="mt-14 border-b border-[#DCC9A8]">
        <ul className="-mb-px flex flex-wrap gap-x-8 gap-y-2">
          {TABS.map((t) => {
            const active = t.key === tab
            return (
              <li key={t.key}>
                <Link
                  href={t.key === 'profile' ? '/account' : `/account?tab=${t.key}`}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-baseline gap-2 border-b-2 pb-3 transition-colors ${
                    active
                      ? 'border-copper text-dark'
                      : 'border-transparent text-muted hover:text-copper'
                  }`}
                >
                  <span className={`font-display text-xs italic ${active ? 'text-copper' : 'text-muted/70'}`}>
                    {t.ordinal}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em]">{t.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-12 max-w-[720px]">
        {tab === 'profile' && <ProfileTab profile={profile} onSaved={setProfile} />}
        {tab === 'orders' && <OrdersList orders={orders} error={orderError} email={profile.email} />}
        {tab === 'addresses' && <AddressBook email={profile.email} />}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-[#DCC9A8] pt-8">
        <Link
          href="/sarees"
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark transition-colors hover:text-copper"
        >
          Browse the collection
        </Link>
        <Link
          href="/wishlist"
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-dark transition-colors hover:text-copper"
        >
          Your wishlist
        </Link>
        <button
          type="button"
          onClick={() => void customerLogoutAction()}
          className="ml-auto font-sans text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-copper"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
