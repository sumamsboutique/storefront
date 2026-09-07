'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart, cartImage } from '@/lib/store'
import { TrashIcon } from '@/components/icons'

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart()

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN')

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[90] bg-[rgba(28,10,6,0.5)] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-[100] flex h-full w-full max-w-[420px] flex-col bg-ivory shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-[rgba(140,106,85,0.25)] px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-copper" />
            <span className="font-ui text-[11px] tracking-[0.18em] text-dark uppercase">
              Shopping Bag · {count()}
            </span>
          </div>
          <button
            onClick={close}
            aria-label="Close bag"
            className="font-ui text-2xl leading-none text-muted"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(191,94,24,0.3)]">
              <svg width="26" height="26" viewBox="0 0 22 22" fill="none" stroke="#BF5E18" strokeWidth="1.2" strokeLinecap="round">
                <path d="M2 2h2.5l2.5 10a1 1 0 001 .8h8a1 1 0 001-.8L19 6H5" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-dark">Your bag is empty</h3>
            <p className="font-ui text-xs font-light text-muted">
              Discover handpicked sarees &amp; jewellery from Bengal.
            </p>
            <Link
              href="/sarees"
              onClick={close}
              className="mt-2 bg-dark px-6 py-3 font-ui text-[10px] font-medium tracking-[0.18em] text-ivory uppercase"
            >
              Shop Sarees
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((line) => {
                const img = cartImage(line)
                return (
                <div key={line.id} className="flex gap-4 border-b border-[rgba(140,106,85,0.2)] py-5">
                  <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-cream" style={{ background: line.gradient }}>
                    {img && <Image fill src={img} alt={line.name} sizes="80px" className="object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-display text-[15px] leading-tight text-dark">{line.name}</div>
                        <div className="mt-0.5 font-ui text-[9px] tracking-[0.1em] text-muted uppercase">{line.label}</div>
                      </div>
                      <button
                        onClick={() => remove(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="text-muted hover:text-copper"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-[rgba(140,106,85,0.35)]">
                        <button onClick={() => setQty(line.id, line.qty - 1)} className="px-2.5 py-1 font-ui text-sm text-dark" aria-label="Decrease quantity">−</button>
                        <span className="px-2 font-ui text-xs text-dark">{line.qty}</span>
                        <button onClick={() => setQty(line.id, line.qty + 1)} className="px-2.5 py-1 font-ui text-sm text-dark" aria-label="Increase quantity">+</button>
                      </div>
                      <span className="font-ui text-sm font-medium text-copper">{line.price}</span>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
            <footer className="border-t border-[rgba(140,106,85,0.25)] px-6 py-5">
              <div className="flex items-center justify-between pb-4">
                <span className="font-ui text-[11px] tracking-[0.18em] text-dark uppercase">Subtotal</span>
                <span className="font-ui text-base font-medium text-dark">{fmt(subtotal())}</span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="block w-full bg-copper py-3.5 text-center font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-3 text-center font-ui text-[10px] font-light text-muted">
                Shipping &amp; taxes calculated at checkout · secure Razorpay/Stripe
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
