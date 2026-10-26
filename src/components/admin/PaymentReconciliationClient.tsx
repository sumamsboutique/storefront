'use client'

import { useState, useTransition, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AdminCard } from '@/components/admin/AdminCard'
import { AdminBadge } from '@/components/admin/AdminBadge'
import { useToast } from '@/components/admin/AdminToast'
import { resolvePaymentReconciliation } from '@/lib/admin/actions'
import type { AdminPaymentReconciliation } from '@/lib/admin/queries'

const reasonText: Record<AdminPaymentReconciliation['reason_code'], string> = {
  inventory_unavailable: 'Stock was no longer available when payment was captured.',
  coupon_limit_reached: 'The limited-use coupon was exhausted before payment capture.',
  additional_capture: 'Another payment was captured for an order already under review.',
}

const inr = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

function CaseCard({ item }: { item: AdminPaymentReconciliation }) {
  const [resolution, setResolution] = useState<'fulfilled' | 'refund_recorded'>(
    item.order_status === 'payment_review' ? 'fulfilled' : 'refund_recorded'
  )
  const [note, setNote] = useState('')
  const [refundReference, setRefundReference] = useState('')
  const [pending, startTransition] = useTransition()
  const toast = useToast()
  const router = useRouter()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (note.trim().length < 5) {
      toast.error('Add a short note describing the manual reconciliation.')
      return
    }
    if (resolution === 'refund_recorded' && refundReference.trim().length < 3) {
      toast.error('Enter the Razorpay refund reference.')
      return
    }

    const confirmed = resolution === 'fulfilled'
      ? window.confirm('Confirm the stock is now available. The system will mark this order paid and deduct stock.')
      : window.confirm('Confirm you already completed the refund in Razorpay. This action only records it locally; it does not issue a refund.')
    if (!confirmed) return

    startTransition(async () => {
      const result = await resolvePaymentReconciliation({
        case_id: item.id,
        resolution,
        note,
        refund_reference: resolution === 'refund_recorded' ? refundReference : undefined,
      })
      if (!result.success) {
        toast.error(result.error || 'Could not resolve this payment case.')
        return
      }
      toast.success(resolution === 'fulfilled' ? 'Order fulfilled and stock deducted.' : 'External refund recorded.')
      router.refresh()
    })
  }

  return (
    <AdminCard
      title={`Order #${item.order_id.slice(0, 8).toUpperCase()}`}
      subtitle={`Opened ${new Date(item.created_at).toLocaleString('en-IN')}`}
      action={<AdminBadge variant="danger">Captured payment review</AdminBadge>}
    >
      <div className="grid gap-4 text-sm md:grid-cols-2">
        <div className="space-y-1 text-muted">
          <p><span className="font-medium text-dark">Customer:</span> {item.customer_name}</p>
          <p><span className="font-medium text-dark">Email:</span> {item.customer_email}</p>
          <p><span className="font-medium text-dark">Reason:</span> {reasonText[item.reason_code]}</p>
          <p><span className="font-medium text-dark">Amount:</span> {inr(item.expected_amount_paise)}</p>
          <p><span className="font-medium text-dark">Provider order:</span> <code>{item.provider_order_id}</code></p>
          <p><span className="font-medium text-dark">Payment ID:</span> <code>{item.payment_id || 'Not supplied by provider event'}</code></p>
          <Link href={`/admin/orders/${item.order_id}`} className="inline-block pt-2 text-copper underline">
            Open order details
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-3 border-t border-[#DCC9A8]/50 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted" htmlFor={`resolution-${item.id}`}>
            Resolution
          </label>
          <select
            id={`resolution-${item.id}`}
            value={resolution}
            onChange={(event) => setResolution(event.target.value as typeof resolution)}
            className="w-full border border-[#DCC9A8] bg-white px-3 py-2 text-sm text-dark"
          >
            {item.order_status === 'payment_review' && <option value="fulfilled">Confirm stock and fulfill</option>}
            <option value="refund_recorded">Record completed external refund</option>
          </select>

          {resolution === 'refund_recorded' && (
            <label className="block space-y-1 text-xs text-muted">
              <span>Razorpay refund reference</span>
              <input
                value={refundReference}
                onChange={(event) => setRefundReference(event.target.value)}
                required
                minLength={3}
                maxLength={120}
                className="w-full border border-[#DCC9A8] bg-white px-3 py-2 text-sm text-dark"
              />
            </label>
          )}

          <label className="block space-y-1 text-xs text-muted">
            <span>Staff note</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              required
              minLength={5}
              maxLength={1000}
              rows={3}
              className="w-full border border-[#DCC9A8] bg-white px-3 py-2 text-sm text-dark"
              placeholder="Record the stock check or refund confirmation."
            />
          </label>

          <p className="text-[11px] leading-relaxed text-muted">
            Refunds are not issued by this app. Only record a refund after completing it in Razorpay.
            Fulfillment checks stock again and deducts it in the database.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="border border-dark bg-dark px-4 py-2 text-xs font-medium uppercase tracking-wider text-ivory hover:bg-copper disabled:opacity-60"
          >
            {pending ? 'Saving…' : 'Confirm resolution'}
          </button>
        </form>
      </div>
    </AdminCard>
  )
}

export function PaymentReconciliationClient({ cases }: { cases: AdminPaymentReconciliation[] }) {
  if (!cases.length) {
    return (
      <AdminCard title="No open payment reviews">
        <p className="text-sm text-muted">Captured payments that need manual reconciliation will appear here.</p>
      </AdminCard>
    )
  }

  return (
    <div className="space-y-4">
      {cases.map((item) => <CaseCard key={item.id} item={item} />)}
    </div>
  )
}
