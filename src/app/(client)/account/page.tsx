'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider, AlponaMotif } from '@/components/shared/primitives'

export default function Account() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-ivory flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        {/* X.com Inspired Centered Card */}
        <div className="relative w-full max-w-[440px] bg-[#FDFBF7] border border-[#DCC9A8] rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_-8px_rgba(28,10,6,0.12),0_1px_2px_rgba(28,10,6,0.06)] overflow-hidden">
          {/* Subtle Decorative Background Motif */}
          <div className="absolute top-2 right-2 pointer-events-none">
            <AlponaMotif size={80} opacity={0.12} />
          </div>

          {/* Centered Brand Emblem (like X's centered icon) */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center shadow-md mb-5 border border-copper/40">
              <span className="font-bengali text-xl font-light text-ivory select-none">
                সু
              </span>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-normal text-dark tracking-tight">
              Sign in to <span className="italic text-copper">Sumam&apos;s</span>
            </h1>
            <p className="font-ui text-xs text-muted mt-1.5 max-w-xs font-light">
              Access your patron orders, bespoke draping requests, and saved wishlist.
            </p>
          </div>

          {/* X.com-Style Pill OAuth Buttons */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => alert('Social sign-in will be linked with your Supabase credentials in the next release.')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-white hover:bg-cream border border-[rgba(140,106,85,0.35)] text-dark font-ui text-xs font-medium transition-all duration-200 hover:shadow-sm group cursor-pointer"
            >
              {/* Google G SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 6.3 10.1 6.3z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Apple ID authentication will be available in the upcoming release.')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-dark hover:bg-[#2A0D06] text-ivory font-ui text-xs font-medium transition-all duration-200 shadow-sm group cursor-pointer"
            >
              {/* Apple SVG */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.06 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* X.com Style Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[rgba(140,106,85,0.25)]" />
            <span className="font-ui text-[11px] text-muted uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-[rgba(140,106,85,0.25)]" />
          </div>

          {/* Credential Form */}
          {submitted ? (
            <div className="p-4 bg-cream border border-copper/40 rounded-xl text-center space-y-2 animate-fadeIn">
              <div className="font-ui text-xs font-semibold text-copper uppercase tracking-wider">
                Patron Access Verified
              </div>
              <p className="font-ui text-xs text-dark/80 font-light leading-relaxed">
                Welcome back to Sumam&apos;s Boutique. Your session is active.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/sarees"
                  className="w-full py-2 bg-copper text-ivory font-ui text-[11px] font-medium rounded-full uppercase tracking-wider"
                >
                  Browse Saree Collection
                </Link>
                <Link
                  href="/wishlist"
                  className="font-ui text-xs text-muted hover:text-dark underline"
                >
                  View Saved Wishlist
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Phone, email, or patron ID"
                  className="w-full px-4 py-3 bg-white border border-[rgba(140,106,85,0.35)] rounded-full text-xs font-ui text-dark placeholder:text-muted/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white border border-[rgba(140,106,85,0.35)] rounded-full text-xs font-ui text-dark placeholder:text-muted/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none transition-all"
                />
              </div>

              {/* Main Pill Action Button (X.com Style) */}
              <button
                type="submit"
                className="w-full py-3.5 bg-dark hover:bg-copper text-ivory font-ui text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => alert('Password recovery email instructions will be dispatched to your registered address.')}
                className="w-full py-2.5 border border-[rgba(140,106,85,0.3)] hover:border-copper rounded-full text-xs font-ui text-dark/80 hover:text-copper transition-colors"
              >
                Forgot password?
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-[#DCC9A8]/40 text-center space-y-2">
            <p className="font-ui text-xs text-muted">
              Don&apos;t have an account?{' '}
              <Link href="/contact" className="text-copper hover:underline font-medium">
                Register with Atelier
              </Link>
            </p>
            <div className="flex items-center justify-center gap-3 text-[11px] font-ui text-muted pt-1">
              <Link href="/wishlist" className="hover:text-copper transition-colors">
                Wishlist
              </Link>
              <span>·</span>
              <Link href="/admin/login" className="hover:text-copper transition-colors">
                Staff CRM Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}