'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { InstagramGlyph, FacebookGlyph, WhatsAppGlyph, YouTubeGlyph } from '@/components/icons'
import { subscribeNewsletter } from '@/lib/newsletter'
import { getStoreSocials, type StoreSocials } from '@/lib/settings'
import { cn } from '@/lib/cn'
import type { FooterContent } from '@/lib/data'

const FOOTER_SAREES = [
  { label: 'Silk Sarees / সিল্ক শাড়ি', href: '/sarees/silk-sarees' },
  { label: 'Tussar & Ghicha / তসর ও ঘিচা', href: '/sarees/tussar-ghicha-sarees' },
  { label: 'Cotton & Blended / সুতি ও মিশ্র', href: '/sarees/cotton-blended-sarees' },
  { label: 'Printed & Artistic / প্রিন্টেড ও শৈল্পিক', href: '/sarees/printed-artistic-sarees' },
  { label: 'Traditional Weaves / ঐতিহ্যবাহী বুনন', href: '/sarees/traditional-weaves-special-designs' },
]
const FOOTER_HELP = [
  { label: 'Our Story', href: '/story' },
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Care Instructions', href: '/care-instructions' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
]
const PAYMENT_METHODS = ['RAZORPAY', 'VISA', 'MASTERCARD', 'UPI']

const DEFAULT_FOOTER: FooterContent = {
  brand: {
    title: "SUMAM'S BOUTIQUE",
    taglineBn: 'বাংলার ঐতিহ্যের শাড়ি',
    tagline: 'Heritage sarees, curated with love from Bengal.',
  },
  newsletter: {
    title: 'Stay in the Weave',
    body: "Receive stories of new arrivals, weaver's notes, and seasonal lookbooks.",
    noteBn: 'নতুন সংগ্রহের খবর সবার আগে',
  },
  paymentMethods: PAYMENT_METHODS,
  copyright: '© 2026 Sumam’s Boutique · Nagpur, India · Ships Pan-India',
  madeIn: 'Made in Bengal',
  madeInBn: 'বাংলায় তৈরি',
}

const SOCIALS = [
  { label: 'Instagram', Icon: InstagramGlyph, key: 'instagram' as const },
  { label: 'Facebook', Icon: FacebookGlyph, key: 'facebook' as const },
  { label: 'WhatsApp', Icon: WhatsAppGlyph, key: 'whatsapp' as const },
  { label: 'YouTube', Icon: YouTubeGlyph, key: 'youtube' as const },
]

function socialHref(socials: StoreSocials, key: (typeof SOCIALS)[number]['key']): string | undefined {
  const raw = socials[key]
  if (!raw) return undefined
  if (key === 'whatsapp') {
    if (raw.startsWith('http')) return raw
    const digits = raw.replace(/\D/g, '')
    return digits ? `https://wa.me/${digits}` : undefined
  }
  return raw
}

function SocialLink({ Icon, label, href }: { Icon: (p: { className?: string }) => React.ReactNode; label: string; href?: string }) {
  const cls = 'flex h-8 w-8 items-center justify-center'
  const style = { border: '1px solid rgba(212,136,10,0.3)', color: '#8C6A55' }
  if (!href) {
    return (
      <span aria-label={label} className={cls} style={style}>
        <Icon className="w-3.5 h-3.5" />
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls} style={style}>
      <Icon className="w-3.5 h-3.5" />
    </a>
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

function BrandBlock({ footer, socials }: { footer: FooterContent; socials: StoreSocials }) {
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
          <SocialLink key={s.label} Icon={s.Icon as any} label={s.label} href={socialHref(socials, s.key)} />
        ))}
      </div>
    </div>
  )
}

export default function Footer({ footer: footerProp }: { footer?: FooterContent }) {
  const footer = footerProp && footerProp.brand?.title ? footerProp : DEFAULT_FOOTER
  const [socials, setSocials] = useState<StoreSocials>({})
  useEffect(() => {
    getStoreSocials().then(setSocials).catch(() => {})
  }, [])
  return (
    <footer
      className="bg-dark relative overflow-hidden px-5 md:px-[clamp(32px,6vw,85px)] pt-16 md:pt-20 pb-6"
      style={{ borderTop: '1px solid rgba(212,136,10,0.18)' }}
    >
      {/* Watermark logo */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[480px] opacity-[0.07] pointer-events-none z-0 hidden md:block">
        <Image
          src="/logo.png"
          alt=""
          width={761}
          height={306}
          priority={false}
          className="w-full h-auto"
          style={{ filter: 'sepia(1) saturate(3) hue-rotate(-10deg) brightness(0.7)' }}
        />
      </div>

      <div className="relative z-10 md:hidden mx-auto w-full max-w-[1100px]">
        <BrandBlock footer={footer} socials={socials} />
        <div className="my-6" style={{ borderTop: '1px solid rgba(212,136,10,0.15)' }} />
        <Newsletter footer={footer} />
        <div className="mt-8">
          <MobileAccordion />
        </div>
      </div>

      <div className="relative z-10 hidden md:grid mx-auto w-full max-w-[1100px]" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1.4fr', gap: 40 }}>
        <BrandBlock footer={footer} socials={socials} />
        <div>
          <FooterColTitle>Sarees</FooterColTitle>
          {FOOTER_SAREES.map((l) => <FooterLink key={l.label} item={l} />)}
        </div>
        <div>
          <FooterColTitle>Help</FooterColTitle>
          {FOOTER_HELP.map((l) => <FooterLink key={l.label} item={l} />)}
        </div>
        <Newsletter footer={footer} />
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-10 pt-6 md:pb-8 mx-auto w-full max-w-[1100px]" style={{ borderTop: '1px solid rgba(212,136,10,0.15)' }}>
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
