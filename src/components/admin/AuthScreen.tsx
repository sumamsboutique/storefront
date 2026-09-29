'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlponaMotif } from '@/components/shared/primitives'
import { adminLoginAction, adminSignupAction, customerLoginAction } from '@/lib/admin/actions'
import { cn } from '@/lib/cn'

type Mode = 'login' | 'signup'
type AuthVariant = 'admin' | 'customer'

const emailOrPhoneValid = (v: string) =>
  v.includes('@') ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : /^\+?[0-9\s-]{8,15}$/.test(v.trim())

const inputBase =
  'w-full rounded-full border border-[rgba(140,106,85,0.32)] bg-white/80 px-5 py-3.5 text-[15px] text-dark shadow-[inset_0_1px_2px_rgba(28,10,6,0.04)] outline-none transition-all duration-200 placeholder:text-muted/50 focus:border-copper focus:ring-4 focus:ring-copper/15'
const inputDanger = ' border-red-400/70 focus:border-red-600 focus:ring-red-200/60'

// ponytail: shared low-privilege demo account — deliberately public, so this is
// safe to show. It only self-reads via RLS (own orders/addresses). Per-tenant
// demo accounts if you ever need isolation.
const DEMO_CUSTOMER_EMAIL =
  process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL ?? 'demo@sumamsboutique.com'
const DEMO_CUSTOMER_PASSWORD =
  process.env.NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD ?? 'customer123'

function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-sans text-[13px] font-medium text-dark/80">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 font-sans text-xs text-[#B00020]">
          {error}
        </p>
      )}
    </div>
  )
}

function EyeIcon({ off }: { off?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {off ? (
        <>
          <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  )
}


function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function AuthScreen({ variant = 'admin' }: { variant?: AuthVariant }) {
  const isAdmin = variant === 'admin'
  const [mode, setMode] = useState<Mode>('login')
  const [isPending, startTransition] = useTransition()

  // login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  // signup fields
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // feedback
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [forgot, setForgot] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const loginFormRef = useRef<HTMLFormElement>(null)
  const signupFormRef = useRef<HTMLFormElement>(null)

  const switchMode = (next: Mode) => {
    setMode(next)
    setError(null)
    setNotice(null)
    setForgot(false)
    setFieldErrors({})
    setShowPwd(false)
    setShowConfirm(false)
  }

  const validateLogin = (): string | null => {
    if (!loginEmail.trim()) return 'Please enter your email address or phone number.'
    if (!emailOrPhoneValid(loginEmail)) return 'Please enter a valid email address or phone number.'
    if (!loginPassword) return 'Please enter your password.'
    if (loginPassword.length < 8) return 'Password must contain at least 8 characters.'
    return null
  }

  const validateSignup = (): Record<string, string> | null => {
    const errs: Record<string, string> = {}
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.'
    if (!signupEmail.trim()) errs.email = 'Please enter your email address.'
    else if (!emailOrPhoneValid(signupEmail)) errs.email = 'Please enter a valid email address.'
    if (phone && !/^\+?[0-9\s-]{8,15}$/.test(phone.trim())) errs.phone = 'Please enter a valid phone number.'
    if (!signupPassword) errs.password = 'Please enter a password.'
    else if (signupPassword.length < 8) errs.password = 'Password must contain at least 8 characters.'
    if (confirm !== signupPassword) errs.confirm = 'Passwords do not match.'
    if (!acceptTerms) errs.terms = 'Please accept the Terms & Conditions to continue.'
    return Object.keys(errs).length ? errs : null
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setNotice(null)
    const err = validateLogin()
    if (err) {
      setError(err)
      return
    }
    const form = loginFormRef.current
    if (!form) return
    const loginAction = isAdmin ? adminLoginAction : customerLoginAction
    startTransition(async () => {
      const res = await loginAction(null, new FormData(form))
      if (res?.error) setError(res.error)
    })
  }

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setNotice(null)
    const errs = validateSignup()
    if (errs) {
      setFieldErrors(errs)
      return
    }
    const form = signupFormRef.current
    if (!form) return
    startTransition(async () => {
      const res = await adminSignupAction(null, new FormData(form))
      if (res?.error) {
        setError(res.error)
      } else if (res?.success && res.message) {
        setMode('login')
        setNotice(res.message)
      }
    })
  }

  const isProd = process.env.NODE_ENV === 'production'

  const fillDemo = () => {
    setLoginEmail(isAdmin ? 'admin@sumamsboutique.com' : DEMO_CUSTOMER_EMAIL)
    setLoginPassword(isAdmin ? 'admin123' : DEMO_CUSTOMER_PASSWORD)
    setError(null)
  }

  return (
    <div className="relative overflow-hidden bg-ivory font-sans text-dark">
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#F5EFE6_0%,#EDE3D6_52%,#E2D2BC_100%)]" />
      <div
        className={cn(
          'absolute top-[-14%] h-[56vh] w-[56vh] rounded-full bg-[radial-gradient(closest-side,rgba(191,94,24,0.16),transparent_70%)]',
          isAdmin ? 'left-[-10%]' : 'right-[-10%]'
        )}
      />
      <div
        className={cn(
          'absolute bottom-[-16%] h-[62vh] w-[62vh] rounded-full bg-[radial-gradient(closest-side,rgba(212,136,10,0.13),transparent_70%)]',
          isAdmin ? 'right-[-8%]' : 'left-[-8%]'
        )}
      />
      <div className="linen-noise pointer-events-none absolute inset-0" aria-hidden />
      <style jsx>{`
        .auth-up {
          animation: auth-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .auth-swap {
          animation: auth-swap 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .auth-logo {
          animation: auth-logo 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .auth-logo-delay {
          animation: auth-logo 0.9s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .auth-float {
          animation: auth-float 9s ease-in-out infinite;
        }
        .auth-float-2 {
          animation: auth-float 12s ease-in-out infinite;
        }
        .auth-panel {
          animation-delay: 0.55s;
        }
        @keyframes auth-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes auth-swap {
          from {
            opacity: 0;
            transform: translateX(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes auth-logo {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes auth-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .auth-up,
          .auth-swap,
          .auth-logo,
          .auth-logo-delay,
          .auth-float,
          .auth-float-2 {
            animation: none;
          }
        }
      `}</style>

      <div className={cn('relative grid w-full', isAdmin ? 'md:grid-cols-[9fr_11fr] lg:grid-cols-2' : 'md:grid-cols-[11fr_9fr] lg:grid-cols-2', isAdmin ? 'min-h-screen' : 'min-h-[660px] lg:min-h-[720px]')}>
        {/* ── LEFT: authentication ─────────────────────────────────────────── */}
        <div className={cn('auth-up relative flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-14', isAdmin && 'md:order-2')}>
          {/* mobile brand mark */}
          <div className="mb-8 flex justify-center md:hidden">
            <Image
              src="/logo.png"
              alt="Sumam's Boutique"
              width={761}
              height={306}
              priority
              className="h-auto w-52"
            />
          </div>

          <div key={mode} className="auth-swap mx-auto w-full max-w-[480px]">
            {/* shared banners */}
            {notice && (
              <div
                role="status"
                className="mb-6 rounded-xl border border-emerald-300/70 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
              >
                {notice}
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-300/70 bg-red-50 px-4 py-3 text-sm text-[#B00020]"
              >
                {error}
              </div>
            )}

            {mode === 'login' ? (
              /* ── LOGIN ── */
              <div>
                <div className="mb-8">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-copper">
                    Sumam&apos;s Boutique
                  </span>
                  <h1 className="mt-3 font-display text-3xl font-normal tracking-tight text-dark sm:text-4xl">
                    Sign in to your <span className="italic text-copper">account</span>
                  </h1>
                  <p className="mt-3 max-w-sm font-sans text-[15px] leading-relaxed text-muted">
                    Welcome back. Enter your details to continue.
                  </p>
                </div>

                <form ref={loginFormRef} onSubmit={handleLogin} className="space-y-4" noValidate>
                  <FieldShell id="login-identifier" label="Email or phone number" error={fieldErrors.email}>
                    <input
                      id="login-identifier"
                      name="email"
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Email or phone number"
                      className={cn(inputBase, fieldErrors.email && inputDanger)}
                    />
                  </FieldShell>

                  <div>
                    <label htmlFor="login-password" className="mb-2 block font-sans text-[13px] font-medium text-dark/80">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
                        name="password"
                        type={showPwd ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                        className={cn(inputBase, 'pr-11')}
                      />
                      <button
                        type="button"
                        aria-label={showPwd ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPwd((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-copper"
                      >
                        <EyeIcon off={showPwd} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div>
                        {fieldErrors.password && (
                          <p role="alert" className="font-sans text-xs text-[#B00020]">
                            {fieldErrors.password}
                          </p>
                        )}
                        {forgot && !fieldErrors.password && (
                          <p className="font-sans text-xs text-muted">
                            Contact the administrator to reset your password.
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setForgot((f) => !f)}
                        className="shrink-0 font-sans text-xs font-medium text-copper hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="group relative w-full rounded-full bg-dark py-4 text-[15px] font-semibold text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-copper hover:shadow-[0_10px_26px_-10px_rgba(191,94,24,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
                  >
                    {isPending ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Spinner /> Signing you in…
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {!isAdmin && (
                  <p className="mt-8 text-center font-sans text-sm text-muted">
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('signup')}
                      className="font-semibold text-copper transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                    >
                      Create account
                    </button>
                  </p>
                )}

                {(isAdmin ? !isProd : true) && (
                  <div className="mt-6 rounded-xl border border-[#DCC9A8]/70 bg-cream/50 px-4 py-3 text-center">
                    <p className="font-sans text-[11px] text-muted">
                      {isAdmin ? 'Demo access' : 'Demo customer account'} —{' '}
                      <span className="select-all font-medium text-dark">
                        {isAdmin ? 'admin@sumamsboutique.com' : DEMO_CUSTOMER_EMAIL}
                      </span>{' '}
                      /{' '}
                      <span className="select-all font-medium text-dark">
                        {isAdmin ? 'admin123' : DEMO_CUSTOMER_PASSWORD}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={fillDemo}
                      className="mt-1 text-[11px] font-medium text-copper hover:underline focus-visible:outline-2 focus-visible:outline-copper"
                    >
                      Fill demo credentials
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── SIGNUP ── */
              <div>
                <div className="mb-8">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-copper">
                    Sumam&apos;s Boutique
                  </span>
                  <h1 className="mt-3 font-display text-3xl font-normal tracking-tight text-dark sm:text-4xl">
                    Create your <span className="italic text-copper">account</span>
                  </h1>
                  <p className="mt-3 max-w-sm font-sans text-[15px] leading-relaxed text-muted">
                    Join the atelier. Fill in your details to get started.
                  </p>
                </div>

                <form ref={signupFormRef} onSubmit={handleSignup} className="space-y-4" noValidate>
                  <FieldShell id="signup-name" label="Full Name" error={fieldErrors.fullName}>
                    <input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className={cn(inputBase, fieldErrors.fullName && inputDanger)}
                    />
                  </FieldShell>

                  <FieldShell id="signup-email" label="Email" error={fieldErrors.email}>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={cn(inputBase, fieldErrors.email && inputDanger)}
                    />
                  </FieldShell>

                  <FieldShell id="signup-phone" label="Phone Number (optional)" error={fieldErrors.phone}>
                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={cn(inputBase, fieldErrors.phone && inputDanger)}
                    />
                  </FieldShell>

                  <FieldShell id="signup-password" label="Password" error={fieldErrors.password}>
                    <div className="relative">
                      <input
                        id="signup-password"
                        name="password"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className={cn(inputBase, 'pr-11', fieldErrors.password && inputDanger)}
                      />
                      <button
                        type="button"
                        aria-label={showConfirm ? 'Hide password' : 'Show password'}
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-copper"
                      >
                        <EyeIcon off={showConfirm} />
                      </button>
                    </div>
                  </FieldShell>

                  <FieldShell id="signup-confirm" label="Confirm Password" error={fieldErrors.confirm}>
                    <input
                      id="signup-confirm"
                      name="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Re-enter your password"
                      className={cn(inputBase, fieldErrors.confirm && inputDanger)}
                    />
                  </FieldShell>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-copper"
                      />
                      <span className="font-sans text-xs leading-relaxed text-dark/75">
                        I agree to the <span className="font-medium text-copper">Terms of Service</span> and{' '}
                        <span className="font-medium text-copper">Privacy Policy</span>.
                      </span>
                    </label>
                    {fieldErrors.terms && (
                      <p role="alert" className="mt-1.5 font-sans text-xs text-[#B00020]">
                        {fieldErrors.terms}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="group relative w-full rounded-full bg-dark py-4 text-[15px] font-semibold text-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-copper hover:shadow-[0_10px_26px_-10px_rgba(191,94,24,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
                  >
                    {isPending ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Spinner /> Creating account…
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <p className="mt-8 text-center font-sans text-sm text-muted">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-semibold text-copper transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}

            <div className="mt-10 border-t border-[rgba(140,106,85,0.2)] pt-6 text-center">
              {isAdmin ? (
                <Link
                  href="/"
                  className="font-sans text-xs text-muted transition-colors hover:text-copper"
                >
                  ← Return to Customer Storefront
                </Link>
              ) : (
                <div className="flex items-center justify-center gap-3 font-sans text-xs text-muted">
                  <Link href="/wishlist" className="transition-colors hover:text-copper">
                    Wishlist
                  </Link>
                  <span className="text-[rgba(140,106,85,0.35)]">·</span>
                  <Link href="/admin/login" className="transition-colors hover:text-copper">
                    Staff CRM Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: brand identity ────────────────────────────────────────── */}
        <aside className={cn('relative hidden select-none overflow-hidden md:block', isAdmin && 'md:order-1')} aria-hidden>
          <div className="auth-float absolute left-[11%] top-[16%] h-24 w-24 rotate-45 rounded-[1.5rem] border border-copper/25" />
          <div className="auth-float-2 absolute bottom-[15%] right-[12%] h-16 w-16 rounded-full border border-gold/30" />
          <div className="absolute bottom-[-9%] right-[-5%] text-copper/10">
            <AlponaMotif size={340} />
          </div>

          <div className="relative flex min-h-screen flex-col items-center justify-center px-10 py-16 text-center">
            <div className="auth-logo">
              {/* logo.png is trimmed to the mark's real bounds, so w-… is the visible size */}
              <Image
                src="/logo.png"
                alt="Sumam's Boutique"
                width={761}
                height={306}
                priority
                className="h-auto w-[min(96%,880px)]"
              />
            </div>

            <div className="auth-logo-delay mt-12 max-w-sm">
              <div className="mx-auto mb-5 h-px w-12 bg-copper/50" />
              <p className="font-sans text-[15px] font-medium tracking-wide text-dark/85">
                {isAdmin
                  ? 'Bengal-heritage sarees &amp; fine jewellery'
                  : 'Your patron orders &amp; saved wishlist'}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                {isAdmin
                  ? 'The complete atelier experience, curated in one place.'
                  : 'Bespoke draping, order tracking and exclusive pieces — in one place.'}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
