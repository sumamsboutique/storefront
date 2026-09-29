'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getMyOrders, type CustomerOrder } from '@/lib/account'
import { Eyebrow } from '@/components/shared/primitives'

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

export default function OrdersList({ email }: { email: string }) {
  const [orders, setOrders] = useState<CustomerOrder[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyOrders().then((res) => {
      if (res.ok) setOrders(res.data)
      else setError(res.error)
    })
  }, [])

  return (
    <div>
      <Eyebrow label="Your account" />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-[clamp(28px,4vw,40px)] font-light text-dark">Order History</h1>
        <p className="font-ui text-xs text-muted">{email}</p>
      </div>

      <div className="mt-8">
        {error && <p className="font-ui text-sm text-[#B00020]">{error}</p>}

        {orders === null && !error && (
          <p className="font-ui text-sm font-light text-muted">Loading your orders…</p>
        )}

        {orders !== null && orders.length === 0 && (
          <div className="rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-10 text-center">
            <p className="font-ui text-sm font-light text-muted">
              No orders yet. When you make a purchase with {email}, it will appear here.
            </p>
            <Link
              href="/sarees"
              className="mt-6 inline-block bg-dark px-7 py-3 font-ui text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
            >
              Start shopping
            </Link>
          </div>
        )}

        {orders !== null && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-display text-lg font-light text-dark">
                    {statusLabel(o.status)}
                  </div>
                  <div className="font-ui text-xs text-muted">
                    {new Date(o.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </div>
                </div>

                <ul className="mt-4 divide-y divide-[#DCC9A8]/40">
                  {o.items.map((line, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5">
                      <span className="font-ui text-sm text-dark">
                        {line.name} <span className="text-muted">× {line.quantity}</span>
                      </span>
                      <span className="font-ui text-sm text-dark">{fmt(line.unit_price * line.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 font-ui text-xs text-muted">
                  <span className="inline-block w-32">Shipping</span>
                  <span className="text-dark">{o.shipping_fee === 0 ? 'Free' : fmt(o.shipping_fee)}</span>
                  {o.discount > 0 && (
                    <div className="mt-1">
                      <span className="inline-block w-32">Coupon</span>
                      <span className="text-copper">−{fmt(o.discount)}{o.coupon_code ? ` (${o.coupon_code})` : ''}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[#DCC9A8]/50 pt-3">
                  <span className="font-ui text-xs uppercase tracking-wider text-muted">Total</span>
                  <span className="font-display text-xl font-light text-dark">{fmt(o.total)}</span>
                </div>

                <p className="mt-3 font-ui text-xs font-light text-muted">
                  {o.shipping_address.address}, {o.shipping_address.city} {o.shipping_address.pin}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}