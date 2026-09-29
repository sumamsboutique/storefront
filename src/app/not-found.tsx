import Link from 'next/link'
import { PAD, Eyebrow } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory font-sans text-dark">
      <div className={cn(PAD, 'w-full max-w-xl py-32 text-center')}>
        <Eyebrow label="Lost your way?" hairline={false} />
        <p className="font-display text-[clamp(30px,6vw,48px)] font-light">404</p>
        <p className="mx-auto mt-4 max-w-sm font-ui text-sm font-light leading-relaxed text-muted">
          This thread of the story doesn&apos;t exist. The piece you&apos;re
          looking for may have been moved, renamed, or never woven.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block bg-dark px-8 py-3.5 font-ui text-[11px] font-medium tracking-[0.18em] text-ivory uppercase"
        >
          Return to the Boutique
        </Link>
      </div>
    </main>
  )
}