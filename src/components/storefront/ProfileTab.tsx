'use client'

import { useState } from 'react'
import { updateMyProfile, changeMyPassword, requestEmailChange } from '@/lib/account'

export type AccountProfile = {
  fullName: string | null
  email: string
  phone: string | null
  avatarUrl: string | null
  createdAt: string | null
  pendingEmail: string | null
}

// Warm browns held at >= 4.5:1 on ivory (5.4:1) and >= 3:1 for field borders
// (3.4:1), so labels, hints and the input edge are all actually readable.
const INK = '#7A5A46'
const LINE = '#9C7B62'
const DANGER = '#A31621'

const FIELD =
  'w-full border border-[#9C7B62] bg-white px-3.5 py-2.5 font-sans text-sm text-dark shadow-[inset_0_1px_2px_rgba(28,10,6,0.05)] outline-none transition-colors duration-150 placeholder:text-[#7A5A46] hover:border-[#7A5A46] focus:border-copper focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-copper caret-copper selection:bg-copper/20 [&:-webkit-autofill]:[-webkit-text-fill-color:#1C0A06] [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_white_inset]'
const LABEL = 'block font-sans text-[11px] font-medium tracking-[0.14em] text-[#7A5A46] uppercase'
const HINT = 'mt-1.5 font-sans text-[11px] leading-relaxed text-[#7A5A46]'
const BTN =
  'border border-[#9C7B62] bg-white px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-dark transition-colors duration-150 hover:border-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:border-[#9C7B62] disabled:bg-transparent disabled:text-[#7A5A46]'
const PROSE = 'max-w-[68ch] font-sans text-[13px] leading-relaxed text-[#7A5A46]'

function Chevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180"
    >
      <path
        d="M4 6.25 8 10.25l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <path
        d="M3 8.5l3.25 3.25L13 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Label, control, and hint stack as one unit so the label is never orphaned
 *  from the field it names. `id` wires up hint/error text for screen readers. */
function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && (
        <p id={`${id}-hint`} className={HINT}>
          {hint}
        </p>
      )}
    </div>
  )
}

/** Errors sit directly above the button that produced them, so the message and
 *  its recovery are read together. `alert` interrupts; `status` does not. */
function Message({ tone, children }: { tone: 'ok' | 'bad'; children: React.ReactNode }) {
  return (
    <p
      role={tone === 'bad' ? 'alert' : 'status'}
      className={
        tone === 'bad'
          ? 'flex items-start gap-2 border border-[#A31621] bg-white px-3.5 py-2.5 font-sans text-[12px] leading-relaxed text-[#A31621]'
          : 'flex items-center gap-2 border border-[#9C7B62] bg-white px-3.5 py-2.5 font-sans text-[12px] text-dark'
      }
    >
      {tone === 'ok' && <span className="text-copper"><Tick /></span>}
      {children}
    </p>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-light text-dark">{title}</h2>
      {note && <p className={`mt-2.5 ${PROSE}`}>{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** Native <details> so the collapsed sections are keyboard-operable, announced by
 *  screen readers, and work without JS. No open/close state of our own. */
function Disclosure({
  title,
  summary,
  children,
}: {
  title: string
  summary: string
  children: React.ReactNode
}) {
  return (
    <details className="group border-t border-[#DCC9A8] pt-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-display text-xl font-light text-dark">{title}</span>
          <span className={`mt-1 block ${PROSE}`}>{summary}</span>
        </span>
        <span className="text-dark">
          <Chevron />
        </span>
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  )
}

function Details({ profile, onSaved }: { profile: AccountProfile; onSaved: (p: AccountProfile) => void }) {
  const [name, setName] = useState(profile.fullName ?? '')
  const [tel, setTel] = useState(profile.phone ?? '')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  const dirty = name !== (profile.fullName ?? '') || tel !== (profile.phone ?? '')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setError('')
        setSaved(false)
        setBusy(true)
        const res = await updateMyProfile({ fullName: name, phone: tel })
        setBusy(false)
        if (!res.ok) return setError(res.error)
        onSaved({ ...profile, fullName: res.data.full_name, phone: res.data.phone })
        setSaved(true)
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="pf-name" label="Full name">
          <input
            id="pf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            aria-describedby="pf-name-hint"
            className={FIELD}
          />
        </Field>
        <Field id="pf-phone" label="Phone" hint="Used by the courier for delivery updates.">
          <input
            id="pf-phone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
            inputMode="tel"
            autoComplete="tel"
            aria-describedby="pf-phone-hint"
            className={FIELD}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button type="submit" disabled={busy || !dirty} className={BTN}>
          {busy ? 'Saving…' : 'Save details'}
        </button>
        {!dirty && !busy && <span className="font-sans text-[11px] text-[#7A5A46]">No changes yet</span>}
      </div>
      {error && <div className="mt-4"><Message tone="bad">{error}</Message></div>}
      {saved && !error && <div className="mt-4"><Message tone="ok">Details saved.</Message></div>}
    </form>
  )
}

function Email({ profile }: { profile: AccountProfile }) {
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setError('')
        setSent(false)
        setBusy(true)
        const res = await requestEmailChange({ currentPassword: password, newEmail })
        setBusy(false)
        if (!res.ok) return setError(res.error)
        setNewEmail('')
        setPassword('')
        setSent(true)
      }}
    >
      <p className={PROSE}>
        Your address today is <span className="text-dark">{profile.email}</span>. We send a
        confirmation link, and the address only changes once you open it — so your order history
        never breaks.
      </p>

      {profile.pendingEmail && (
        <div className="mt-4">
          <Message tone="ok">
            Confirmation still pending for{' '}
            <span className="font-medium">{profile.pendingEmail}</span>. Open the link we sent, or
            request a fresh one below.
          </Message>
        </div>
      )}

      <div className="mt-6 max-w-md space-y-5">
        <Field id="pf-new-email" label="New email">
          <input
            id="pf-new-email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD}
          />
        </Field>
        <Field
          id="pf-email-password"
          label="Current password"
          hint="Confirms it is really you before we send anything."
        >
          <input
            id="pf-email-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-describedby="pf-email-password-hint"
            className={FIELD}
          />
        </Field>
      </div>

      <button type="submit" disabled={busy} className={`${BTN} mt-6`}>
        {busy ? 'Sending…' : 'Send confirmation link'}
      </button>
      {error && <div className="mt-4 max-w-md"><Message tone="bad">{error}</Message></div>}
      {sent && !error && (
        <div className="mt-4 max-w-md"><Message tone="ok">Check your inbox to confirm.</Message></div>
      )}
    </form>
  )
}

function Password() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  // Mirrors the zod schema so the mismatch is caught before a round trip.
  const mismatch = confirm.length > 0 && next !== confirm
  const tooShort = next.length > 0 && next.length < 8

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setError('')
        setDone(false)
        setBusy(true)
        const res = await changeMyPassword({
          currentPassword: current,
          newPassword: next,
          confirmPassword: confirm,
        })
        setBusy(false)
        if (!res.ok) return setError(res.error)
        setCurrent('')
        setNext('')
        setConfirm('')
        setDone(true)
      }}
    >
      <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id="pw-current" label="Current password">
            <input
              id="pw-current"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              autoComplete="current-password"
              className={FIELD}
            />
          </Field>
        </div>
        <Field id="pw-new" label="New password" hint="At least 8 characters.">
          <input
            id="pw-new"
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            aria-invalid={tooShort || undefined}
            aria-describedby="pw-new-hint"
            className={`${FIELD} ${tooShort ? 'border-[#A31621]' : ''}`}
          />
        </Field>
        <Field
          id="pw-confirm"
          label="Confirm new password"
          hint={mismatch ? 'These two do not match yet.' : undefined}
        >
          <input
            id="pw-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            aria-invalid={mismatch || undefined}
            aria-describedby={mismatch ? 'pw-confirm-hint' : undefined}
            className={`${FIELD} ${mismatch ? 'border-[#A31621]' : ''}`}
          />
        </Field>
      </div>

      <button type="submit" disabled={busy || mismatch || tooShort} className={`${BTN} mt-6`}>
        {busy ? 'Updating…' : 'Update password'}
      </button>
      {error && <div className="mt-4 max-w-md"><Message tone="bad">{error}</Message></div>}
      {done && !error && (
        <div className="mt-4 max-w-md"><Message tone="ok">Password updated.</Message></div>
      )}
    </form>
  )
}

export default function ProfileTab({
  profile,
  onSaved,
}: {
  profile: AccountProfile
  onSaved: (p: AccountProfile) => void
}) {
  return (
    <div className="max-w-[760px] space-y-12">
      <Section title="Your details" note="Goes on your invoices and delivery notes.">
        <Details profile={profile} onSaved={onSaved} />
      </Section>

      <Disclosure
        title="Email address"
        summary={
          profile.pendingEmail
            ? `Pending confirmation for ${profile.pendingEmail}`
            : `Signed in as ${profile.email}`
        }
      >
        <Email profile={profile} />
      </Disclosure>

      <Disclosure title="Password" summary="Change the password you sign in with.">
        <Password />
      </Disclosure>
    </div>
  )
}
