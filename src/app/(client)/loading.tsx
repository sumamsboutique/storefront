export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-ivory">
      <div
        className="h-10 w-10 animate-spin rounded-full border border-copper/30 border-t-copper"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}