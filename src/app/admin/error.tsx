'use client'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="font-display text-2xl font-light text-[#EFE5D8]">Something went wrong</h2>
      <p className="max-w-sm text-sm font-light leading-relaxed text-[#a89a8b]">
        An error occurred while loading this screen
        {error.digest ? ` (ref ${error.digest})` : ''}. Your data is safe — try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-[#DCC9A8]/50 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#EFE5D8] hover:border-[#DCC9A8]"
      >
        Try again
      </button>
    </div>
  )
}