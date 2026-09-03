import { cn } from '@/lib/cn'

export const PAD = 'px-[clamp(20px,6vw,85px)]'

export function Eyebrow({
  label,
  color = 'text-copper',
  hairline = true,
  cn: cls,
}: {
  label: string
  color?: string
  hairline?: boolean
  cn?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 mb-3.5', cls)}>
      <span
        className={cn(
          'font-sans text-[10px] font-normal tracking-[0.24em] uppercase',
          color
        )}
      >
        {label}
      </span>
      {hairline && <div className={cn('w-5 h-px shrink-0', color)} />}
    </div>
  )
}

export function AlponaMotif({
  size = 80,
  opacity = 0.25,
  className,
}: {
  size?: number
  opacity?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      style={{ opacity }}
      className={className}
      aria-hidden
    >
      <polygon points="40,4 76,40 40,76 4,40" stroke="#D4880A" strokeWidth="0.5" fill="none" />
      <polygon points="40,12 68,40 40,68 12,40" stroke="#D4880A" strokeWidth="0.5" fill="none" />
      <polygon points="40,20 60,40 40,60 20,40" stroke="#D4880A" strokeWidth="0.4" fill="none" />
      <ellipse cx="40" cy="27" rx="5" ry="10" stroke="#D4880A" strokeWidth="0.5" fill="none" transform="rotate(0,40,40)" />
      <ellipse cx="40" cy="27" rx="5" ry="10" stroke="#D4880A" strokeWidth="0.5" fill="none" transform="rotate(90,40,40)" />
      <ellipse cx="40" cy="27" rx="5" ry="10" stroke="#D4880A" strokeWidth="0.5" fill="none" transform="rotate(180,40,40)" />
      <ellipse cx="40" cy="27" rx="5" ry="10" stroke="#D4880A" strokeWidth="0.5" fill="none" transform="rotate(270,40,40)" />
      <circle cx="40" cy="40" r="2" stroke="#D4880A" strokeWidth="0.5" fill="none" />
      <circle cx="40" cy="8" r="1" fill="#D4880A" opacity="0.6" />
      <circle cx="72" cy="40" r="1" fill="#D4880A" opacity="0.6" />
      <circle cx="40" cy="72" r="1" fill="#D4880A" opacity="0.6" />
      <circle cx="8" cy="40" r="1" fill="#D4880A" opacity="0.6" />
    </svg>
  )
}

export function AlponaDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center my-8', className)}>
      <svg width="320" height="24" viewBox="0 0 320 24" fill="none" style={{ opacity: 0.5 }} aria-hidden>
        <line x1="0" y1="12" x2="126" y2="12" stroke="#BF5E18" strokeWidth="0.75" />
        <polygon points="132,12 138,7 144,12 138,17" stroke="#D4880A" strokeWidth="0.5" fill="none" />
        <ellipse cx="160" cy="6" rx="4" ry="8" stroke="#BF5E18" strokeWidth="0.5" fill="none" transform="rotate(0,160,12)" />
        <ellipse cx="160" cy="6" rx="4" ry="8" stroke="#BF5E18" strokeWidth="0.5" fill="none" transform="rotate(90,160,12)" />
        <ellipse cx="160" cy="6" rx="4" ry="8" stroke="#BF5E18" strokeWidth="0.5" fill="none" transform="rotate(180,160,12)" />
        <ellipse cx="160" cy="6" rx="4" ry="8" stroke="#BF5E18" strokeWidth="0.5" fill="none" transform="rotate(270,160,12)" />
        <circle cx="160" cy="12" r="1.5" stroke="#D4880A" strokeWidth="0.5" fill="none" />
        <polygon points="176,12 182,7 188,12 182,17" stroke="#D4880A" strokeWidth="0.5" fill="none" />
        <line x1="194" y1="12" x2="320" y2="12" stroke="#BF5E18" strokeWidth="0.75" />
      </svg>
    </div>
  )
}

export function SareeBorderDivider({ count = 40, step = 36 }: { count?: number; step?: number }) {
  return (
    <div className="relative w-full h-3 bg-dark overflow-hidden shrink-0">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        {Array.from({ length: count }).map((_, i) => (
          <polygon
            key={i}
            points={`${i * step + step / 2},2 ${i * step + step / 2 + 8},6 ${i * step + step / 2},10 ${i * step + step / 2 - 8},6`}
            fill="none"
            stroke="#D4880A"
            strokeWidth="0.4"
            opacity="0.18"
          />
        ))}
      </svg>
      <div className="absolute top-[25%] left-0 right-0 h-px bg-gold opacity-55" />
      <div className="absolute top-[60%] left-0 right-0 h-[1.5px] bg-copper opacity-75" />
      <div className="absolute top-[90%] left-0 right-0 h-px bg-gold opacity-55" />
    </div>
  )
}
