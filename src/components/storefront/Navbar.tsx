'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { IconSearch, IconAccount, IconCart, IconMenu } from '@/components/icons'
import { useCart } from '@/lib/store'
import { useDialog } from '@/lib/dialog'
import { useMounted } from '@/lib/useMounted'

const NAV: { label: string; href: string }[] = [
  { label: 'SAREES', href: '/sarees' },
  { label: 'JEWELLERY', href: '/jewellery' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'STORY', href: '/story' },
]

export function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group relative font-sans text-[11px] font-normal tracking-[0.18em] uppercase pb-[3px] text-[rgba(245,239,230,0.70)] transition-colors duration-200 hover:text-gold focus-visible:text-gold"
    >
      {label}
      <span className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </Link>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(open, onClose)
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[90] bg-[rgba(28,10,6,0.5)] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* `invisible` (transitioned, so it lands after the slide) takes the closed
          panel out of the tab order — a hidden menu must not hold focusables. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed left-0 top-0 z-[100] flex h-full w-72 flex-col bg-dark px-8 py-6 transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <button suppressHydrationWarning onClick={onClose} aria-label="Close menu" className="mb-8 self-end font-ui text-2xl leading-none text-gold">
          ×
        </button>
        {NAV.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={onClose}
            className="border-b border-[rgba(212,136,10,0.15)] py-4 font-sans text-[12px] tracking-[0.2em] text-[rgba(245,239,230,0.8)] uppercase"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/wishlist"
          onClick={onClose}
          className="mt-auto font-sans text-[11px] tracking-[0.2em] text-[rgba(212,136,10,0.7)] uppercase"
        >
          Wishlist
        </Link>
      </div>
    </>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const mounted = useMounted()
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0))
  const openCart = useCart((s) => s.open)
  const pathname = usePathname()

  // Route change ⇒ close the menu, so a new page never loads behind an open drawer.
  // Adjusted during render (not in an effect) per React's derived-state pattern.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <>
      <nav aria-label="Main" className="sticky top-0 z-[100] w-full h-16 bg-dark border-b border-[rgba(212,136,10,0.18)] flex items-center px-8">
        {/* LEFT — desktop links */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          {NAV.map((l) => (
            <NavLink key={l.label} label={l.label} href={l.href} />
          ))}
        </div>
        {/* LEFT — mobile hamburger */}
        <div className="flex md:hidden flex-1">
          <button
            suppressHydrationWarning
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="text-[rgba(245,239,230,0.8)]"
          >
            <IconMenu />
          </button>
        </div>

        {/* CENTER — logo */}
        <div className="flex flex-col items-center shrink-0">
          <Link href="/" aria-label="Sumam's Boutique home">
            {/* logo.png is trimmed to the mark's bounds */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Sumam's Boutique"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* RIGHT — icons */}
        <div className="flex items-center gap-4 flex-1 justify-end md:gap-[18px]">
          <Link href="/search" className="flex bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)]" aria-label="Search">
            <IconSearch />
          </Link>
          <Link href="/account" className="hidden md:flex bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)]" aria-label="Account">
            <IconAccount />
          </Link>
          <button suppressHydrationWarning onClick={openCart} className="bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)] relative" aria-label="Open shopping bag">
            <IconCart />
            {mounted && count > 0 && (
              <span className="absolute -top-[5px] -right-[6px] bg-copper text-ivory text-[8px] font-medium w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
