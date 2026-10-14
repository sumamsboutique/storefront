'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getMyOrders, uploadMyAvatar, removeMyAvatar, type CustomerOrder } from '@/lib/account'
import { customerLogoutAction } from '@/lib/admin/actions'
import { useWishlist } from '@/lib/store'
import { useMounted } from '@/lib/useMounted'
import ProfileTab, { type AccountProfile } from './ProfileTab'
import OrdersList from './OrdersList'
import AddressBook from './AddressBook'

export type AccountTab = 'profile' | 'orders' | 'addresses'

// Tabs are links, not state: they work without JS, are shareable, and the
// browser back button behaves. The route validates `?tab` and falls back to profile.
const TABS: { key: AccountTab; label: string; description: string }[] = [
  { key: 'profile', label: 'Profile', description: 'Update your name, contact details and password.' },
  { key: 'orders', label: 'Orders', description: 'Every order you have placed — open one for its full breakdown.' },
  { key: 'addresses', label: 'Addresses', description: 'Saved delivery addresses for a faster checkout.' },
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
      <div className="relative h-20 w-20 shrink-0 lg:h-28 lg:w-28">
        {/* relative so the fill Image's containing block is the rounded+overflow-hidden box itself */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-copper/30 bg-dark" style={{ borderRadius: '9999px' }}>
        {url ? (
          <Image src={url} alt="" fill sizes="(min-width: 1024px) 112px, 80px" className="object-cover" unoptimized />
        ) : (
          <span aria-hidden className="font-bengali text-2xl font-light text-ivory select-none lg:text-4xl">
            {monogram(name, email)}
          </span>
        )}
      </div>
      <label
        title={busy ? 'Uploading…' : 'Change photo'}
        className="absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-copper bg-ivory text-copper transition-colors hover:bg-copper hover:text-ivory lg:h-8 lg:w-8"
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
          className="absolute bottom-0 left-0 h-7 w-7 cursor-pointer rounded-full border border-[#DCC9A8] bg-ivory text-muted transition-colors hover:border-copper hover:text-copper lg:h-8 lg:w-8"
        >
          <span className="sr-only">Remove profile photo</span>
          <svg aria-hidden viewBox="0 0 24 24" className="mx-auto h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {error && <p className="absolute top-full left-0 mt-1 w-24 font-sans text-[10px] text-[#B00020] lg:w-28">{error}</p>}
    </div>
  )
}

// Sections are links, not state: they work without JS, are shareable, and the
// browser back button behaves. A persistent rail keeps every section in view.
function SectionNav({ tab }: { tab: AccountTab }) {
  return (
    <nav aria-label="Account sections" className="border-b border-[#DCC9A8] lg:border-b-0">
      <ul className="-mb-px grid grid-cols-3 lg:mb-0 lg:grid-cols-1 lg:gap-1">
        {TABS.map((t) => {
          const active = t.key === tab
          return (
            <li key={t.key}>
              <Link
                href={t.key === 'profile' ? '/account' : `/account?tab=${t.key}`}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-center border-b-2 px-3 py-3.5 font-sans text-[11px] tracking-[0.16em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper lg:justify-start lg:border-b-0 lg:border-l lg:px-4 lg:py-3 ${
                  active
                    ? 'border-copper text-dark lg:border-copper lg:bg-[#FDFBF7] lg:font-medium'
                    : 'border-transparent text-muted hover:text-copper lg:border-transparent lg:hover:bg-[#FDFBF7]/60'
                }`}
              >
                {t.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function StatList({ items }: { items: { label: string; value: string; href?: string }[] }) {
  return (
    <dl className="grid grid-cols-3 gap-x-4 gap-y-4 lg:grid-cols-1">
      {items.map((i) => (
        <div key={i.label}>
          <dt className={LABEL}>{i.label}</dt>
          <dd className="mt-1 font-display text-lg leading-snug font-light text-dark tabular-nums">
            {i.href ? (
              <Link href={i.href} className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper">
                {i.value}
              </Link>
            ) : (
              i.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function SectionHeading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <header className="border-b border-[#DCC9A8] pb-6">
      <h2 id={id} className="font-display text-[26px] leading-tight font-light text-balance text-dark">
        {title}
      </h2>
      <p className="mt-2 max-w-prose font-sans text-sm font-light text-muted">{description}</p>
    </header>
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
    getMyOrders()
      .then((res) => {
        if (res.ok) setOrders(res.data)
        else {
          setOrders([])
          setOrderError(res.error)
        }
      })
      .catch(() => {
        setOrders([])
        setOrderError('Could not load your orders.')
      })
  }, [])

  const paid = orders?.filter(isPaid) ?? []
  const activeSection = TABS.find((t) => t.key === tab) ?? TABS[0]

  return (
    <div className="mx-auto w-full max-w-[1120px] px-[clamp(20px,6vw,48px)] py-12 md:py-20">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-14">
        {/* Identity and every section stay in view on desktop; on mobile they
            stack above the active section. */}
        <aside className="lg:sticky lg:top-24">
          <div className="flex items-center gap-5 lg:block">
            <Avatar
              url={profile.avatarUrl}
              name={profile.fullName}
              email={profile.email}
              onChanged={(avatarUrl) => setProfile((p) => ({ ...p, avatarUrl }))}
            />
            <div className="min-w-0 lg:mt-5">
              <h1 className="font-display text-[26px] leading-tight font-light text-dark lg:text-[32px]">
                {profile.fullName || 'Your account'}
              </h1>
              <p className="mt-1.5 truncate font-sans text-sm font-light text-muted">{profile.email}</p>
              {profile.createdAt && (
                <p className="mt-1 font-sans text-[10px] tracking-[0.18em] text-muted uppercase">
                  Patron since {longDate(profile.createdAt)}
                </p>
              )}
            </div>
          </div>

          {profile.pendingEmail && (
            <p role="status" className="mt-6 border-l border-copper pl-4 font-sans text-xs leading-relaxed text-muted">
              Email change to <span className="text-copper">{profile.pendingEmail}</span> is waiting on your
              confirmation link.
            </p>
          )}

          <div className="mt-7">
            <SectionNav tab={tab} />
          </div>

          <div className="mt-7 border-t border-[#DCC9A8] pt-6">
            <StatList
              items={[
                { label: 'Orders placed', value: orders === null ? '-' : String(paid.length), href: '/account?tab=orders' },
                { label: 'Lifetime value', value: orders === null ? '-' : inr(paid.reduce((a, o) => a + o.total, 0)) },
                { label: 'Sarees saved', value: mounted ? String(wishlistCount) : '-', href: '/wishlist' },
              ]}
            />
          </div>
        </aside>

        <section aria-labelledby={`${tab}-heading`} className="mt-10 min-w-0 lg:mt-0">
          <SectionHeading
            id={`${tab}-heading`}
            title={activeSection.label}
            description={activeSection.description}
          />
          <div className="mt-8">
            {tab === 'profile' && <ProfileTab profile={profile} onSaved={setProfile} />}
            {tab === 'orders' && <OrdersList orders={orders} error={orderError} email={profile.email} />}
            {tab === 'addresses' && <AddressBook email={profile.email} />}
          </div>
        </section>
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
