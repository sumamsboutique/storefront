'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminCouponRow } from '@/lib/admin/queries'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { ConfirmModal } from '@/components/admin/AdminModal'
import { useToast } from '@/components/admin/AdminToast'
import { saveCoupon, toggleCoupon, deleteCoupon } from '@/lib/admin/actions'

type FormState = {
  code: string
  discount_type: 'percent' | 'amount'
  value: string
  min_subtotal: string
  max_uses: string
  is_active: boolean
  expires_at: string
}

const emptyForm: FormState = {
  code: '',
  discount_type: 'percent',
  value: '',
  min_subtotal: '0',
  max_uses: '',
  is_active: true,
  expires_at: '',
}

export function CouponsManagerClient({ coupons }: { coupons: AdminCouponRow[] }) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<AdminCouponRow | null>(null)
  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const res = await saveCoupon({
        code: form.code,
        discount_type: form.discount_type,
        value: Number(form.value),
        min_subtotal: Number(form.min_subtotal || 0),
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        is_active: form.is_active,
        expires_at: form.expires_at || null,
      })
      if (res.success) {
        success(`Coupon ${form.code.toUpperCase()} created.`)
        setForm(emptyForm)
        router.refresh()
      } else {
        error(res.error || 'Failed to create coupon.')
      }
    })
  }

  const handleToggle = (c: AdminCouponRow) => {
    startTransition(async () => {
      const res = await toggleCoupon(c.id, !c.is_active)
      if (res.success) {
        success(`${c.code} ${c.is_active ? 'deactivated' : 'activated'}.`)
        router.refresh()
      } else {
        error(res.error || 'Failed to update coupon.')
      }
    })
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    startTransition(async () => {
      const res = await deleteCoupon(deleteTarget.id)
      if (res.success) {
        success(`Coupon ${deleteTarget.code} deleted.`)
        setDeleteTarget(null)
        router.refresh()
      } else {
        error(res.error || 'Failed to delete coupon.')
      }
    })
  }

  const now = new Date()
  const expiresSoon = (c: AdminCouponRow) =>
    c.expires_at && new Date(c.expires_at) > now && new Date(c.expires_at) < new Date(now.getTime() + 7 * 86400000)

  return (
    <div className="space-y-4">
      {/* Create Coupon */}
      <form
        onSubmit={handleCreate}
        className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Code</span>
          <input
            value={form.code}
            onChange={set('code')}
            placeholder="WELCOME10"
            className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-mono uppercase focus:outline-none focus:border-copper"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Discount Type</span>
          <select value={form.discount_type} onChange={set('discount_type')} className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper">
            <option value="percent">Percent (%)</option>
            <option value="amount">Fixed (₹)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Value</span>
          <input
            type="number"
            min="1"
            value={form.value}
            onChange={set('value')}
            placeholder="10"
            className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Min Subtotal (₹)</span>
          <input
            type="number"
            min="0"
            value={form.min_subtotal}
            onChange={set('min_subtotal')}
            placeholder="0"
            className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Max Uses</span>
          <input
            type="number"
            min="1"
            value={form.max_uses}
            onChange={set('max_uses')}
            placeholder="Unlimited"
            className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          />
        </label>
        <label className="block">
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Expires</span>
          <input
            type="date"
            value={form.expires_at}
            onChange={set('expires_at')}
            className="mt-1 w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          />
        </label>
        <label className="flex items-end gap-2 pb-1.5">
          <input type="checkbox" checked={form.is_active} onChange={set('is_active')} className="accent-copper" />
          <span className="text-[10px] font-sans uppercase tracking-wider text-muted">Active on create</span>
        </label>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isPending || !form.code.trim() || !form.value}
            className="px-4 py-1.5 bg-copper text-ivory text-xs font-sans font-medium uppercase tracking-wider hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Creating…' : 'Create Coupon'}
          </button>
        </div>
      </form>

      {/* Coupons Table */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 overflow-x-auto shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Discount</th>
              <th className="px-5 py-3">Uses</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC9A8]/30">
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted">
                  No coupons yet. Create the first one above.
                </td>
              </tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id} className="hover:bg-ivory/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-mono font-medium text-dark">{c.code}</div>
                    <div className="text-[10px] text-muted">
                      Min ₹{c.min_subtotal.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-dark font-medium">
                    {c.discount_type === 'percent' ? `${c.value}%` : `₹${c.value.toLocaleString('en-IN')}`}
                  </td>
                  <td className="px-5 py-3.5 text-muted">
                    {c.used_count}
                    {c.max_uses ? ` / ${c.max_uses}` : ''}
                  </td>
                  <td className="px-5 py-3.5 text-[11px] text-muted">
                    {c.expires_at ? new Date(c.expires_at).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Never'}
                    {expiresSoon(c) && (
                      <span className="ml-2"><AdminBadge variant="warning">Expiring soon</AdminBadge></span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminBadge variant={c.is_active ? 'success' : 'danger'}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </AdminBadge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggle(c)}
                        disabled={isPending}
                        className="px-3 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-copper font-medium transition-colors disabled:opacity-50"
                      >
                        {c.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(c)}
                        disabled={isPending}
                        className="px-3 py-1 bg-white border border-[#DCC9A8] hover:border-danger text-muted hover:text-danger font-medium transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs font-sans text-muted px-1">
        {coupons.length} coupon{coupons.length === 1 ? '' : 's'} configured
      </div>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Coupon"
        message={`Delete coupon "${deleteTarget?.code}"? Existing orders keep their discount — only future use is blocked.`}
        confirmLabel="Delete"
        isDanger
        isLoading={isPending}
      />
    </div>
  )
}