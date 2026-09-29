'use client'

import Link from 'next/link'
import { customerLogoutAction } from '@/lib/admin/actions'

export default function AccountPanel({ name, email }: { name: string | null; email: string }) {
  const handleSignOut = () => {
    void customerLogoutAction()
  }

  return (
    <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#DCC9A8] bg-[#FDFBF7] p-8 shadow-[0_4px_24px_-8px_rgba(28,10,6,0.12),0_1px_2px_rgba(28,10,6,0.06)] md:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-copper/40 bg-dark shadow-md">
          <span className="font-bengali text-xl font-light text-ivory select-none">সু</span>
        </div>

        <h1 className="font-display text-2xl tracking-tight text-dark md:text-3xl">
          Welcome to <span className="italic text-copper">Sumam&apos;s</span>
        </h1>
        {name && <p className="mt-2 font-ui text-sm font-medium text-dark">{name}</p>}
        {email && <p className="font-ui text-xs text-muted">{email}</p>}
        <p className="mt-1.5 max-w-xs font-ui text-xs font-light text-muted">
          Your patron session is active.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Link
          href="/account/orders"
          className="block w-full rounded-full bg-copper py-3 font-ui text-[11px] font-medium uppercase tracking-wider text-ivory transition-colors hover:bg-dark"
        >
          View Order History
        </Link>
        <Link
          href="/account/addresses"
          className="block w-full rounded-full border border-[rgba(140,106,85,0.3)] py-3 font-ui text-[11px] font-medium uppercase tracking-wider text-dark/80 transition-colors hover:border-copper hover:text-copper"
        >
          Manage Saved Addresses
        </Link>
        <Link
          href="/sarees"
          className="block w-full rounded-full border border-[rgba(140,106,85,0.3)] py-3 font-ui text-[11px] font-medium uppercase tracking-wider text-dark/80 transition-colors hover:border-copper hover:text-copper"
        >
          Browse Saree Collection
        </Link>
        <Link
          href="/wishlist"
          className="block w-full rounded-full border border-[rgba(140,106,85,0.3)] py-3 font-ui text-[11px] font-medium uppercase tracking-wider text-dark/80 transition-colors hover:border-copper hover:text-copper"
        >
          View Saved Wishlist
        </Link>
      </div>

      <div className="mt-6 border-t border-[#DCC9A8]/40 pt-5 text-center">
        <button
          type="button"
          onClick={handleSignOut}
          className="font-ui text-xs text-muted transition-colors hover:text-copper"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}