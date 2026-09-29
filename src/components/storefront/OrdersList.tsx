'use client'

import Link from 'next/link'
import { type CustomerOrder } from '@/lib/account'

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

function statusLabel(status: string): string {
  switch (status) {
    case 'pending': return 'Payment pending'
    case 'paid': return 'Confirmed'
    case 'shipped': return 'Dispatched'
    case 'delivered': return 'Delivered'
    case 'cancelled': return 'Cancelled'
    case 'refunded': return 'Refunded'
    default: return status
  }
}

export default function OrdersList({
  orders,
  error,
  email,
}: {
  orders: CustomerOrder[] | null
  error: string
  email: string
}) {
  if (error) return <p className="font-sans text-sm text-[#B00020]">{error}</p>

  if (orders === null) {
    return <p className="font-sans text-sm font-light text-muted">Loading your orders…</p>
  }

  if (orders.length === 0) {
    return (
      <div className="border border-[#DCC9A8] bg-[#FDFBF7] p-10 text-center">
        <p className="font-sans text-sm leading-relaxed font-light text-muted">
          No orders yet. When you make a purchase with {email}, it will appear here.
        </p>
        <Link
          href="/sarees"
          className="mt-6 inline-block border border-dark bg-dark px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-copper hover:border-copper"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <ol className="space-y-10">
      {orders.map((o) => (
        <li key={o.id} className="border-b border-[#DCC9A8] pb-8 last:border-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-light text-dark">{statusLabel(o.status)}</h3>
            <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
              {new Date(o.created_at).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>

          <ul className="mt-4 divide-y divide-[#DCC9A8]/40">
            {o.items.map((line, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <span className="font-sans text-sm text-dark">
                  {line.name} <span className="text-muted">× {line.quantity}</span>
                </span>
                <span className="font-sans text-sm text-dark">{fmt(line.unit_price * line.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-sans text-xs text-muted">
            <div className="flex gap-6">
              <span className="w-24 shrink-0 uppercase tracking-[0.12em]">Shipping</span>
              <span className="text-dark">{o.shipping_fee === 0 ? 'Free' : fmt(o.shipping_fee)}</span>
            </div>
            {o.discount > 0 && (
              <div className="mt-1 flex gap-6">
                <span className="w-24 shrink-0 uppercase tracking-[0.12em]">Coupon</span>
                <span className="text-copper">
                  −{fmt(o.discount)}{o.coupon_code ? ` (${o.coupon_code})` : ''}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-[#DCC9A8]/60 pt-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">Total</span>
            <span className="font-display text-2xl font-light text-dark">{fmt(o.total)}</span>
          </div>

          <p className="mt-3 max-w-prose font-sans text-xs leading-relaxed font-light text-muted">
            {o.shipping_address.address}, {o.shipping_address.city} {o.shipping_address.pin}
          </p>
        </li>
      ))}
    </ol>
  )
}