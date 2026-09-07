'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconSearch, IconAccount, IconCart, IconMenu } from '@/components/icons'
import { cn } from '@/lib/cn'
import { useCart } from '@/lib/store'

const NAV: { label: string; href: string }[] = [
  { label: 'SAREES', href: '/sarees' },
  { label: 'JEWELLERY', href: '/jewellery' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'STORY', href: '/story' },
]

export function NavLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn(
        'relative font-sans text-[11px] font-normal tracking-[0.18em] uppercase pb-[3px] transition-colors duration-200',
        hov ? 'text-gold' : 'text-[rgba(245,239,230,0.70)]'
      )}
    >
      {label}
      <span
        className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left transition-transform duration-200"
        style={{ transform: hov ? 'scaleX(1)' : 'scaleX(0)' }}
      />
    </Link>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[90] bg-[rgba(28,10,6,0.5)] md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        className={`fixed left-0 top-0 z-[100] flex h-full w-72 flex-col bg-dark px-8 py-6 transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
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
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0))
  const openCart = useCart((s) => s.open)

  return (
    <>
      <nav className="sticky top-0 z-[100] w-full h-16 bg-dark border-b border-[rgba(212,136,10,0.18)] flex items-center px-8">
        {/* LEFT — desktop links */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          {NAV.map((l) => (
            <NavLink key={l.label} label={l.label} href={l.href} />
          ))}
        </div>
        {/* LEFT — mobile hamburger */}
        <div className="flex md:hidden flex-1">
          <button suppressHydrationWarning onClick={() => setMenuOpen(true)} aria-label="Open menu" className="text-[rgba(245,239,230,0.8)]">
            <IconMenu />
          </button>
        </div>

        {/* CENTER — logo */}
        <div className="flex flex-col items-center shrink-0">
          <Link href="/" aria-label="Sumam's Boutique home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_transparent.png"
              alt="Sumam's Boutique"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* RIGHT — icons */}
        <div className="flex items-center gap-4 flex-1 justify-end md:gap-[18px]">
          <Link href="/search" className="hidden md:flex bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)]" aria-label="Search">
            <IconSearch />
          </Link>
          <Link href="/account" className="hidden md:flex bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)]" aria-label="Account">
            <IconAccount />
          </Link>
          <button suppressHydrationWarning onClick={openCart} className="bg-none border-0 cursor-pointer p-0 text-[rgba(245,239,230,0.8)] relative" aria-label="Open shopping bag">
            <IconCart />
            {count > 0 && (
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
