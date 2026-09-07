'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminCard } from '@/components/admin/AdminCard'
import { OrderStatusBadge } from '@/components/admin/AdminBadge'
import { ConfirmModal } from '@/components/admin/AdminModal'
import { useToast } from '@/components/admin/AdminToast'
import { updateOrderStatus } from '@/lib/admin/actions'
import { VALID_ORDER_TRANSITIONS, type OrderStatus } from '@/lib/admin/schemas'

export type OrderDetailProps = {
  order: {
    id: string
    created_at: string
    updated_at: string
    status: string
    subtotal: number
    shipping_fee: number
    total: number
    payment_provider?: string | null
    payment_reference?: string | null
    shipping_address?: Record<string, string> | null
    staff_notes?: string | null
    order_items?: {
      id: string
      product_name_snapshot: string
      quantity: number
      unit_price: number
    }[]
    profiles?: {
      full_name?: string | null
      email?: string | null
      phone?: string | null
    } | null
  }
}

export function OrderDetailClient({ order }: OrderDetailProps) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  const [notes, setNotes] = useState(order.staff_notes || '')
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null)

  const currentStatus = order.status as OrderStatus
  const allowedTransitions = VALID_ORDER_TRANSITIONS[currentStatus] || []

  const handleStatusChange = (newStatus: OrderStatus) => {
    setPendingStatus(newStatus)
  }

  const handleConfirmTransition = () => {
    if (!pendingStatus) return
    startTransition(async () => {
      const res = await updateOrderStatus({
        order_id: order.id,
        status: pendingStatus,
        staff_notes: notes.trim(),
      })
      if (res.success) {
        success(`Order status moved to "${pendingStatus}".`)
        setPendingStatus(null)
        router.refresh()
      } else {
        error(res.error || 'Failed to update order status.')
      }
    })
  }

  const handleSaveNotesOnly = () => {
    startTransition(async () => {
      const res = await updateOrderStatus({
        order_id: order.id,
        status: currentStatus,
        staff_notes: notes.trim(),
      })
      if (res.success) {
        success('Staff notes updated.')
        router.refresh()
      } else {
        error(res.error || 'Failed to save notes.')
      }
    })
  }

  const addr = order.shipping_address || {}
  const items = order.order_items || []

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCC9A8]/40 pb-4">
        <div>
          <Link
            href="/admin/orders"
            className="text-xs font-sans text-muted hover:text-dark transition-colors block mb-1"
          >
            ← Back to Orders List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-normal text-dark font-mono">
              Order #{order.id.slice(0, 8)}
            </h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-xs font-sans text-muted mt-1">
            Placed on{' '}
            {new Date(order.created_at).toLocaleString('en-IN', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </p>
        </div>

        {/* Status Transition Workflow Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {allowedTransitions.map((nextStatus) => (
            <button
              key={nextStatus}
              onClick={() => handleStatusChange(nextStatus)}
              disabled={isPending}
              className={`px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 ${
                nextStatus === 'cancelled' || nextStatus === 'refunded'
                  ? 'bg-white border border-[#A62719] text-[#A62719] hover:bg-[#A62719] hover:text-white'
                  : 'bg-copper hover:bg-[#A04A18] text-ivory'
              }`}
            >
              Mark as {nextStatus}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Items & Financials */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Items Table */}
          <AdminCard title="Ordered Items">
            <div className="overflow-x-auto -mx-6 -my-6">
              <table className="w-full text-left font-sans text-xs">
                <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3">Product Description</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-right">Unit Price</th>
                    <th className="px-6 py-3 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCC9A8]/30">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center text-muted">
                        No line items recorded for this order.
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.id} className="hover:bg-ivory/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-dark">
                          {item.product_name_snapshot}
                        </td>
                        <td className="px-6 py-4 text-center text-dark">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-muted">
                          ₹{Number(item.unit_price).toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-dark">
                          ₹{(Number(item.unit_price) * item.quantity).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </AdminCard>

          {/* Payment & Financial Summary */}
          <AdminCard title="Financial Summary">
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₹{Number(order.subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping & Express Handling</span>
                <span>
                  {Number(order.shipping_fee) === 0
                    ? 'Free'
                    : `₹${Number(order.shipping_fee || 0).toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#DCC9A8]/40 text-sm font-medium text-dark">
                <span>Total Amount</span>
                <span>₹{Number(order.total || 0).toLocaleString('en-IN')}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#DCC9A8]/40 text-[11px] text-muted space-y-1">
                <div>
                  <span className="font-medium text-dark">Payment Provider:</span>{' '}
                  {order.payment_provider || 'Not yet recorded (Guest Checkout)'}
                </div>
                <div>
                  <span className="font-medium text-dark">Transaction Ref:</span>{' '}
                  <span className="font-mono">{order.payment_reference || 'Pending payment'}</span>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Internal Staff Notes */}
          <AdminCard
            title="Internal Staff Notes"
            subtitle="Private notes for packaging staff, tracking numbers, or customer communication."
          >
            <div className="space-y-3">
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Dispatched via Bluedart AWB# 12345678. Customer requested gold gift wrapping."
                className="w-full px-3 py-2 text-xs border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotesOnly}
                  disabled={isPending}
                  className="px-4 py-1.5 bg-dark text-ivory text-xs font-sans font-medium uppercase tracking-wider hover:bg-copper transition-colors disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Right 1 Col: Customer & Shipping Destination */}
        <div className="space-y-6">
          <AdminCard title="Customer Details">
            <div className="space-y-3 font-sans text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                  Name
                </span>
                <span className="font-medium text-dark">
                  {order.profiles?.full_name || addr.name || 'Guest Customer'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                  Email
                </span>
                <span className="text-dark">
                  {order.profiles?.email || addr.email || '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                  Phone Number
                </span>
                <span className="text-dark font-mono">
                  {order.profiles?.phone || addr.phone || '—'}
                </span>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Delivery Address">
            <div className="font-sans text-xs text-dark space-y-1 leading-relaxed">
              <div className="font-medium">{addr.name || 'Customer'}</div>
              <div>{addr.address || 'Address not provided'}</div>
              <div>
                {addr.city ? `${addr.city}, ` : ''}
                {addr.pin ? `PIN: ${addr.pin}` : ''}
              </div>
              {addr.phone && (
                <div className="pt-2 text-muted">Contact: {addr.phone}</div>
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Confirmation Modal for status transition */}
      <ConfirmModal
        isOpen={pendingStatus !== null}
        onClose={() => setPendingStatus(null)}
        onConfirm={handleConfirmTransition}
        title="Confirm Order Status Transition"
        message={`Are you sure you want to transition this order from "${currentStatus}" to "${pendingStatus}"?`}
        confirmLabel={`Move to ${pendingStatus}`}
        isDanger={pendingStatus === 'cancelled' || pendingStatus === 'refunded'}
        isLoading={isPending}
      />
    </div>
  )
}
