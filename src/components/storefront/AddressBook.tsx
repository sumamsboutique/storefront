'use client'

import { useEffect, useState } from 'react'
import {
  getSavedAddresses,
  saveAddress,
  deleteAddress,
  type SavedAddress,
} from '@/lib/account'
import { Eyebrow } from '@/components/shared/primitives'

const empty = { label: 'Home', name: '', phone: '', email: '', address: '', city: '', pin: '' }

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
      <Eyebrow label="Your account" />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-light text-dark">Saved Addresses</h1>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v)
            setError('')
          }}
          className="border border-copper px-5 py-2.5 font-ui text-[11px] uppercase tracking-[0.16em] text-copper hover:bg-copper hover:text-ivory"
        >
          {showForm ? 'Cancel' : '+ New Address'}
        </button>
      </div>

      <div className="mt-8">
        {error && <p className="mb-4 font-ui text-sm text-[#B00020]">{error}</p>}

        {showForm && (
          <div className="mb-8 rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-6">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Label</span>
                <select
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Full Name</span>
                <input value={form.name} onChange={set('name')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Phone</span>
                <input value={form.phone} onChange={set('phone')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Email</span>
                <input type="email" value={form.email} onChange={set('email')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
              <label className="col-span-2 block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Address</span>
                <input value={form.address} onChange={set('address')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">City</span>
                <input value={form.city} onChange={set('city')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
              <label className="block">
                <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">PIN Code</span>
                <input value={form.pin} onChange={set('pin')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
              </label>
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="mt-5 bg-copper px-7 py-3 font-ui text-[11px] uppercase tracking-[0.16em] text-ivory disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Address'}
            </button>
          </div>
        )}

        {addresses === null && !error && (
          <p className="font-ui text-sm font-light text-muted">Loading…</p>
        )}

        {addresses !== null && addresses.length === 0 && !showForm && (
          <p className="rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-10 text-center font-ui text-sm font-light text-muted">
            You haven&apos;t saved any delivery addresses yet.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {addresses?.map((a) => (
            <div key={a.id} className="rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-copper/40 px-3 py-1 font-ui text-[10px] uppercase tracking-wider text-copper">
                  {a.label}
                </span>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  className="font-ui text-xs text-muted underline hover:text-[#B00020]"
                >
                  Delete
                </button>
              </div>
              <p className="mt-4 font-ui text-sm font-medium text-dark">{a.name}</p>
              <p className="mt-1 font-ui text-xs font-light leading-relaxed text-muted">
                {a.address}, {a.city} {a.pin}
              </p>
              <p className="mt-2 font-ui text-xs text-muted">{a.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}