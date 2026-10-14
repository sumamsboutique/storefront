'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getStoreSocials } from '@/lib/settings'
import { WhatsAppGlyph } from '@/components/icons'

// Floating WhatsApp button. Reads the admin store-settings number once
// (server helper has a 60s cache); hidden when unset or on /admin.
export default function WhatsAppFab() {
  const pathname = usePathname()
  const [href, setHref] = useState<string | undefined>()

  useEffect(() => {
    getStoreSocials()
      .then((s) => {
        const raw = s.whatsapp
        if (!raw) return
        if (raw.startsWith('http')) setHref(raw)
        else {
          const digits = raw.replace(/\D/g, '')
          if (digits) setHref(`https://wa.me/${digits}`)
        }
      })
      .catch(() => {})
  }, [])

  if (!href || pathname?.startsWith('/admin')) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppGlyph className="h-7 w-7 text-white" />
    </a>
  )
}
