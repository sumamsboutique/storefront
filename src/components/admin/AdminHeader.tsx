'use client'

import React from 'react'
import Link from 'next/link'
import { adminLogoutAction } from '@/lib/admin/actions'
import { RoleBadge } from './AdminBadge'

export function AdminHeader({
  userName,
  userRole = 'admin',
  onOpenMobile,
}: {
  userName?: string | null
  userRole?: string
  onOpenMobile: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[#FDFBF7] border-b border-[#DCC9A8]/50 shadow-[0_1px_2px_rgba(28,10,6,0.02)]">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobile}
          className="md:hidden p-2 text-dark hover:text-copper transition-colors"
          aria-label="Open sidebar navigation"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <span className="font-display text-lg tracking-wide font-light text-dark hidden sm:inline">
          Sumam&apos;s Boutique <span className="text-copper italic">Management</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Customer storefront preview link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider text-muted hover:text-copper border border-[#DCC9A8]/60 hover:border-copper transition-colors"
        >
          <span>Storefront</span>
          <span className="text-copper">↗</span>
        </Link>

        {/* User profile & Role pill */}
        <div className="hidden sm:flex items-center gap-2 border-l border-[#DCC9A8]/40 pl-4">
          <div className="flex flex-col text-right">
            <span className="text-xs font-sans font-medium text-dark">
              {userName || 'Boutique Staff'}
            </span>
          </div>
          <RoleBadge role={userRole} />
        </div>

        {/* Sign Out Button */}
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="p-1.5 text-xs font-sans text-muted hover:text-[#A62719] transition-colors"
            title="Sign out of admin"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
