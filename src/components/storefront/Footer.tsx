'use client'

import { useState } from 'react'
import Image from 'next/image'
import { InstagramGlyph, FacebookGlyph, WhatsAppGlyph, YouTubeGlyph } from '@/components/icons'
import { subscribeNewsletter } from '@/lib/newsletter'
import { cn } from '@/lib/cn'
import type { FooterContent } from '@/lib/data'

const FOOTER_SAREES = [
  { label: 'Benarasi / বেনারসি', href: '/sarees?weave=Benarasi' },
  { label: 'Tant / তাঁত', href: '/sarees?weave=Tant' },
  { label: 'Muslin / মসলিন', href: '/sarees?weave=Muslin' },
  { label: 'Kantha / কাঁথা', href: '/sarees?weave=Kantha' },
  { label: 'Silk / সিল্ক', href: '/sarees?weave=Silk' },
  { label: 'Jamdani / জামদানি', href: '/sarees?weave=Jamdani' },
  { label: 'Garad / গরদ', href: '/sarees?weave=Garad' },
]
const FOOTER_JEWELLERY = [
  { label: 'Temple Jewellery / মন্দির গহনা', href: '/jewellery?weave=Temple' },
  { label: 'Contemporary / সমসাময়িক', href: '/jewellery?weave=Contemporary' },
  { label: 'Gold-Plated / সোনার মোড়ক', href: '/jewellery?weave=Gold-Plated' },
  { label: 'Bridal Sets', href: '/jewellery' },
]
const FOOTER_HELP = [
  { label: 'Our Story', href: '/story' },
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Care Instructions', href: '/care-instructions' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
]
const PAYMENT_METHODS = ['RAZORPAY', 'STRIPE', 'VISA', 'MASTERCARD', 'UPI']

const DEFAULT_FOOTER: FooterContent = {
  brand: {
    title: "SUMAM'S BOUTIQUE",
    taglineBn: 'বাংলার ঐতিহ্যের শাড়ি ও গহনা',
    tagline: 'Heritage sarees & jewellery, curated with love from Bengal.',
  },
  newsletter: {
    title: 'Stay in the Weave',
    body: "Receive stories of new arrivals, weaver's notes, and seasonal lookbooks.",
    noteBn: 'নতুন সংগ্রহের খবর সবার আগে',
  },
  paymentMethods: PAYMENT_METHODS,
  copyright: '© 2025 Sumam’s Boutique. All rights reserved.',
  madeIn: 'Made in Bengal',
  madeInBn: 'বাংলায় তৈরি',
}

const SOCIALS = [
  { label: 'Instagram', Icon: InstagramGlyph },
  { label: 'Facebook', Icon: FacebookGlyph },
  { label: 'WhatsApp', Icon: WhatsAppGlyph },
  { label: 'YouTube', Icon: YouTubeGlyph },
]

function SocialLink({ Icon, label }: { Icon: (p: { className?: string }) => React.ReactNode; label: string }) {
  return (
    <span
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center"
      style={{ border: '1px solid rgba(212,136,10,0.3)', color: '#8C6A55' }}
    >
      <Icon className="w-3.5 h-3.5" />
    </span>
  )
}

function FooterLink({ item }: { item: { label: string; href?: string } }) {
  const [hov, setHov] = useState(false)
  if (!item.href) {
    return (
      <span className="block font-sans text-xs mb-2 leading-[1.6]" style={{ color: 'rgba(245,239,230,0.55)' }}>
        {item.label}
      </span>
    )
  }
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="block font-sans text-xs mb-2 no-underline transition-colors duration-200 leading-[1.6]"
      style={{ color: hov ? '#D4880A' : 'rgba(245,239,230,0.55)' }}
    >
      {item.label}
    </a>
  )
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-gold mb-4">{children}</div>
  )
}

function Newsletter({ footer }: { footer: FooterContent }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    const res = await subscribeNewsletter(email)
    if ('error' in res) {
      setDone(false)
      setMsg(res.error)
    } else {
      setDone(true)
      setMsg('Welcome to the weave! Check your inbox.')
    }
  }

  return (
    <div>
      <FooterColTitle>{footer.newsletter.title}</FooterColTitle>
      <p className="font-sans text-xs text-[rgba(245,239,230,0.55)] leading-[1.7] mb-4 max-w-[280px]">
        {footer.newsletter.body}
      </p>
      <form
        onSubmit={submit}
        className="flex items-center gap-3 pb-2"
        style={{ borderBottom: '1px solid rgba(212,136,10,0.30)' }}
      >
        <input
          suppressHydrationWarning
          type="email"
          placeholder="your.email@address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email for newsletter"
          className="flex-1 bg-transparent border-0 outline-none font-sans text-xs text-ivory placeholder:text-muted"
        />
        <button suppressHydrationWarning className="bg-transparent border-0 cursor-pointer text-copper text-base leading-none p-0" aria-label="Subscribe">
          →
        </button>
      </form>
      <div className="mt-2.5 font-bengali text-[11px] font-light text-[rgba(212,136,10,0.50)] tracking-[0.04em]">
        {done ? msg : msg || footer.newsletter.noteBn}
      </div>
    </div>
  )
}

function MobileAccordion() {
  const [open, setOpen] = useState<string>('SAREES')
  const rows: { title: string; items: { label: string; href?: string }[] }[] = [
    { title: 'SAREES', items: FOOTER_SAREES },
    { title: 'JEWELLERY', items: FOOTER_JEWELLERY },
    { title: 'HELP', items: FOOTER_HELP },
  ]
  return (
    <div>
      {rows.map((r) => (
        <div key={r.title} style={{ borderTop: '1px solid rgba(212,136,10,0.15)' }}>
          <div
            onClick={() => setOpen(open === r.title ? '' : r.title)}
            className="flex items-center justify-between py-4 cursor-pointer"
          >
            <span className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-gold">{r.title}</span>
            <span className="font-sans text-sm text-gold opacity-70">{open === r.title ? '−' : '+'}</span>
          </div>
          {open === r.title && (
            <div className="pb-4 flex flex-col gap-3">
              {r.items.map((l) =>
                l.href ? (
                  <a key={l.label} href={l.href} className="font-sans text-[13px] text-[rgba(245,239,230,0.55)] no-underline leading-[1.6]">
                    {l.label}
                  </a>
                ) : (
                  <span key={l.label} className="font-sans text-[13px] text-[rgba(245,239,230,0.55)] leading-[1.6]">
                    {l.label}
                  </span>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function BrandBlock({ footer }: { footer: FooterContent }) {
  return (
    <div>
      <div className="font-display text-[22px] font-semibold tracking-[0.08em] uppercase text-copper mb-1.5">
        {footer.brand.title}
      </div>
      <div className="font-bengali text-xs font-light text-[rgba(212,136,10,0.60)] mb-4 tracking-[0.02em]">
        {footer.brand.taglineBn}
      </div>
      <p className="font-sans text-[11px] italic text-muted leading-[1.7] mb-6 max-w-[260px]">
        {footer.brand.tagline}
      </p>
      <div className="flex gap-3">
        {SOCIALS.map((s) => (
          <SocialLink key={s.label} Icon={s.Icon as any} label={s.label} />
        ))}
      </div>
    </div>
  )
}

export default function Footer({ footer: footerProp }: { footer?: FooterContent }) {
  const footer = footerProp && footerProp.brand?.title ? footerProp : DEFAULT_FOOTER
  return (
    <footer
      className="bg-dark relative overflow-hidden px-5 md:px-[clamp(32px,6vw,85px)] pt-16 md:pt-20 pb-6"
      style={{ borderTop: '1px solid rgba(212,136,10,0.18)' }}
    >
      {/* Watermark logo */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[480px] opacity-[0.07] pointer-events-none z-0 hidden md:block">
        <Image
          src="/logo_transparent.png"
          alt=""
          width={480}
          height={480}
          priority={false}
          style={{ width: '100%', height: 'auto', filter: 'sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.7)' }}
        />
      </div>

      <div className="relative z-10 md:hidden">
        <BrandBlock footer={footer} />
        <div className="my-6" style={{ borderTop: '1px solid rgba(212,136,10,0.15)' }} />
        <Newsletter footer={footer} />
        <div className="mt-8">
          <MobileAccordion />
        </div>
      </div>

      <div className="relative z-10 hidden md:grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.4fr', gap: 40 }}>
        <BrandBlock footer={footer} />
        <div>
          <FooterColTitle>Sarees</FooterColTitle>
          {FOOTER_SAREES.map((l) => <FooterLink key={l.label} item={l} />)}
        </div>
        <div>
          <FooterColTitle>Jewellery</FooterColTitle>
          {FOOTER_JEWELLERY.map((l) => <FooterLink key={l.label} item={l} />)}
        </div>
        <div>
          <FooterColTitle>Help</FooterColTitle>
          {FOOTER_HELP.map((l) => <FooterLink key={l.label} item={l} />)}
        </div>
        <Newsletter footer={footer} />
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-10 pt-6 md:pb-8" style={{ borderTop: '1px solid rgba(212,136,10,0.15)' }}>
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between flex-wrap gap-3">
          <span className="font-sans text-[11px] text-[rgba(245,239,230,0.30)]">
            {footer.copyright}
          </span>
          <span className="font-sans text-[11px] text-[rgba(212,136,10,0.35)]">
            {footer.madeIn} · <span className="font-bengali">{footer.madeInBn}</span>
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {footer.paymentMethods.map((m) => (
              <span
                key={m}
                className="font-sans text-[9px] tracking-[0.16em] uppercase text-[rgba(245,239,230,0.40)] px-2 py-1"
                style={{ border: '0.5px solid rgba(245,239,230,0.25)' }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
