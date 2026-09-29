'use client'

import { useEffect, useState } from 'react'
import {
  getSavedAddresses,
  saveAddress,
  deleteAddress,
  type SavedAddress,
} from '@/lib/account'

const empty = { label: 'Home', name: '', phone: '', email: '', address: '', city: '', pin: '' }

const LABEL = 'font-sans text-[10px] tracking-[0.16em] text-muted uppercase'
const FIELD =
  'mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-sans text-sm text-dark outline-none focus:border-copper'

export default function AddressBook({ email }: { email: string }) {
  const [addresses, setAddresses] = useState<SavedAddress[] | null>(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const load = () => {
    getSavedAddresses().then((res) => {
      if (res.ok) setAddresses(res.data)
      else setError(res.error)
    })
  }

  useEffect(load, [])

  const submit = async () => {
    setError('')
    setSaving(true)
    const res = await saveAddress(form)
    if (res.ok) {
      setForm(empty)
      setShowForm(false)
      load()
    } else {
      setError(res.error)
    }
    setSaving(false)
  }

  const remove = async (id: string) => {
    await deleteAddress(id)
    load()
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-[#DCC9A8] pb-3">
        <h2 className="font-display text-2xl font-light text-dark">Saved addresses</h2>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v)
            setError('')
          }}
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-copper transition-colors hover:text-dark"
        >
          {showForm ? 'Cancel' : '+ New address'}
        </button>
      </div>

      {error && <p className="mt-4 font-sans text-sm text-[#B00020]">{error}</p>}

      {showForm && (
        <form
          className="mt-8 border border-[#DCC9A8] bg-[#FDFBF7] p-6"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={LABEL}>Label</span>
              <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className={FIELD}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="block">
              <span className={LABEL}>Full name</span>
              <input value={form.name} onChange={set('name')} className={FIELD} required />
            </label>
            <label className="block">
              <span className={LABEL}>Phone</span>
              <input value={form.phone} onChange={set('phone')} className={FIELD} required inputMode="tel" autoComplete="tel" />
            </label>
            <label className="block">
              <span className={LABEL}>Email</span>
              <input type="email" value={form.email} onChange={set('email')} className={FIELD} required autoComplete="email" />
            </label>
            <label className="col-span-2 block">
              <span className={LABEL}>Address</span>
              <input value={form.address} onChange={set('address')} className={FIELD} required autoComplete="street-address" />
            </label>
            <label className="block">
              <span className={LABEL}>City</span>
              <input value={form.city} onChange={set('city')} className={FIELD} required autoComplete="address-level2" />
            </label>
            <label className="block">
              <span className={LABEL}>PIN code</span>
              <input value={form.pin} onChange={set('pin')} className={FIELD} required inputMode="numeric" autoComplete="postal-code" />
            </label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-6 border border-dark bg-dark px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-copper hover:bg-copper disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save address'}
          </button>
        </form>
      )}

      {addresses === null && !error && (
        <p className="mt-6 font-sans text-sm font-light text-muted">Loading…</p>
      )}

      {addresses !== null && addresses.length === 0 && !showForm && (
        <p className="mt-6 border border-[#DCC9A8] bg-[#FDFBF7] p-10 text-center font-sans text-sm font-light text-muted">
          You haven&apos;t saved any delivery addresses yet.
        </p>
      )}

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {addresses?.map((a) => (
          <li key={a.id} className="border-b border-[#DCC9A8] pb-5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-sm italic text-copper">{a.label}</span>
              <button
                type="button"
                onClick={() => remove(a.id)}
                className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-[#B00020]"
              >
                Delete
              </button>
            </div>
            <p className="mt-3 font-sans text-sm text-dark">{a.name}</p>
            <p className="mt-1 font-sans text-xs leading-relaxed font-light text-muted">
              {a.address}, {a.city} {a.pin}
            </p>
            <p className="mt-2 font-sans text-xs text-muted">{a.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}