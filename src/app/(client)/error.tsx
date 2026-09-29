'use client'

import { PAD, Eyebrow } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function StorefrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory font-sans text-dark">
      <div className={cn(PAD, 'w-full max-w-xl py-32 text-center')}>
        <Eyebrow label="Something went wrong" hairline={false} />
        <p className="font-display text-[clamp(22px,4vw,36px)] font-light">
          This thread came undone.
        </p>
        <p className="mx-auto mt-4 max-w-sm font-ui text-sm font-light leading-relaxed text-muted">
          An unexpected error occurred{error.digest ? ` (ref ${error.digest})` : ''}. The
          rest of the boutique is unaffected — please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-block bg-dark px-8 py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase"
        >
          Try again
        </button>
      </div>
    </main>
  )
}