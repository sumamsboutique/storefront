'use client'

import React, { useTransition, useState } from 'react'
import Link from 'next/link'
import { AlponaMotif, Eyebrow } from '@/components/shared/primitives'
import { adminLoginAction } from '@/lib/admin/actions'

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const res = await adminLoginAction(null, formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-[#FDFBF7] border border-[#DCC9A8] rounded-lg p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Alpona Corner */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <AlponaMotif size={64} opacity={0.15} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <Eyebrow label="Boutique Administration" hairline={false} cn="justify-center" />
          <h1 className="font-display text-3xl font-light tracking-wide text-dark mt-1">
            Sign In to <span className="italic text-copper">Admin CRM</span>
          </h1>
          <p className="font-sans text-xs text-muted mt-2">
            Restricted access for Sumam&apos;s Boutique staff and management.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-[#FDF2F0] border border-[#E8A59E] rounded text-xs font-sans text-[#7A1C12]">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@sumamsboutique.com"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DCC9A8]/80 rounded text-sm font-sans text-dark placeholder:text-muted/50 focus:border-copper focus:ring-2 focus:ring-copper/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-white border border-[#DCC9A8]/80 rounded text-sm font-sans text-dark placeholder:text-muted/50 focus:border-copper focus:ring-2 focus:ring-copper/20 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-dark hover:bg-copper text-ivory font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors disabled:opacity-50 mt-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            {isPending ? 'Authenticating...' : 'Enter Admin Panel'}
          </button>
        </form>

        {/* Storefront return link */}
        <div className="mt-8 text-center pt-6 border-t border-[#DCC9A8]/30">
          <Link
            href="/"
            className="font-sans text-xs text-muted hover:text-copper transition-colors"
          >
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  )
}
