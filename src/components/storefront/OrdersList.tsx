'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { type CustomerOrder } from '@/lib/account'
import { OrderStatusBadge } from '@/components/admin/AdminBadge'
import { useDialog } from '@/lib/dialog'

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')
const ref = (id: string) => id.slice(0, 8).toUpperCase()
const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

function paymentNote(status: string): string {
  switch (status) {
    case 'pending': return 'Payment was not completed for this order.'
    case 'cancelled': return 'This order was cancelled.'
    case 'refunded': return 'This order was refunded.'
    default: return 'Paid securely at checkout.'
  }
}

function OrderCard({ order, onView }: { order: CustomerOrder; onView: () => void }) {
  const count = order.items.reduce((a, i) => a + i.quantity, 0)
  const shown = order.items.slice(0, 3)

  return (
    <article className="flex flex-col gap-5 border border-[#DCC9A8] bg-[#FDFBF7] p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <OrderStatusBadge status={order.status} />
          <p className="mt-2.5 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
            Order #{ref(order.id)} · {longDate(order.created_at)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-light text-dark">{fmt(order.total)}</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <ul className="divide-y divide-[#DCC9A8]/40 border-y border-[#DCC9A8]/40">
        {shown.map((line, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="font-sans text-sm text-dark">
              {line.name} <span className="text-muted">× {line.quantity}</span>
            </span>
            <span className="shrink-0 font-sans text-sm text-dark">{fmt(line.unit_price * line.quantity)}</span>
          </li>
        ))}
        {order.items.length > shown.length && (
          <li className="py-2.5 font-sans text-xs text-muted">
            + {order.items.length - shown.length} more {order.items.length - shown.length === 1 ? 'item' : 'items'}
          </li>
        )}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-sans text-xs text-muted">
          {order.shipping_address.city} {order.shipping_address.pin}
        </p>
        <button
          type="button"
          onClick={onView}
          className="border border-dark bg-dark px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory transition-colors hover:border-copper hover:bg-copper"
        >
          View details
        </button>
      </div>
    </article>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted">{children}</h3>
}

function OrderDetails({
  order,
  open,
  onClose,
}: {
  order: CustomerOrder | null
  open: boolean
  onClose: () => void
}) {
  const panelRef = useDialog<HTMLDivElement>(open, onClose)
  if (!order) return null

  const a = order.shipping_address
  const titleId = `order-details-${order.id}`

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[110] bg-[rgba(28,10,6,0.55)] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed left-1/2 top-1/2 z-[120] flex max-h-[88vh] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 flex-col border border-[#DCC9A8] bg-ivory shadow-2xl transition-[opacity,visibility] duration-200 ${
          open ? 'opacity-100' : 'invisible opacity-0'
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-[#DCC9A8] px-6 py-4">
          <div>
            <h2 id={titleId} className="font-display text-xl font-light text-dark">
              Order #{ref(order.id)}
            </h2>
            <p className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
              {longDate(order.created_at)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="font-ui text-2xl leading-none text-muted transition-colors hover:text-copper"
          >
            ×
          </button>
        </header>

        <div className="space-y-6 overflow-y-auto px-6 py-6">
          <section className="flex flex-wrap items-center gap-3">
            <OrderStatusBadge status={order.status} />
            <p className="font-sans text-xs text-muted">{paymentNote(order.status)}</p>
          </section>

          <section>
            <SectionTitle>Items</SectionTitle>
            <table className="mt-3 w-full border-collapse text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-[#DCC9A8] text-[10px] uppercase tracking-[0.14em] text-muted">
                  <th className="py-2 pr-2 font-normal">Item</th>
                  <th className="py-2 text-center font-normal">Qty</th>
                  <th className="py-2 text-right font-normal">Price</th>
                  <th className="py-2 text-right font-normal">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCC9A8]/50">
                {order.items.map((line, i) => (
                  <tr key={i} className="text-dark">
                    <td className="py-2.5 pr-2">{line.name}</td>
                    <td className="py-2.5 text-center">{line.quantity}</td>
                    <td className="py-2.5 text-right text-muted">{fmt(line.unit_price)}</td>
                    <td className="py-2.5 text-right">{fmt(line.unit_price * line.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="border-t border-[#DCC9A8]/60 pt-4">
            <dl className="space-y-2 font-sans text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-dark">{fmt(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-dark">{order.shipping_fee === 0 ? 'Free' : fmt(order.shipping_fee)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted">Discount{order.coupon_code ? ` (${order.coupon_code})` : ''}</dt>
                  <dd className="text-copper">−{fmt(order.discount)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-[#DCC9A8]/60 pt-3">
                <dt className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted">Total</dt>
                <dd className="font-display text-2xl font-light text-dark">{fmt(order.total)}</dd>
              </div>
            </dl>
          </section>

          <section className="border-t border-[#DCC9A8]/60 pt-4">
            <SectionTitle>Delivery address</SectionTitle>
            <address className="mt-2 font-sans text-sm not-italic leading-relaxed text-dark">
              <div>{a.name}</div>
              <div>{a.address}</div>
              <div>
                {a.city} {a.pin}
              </div>
              {a.phone && <div className="mt-2 text-muted">{a.phone}</div>}
              {a.email && <div className="text-muted">{a.email}</div>}
            </address>
          </section>
        </div>
      </div>
    </>
  )
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
  const [active, setActive] = useState<CustomerOrder | null>(null)
  const [open, setOpen] = useState(false)

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
    <>
      <ol className="space-y-6">
        {orders.map((o) => (
          <li key={o.id}>
            <OrderCard
              order={o}
              onView={() => {
                setActive(o)
                setOpen(true)
              }}
            />
          </li>
        ))}
      </ol>
      <OrderDetails order={active} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
