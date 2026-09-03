'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { placeOrder } from '@/lib/orders'
import { PAD, Eyebrow } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const count = items.reduce((a, i) => a + i.qty, 0)
  const shipping = subtotal() > 10000 || subtotal() === 0 ? 0 : 199
  const total = subtotal() + shipping
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', pin: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    setError('')
    startTransition(async () => {
      const res = await placeOrder({
        address: form,
        items: items.map((i) => ({ product_id: i.productId, quantity: i.qty })),
      })
      if ('orderId' in res) {
        const id = res.orderId
        clear()
        setOrderId(id)
        setPlaced(true)
      } else {
        setError(res.error)
      }
    })
  }

  if (placed) {
    return (
      <div className={cn(PAD, 'py-24 text-center')}>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper text-ivory">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-light text-dark">Thank you, {form.name.split(' ')[0] || 'friend'}.</h1>
        <p className="mx-auto mt-3 max-w-md font-ui text-sm font-light leading-relaxed text-muted">
          Your order is confirmed. We&apos;ll hand-wrap your pieces and dispatch within 48 hours. A
          confirmation has been sent to {form.email || 'your email'}.
        </p>
        {orderId && (
          <p className="mt-3 font-ui text-xs text-copper">Order ID: {orderId}</p>
        )}
        <Link href="/" className="mt-8 inline-block bg-dark px-8 py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="bg-ivory">
      <div className={cn(PAD, 'pt-[26px]')}>
        <Eyebrow label="Secure checkout" hairline={false} />
        <h1 className="mt-2 font-display text-[clamp(30px,4vw,42px)] font-light text-dark">Checkout</h1>
      </div>

      <div className={cn(PAD, 'flex flex-col-reverse gap-10 pb-20 pt-6 md:flex-row')}>
        {/* Order summary */}
        <aside className="w-full md:w-[360px] md:shrink-0">
          <div className="bg-cream p-6">
            <div className="font-ui text-[11px] tracking-[0.18em] text-dark uppercase">Your Order · {count}</div>
            <div className="mt-4 flex flex-col gap-4">
              {items.length === 0 && (
                <p className="font-ui text-sm font-light text-muted">Your bag is empty.</p>
              )}
              {items.map((line) => (
                <div key={line.id} className="flex items-center gap-3">
                  <div className="aspect-[3/4] w-12 shrink-0" style={{ background: line.gradient }} />
                  <div className="flex-1">
                    <div className="font-display text-sm leading-tight text-dark">{line.name}</div>
                    <div className="font-ui text-[10px] text-muted">Qty {line.qty}</div>
                  </div>
                  <span className="font-ui text-sm text-dark">{line.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 border-t border-[rgba(140,106,85,0.2)] pt-4 font-ui text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{fmt(subtotal())}</span></div>
              <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
              <div className="mt-1 flex justify-between border-t border-[rgba(140,106,85,0.2)] pt-3 text-base font-medium text-dark">
                <span>Total</span><span className="text-copper">{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={submit}
              disabled={items.length === 0 || pending}
              className={cn('mt-6 w-full py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] uppercase', items.length === 0 || pending ? 'bg-[rgba(140,106,85,0.3)] text-[rgba(28,10,6,0.4)]' : 'bg-copper text-ivory')}
            >
              {pending ? 'Placing Order…' : `Place Order · ${fmt(total)}`}
            </button>
            {error && <p className="mt-2 text-center font-ui text-xs text-[#B00020]">{error}</p>}
            <p className="mt-3 text-center font-ui text-[10px] font-light text-muted">
              Payment flow mocked for Phase 2 — Razorpay &amp; Stripe come live later.
            </p>
          </div>
        </aside>

        {/* Address form */}
        <div className="flex-1">
          <div className="font-ui text-[11px] tracking-[0.18em] text-dark uppercase">Delivery Address</div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="block">
              <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Full Name</span>
              <input value={form.name} onChange={set('name')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
            </label>
            <label className="block">
              <span className="font-ui text-[10px] tracking-[0.12em] text-muted uppercase">Phone</span>
              <input value={form.phone} onChange={set('phone')} className="mt-1 w-full border-b border-[rgba(140,106,85,0.3)] bg-transparent py-2 font-ui text-sm text-dark outline-none" />
            </label>
            <label className="col-span-2 block">
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
        </div>
      </div>
    </div>
  )
}