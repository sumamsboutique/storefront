'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AlponaMotif } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export type NavItem = {
  label: string
  href: string
  badge?: string | number
  adminOnly?: boolean
  icon: React.ReactNode
}

export function AdminSidebar({
  role = 'admin',
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: {
  role?: 'admin' | 'staff' | 'customer'
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
}) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ),
    },
    {
      label: 'Homepage CMS',
      href: '/admin/content',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: 'Customers & Staff',
      href: '/admin/customers',
      adminOnly: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: 'Discount Coupons',
      href: '/admin/coupons',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6V7z" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <path d="M8 8.5 15.5 16" />
        </svg>
      ),
    },
    {
      label: 'Newsletter',
      href: '/admin/subscribers',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Media Library',
      href: '/admin/media',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      label: 'Store Settings',
      href: '/admin/settings',
      adminOnly: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ]

  const visibleItems = navItems.filter((item) => !(item.adminOnly && role !== 'admin'))

  const content = (
    <aside
      className={cn(
        'flex flex-col h-full bg-dark text-ivory border-r border-[#DCC9A8]/20 transition-all duration-300',
        isCollapsed ? 'w-18' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-5 border-b border-[#DCC9A8]/15">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
          <AlponaMotif size={28} opacity={0.8} className="shrink-0" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-display text-base tracking-wider uppercase text-ivory font-medium">
                Sumam&apos;s
              </span>
              <span className="font-sans text-[9px] tracking-[0.24em] text-gold uppercase">
                Admin CRM
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 text-muted hover:text-ivory transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
        {visibleItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                'group flex items-center gap-3.5 px-3 py-2.5 text-xs font-sans tracking-wide transition-colors relative',
                isActive
                  ? 'bg-copper text-ivory font-medium'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] bg-gold/20 text-gold rounded font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#DCC9A8]/15 text-[11px] font-sans text-muted">
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <span className="capitalize">{role} Portal</span>
            <span className="text-[10px] text-gold/80">v1.0.0</span>
          </div>
        )}
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen sticky top-0 shrink-0">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-dark/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 h-full animate-slide-right">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
