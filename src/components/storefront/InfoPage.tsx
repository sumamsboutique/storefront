import { AlponaDivider, PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'

export function PageHeader({
  eyebrow,
  title,
  em,
}: {
  eyebrow: string
  title: string
  em?: string
}) {
  return (
    <div className={cn(PAD, 'pt-[26px] pb-[18px] text-center')}>
      <div className="flex items-center justify-center gap-2.5 pb-3.5">
        <span className="h-px w-5 bg-copper" />
        <span className="font-ui text-[10px] tracking-[0.18em] text-copper uppercase">{eyebrow}</span>
        <span className="h-px w-5 bg-copper" />
      </div>
      <h1 className="font-display text-[clamp(34px,5vw,52px)] font-light leading-[1.1] text-dark">
        {title} {em && <em className="italic text-copper">{em}</em>}
      </h1>
      <AlponaDivider />
    </div>
  )
}

export function Bullets({
  title,
  items,
  note,
}: {
  title: string
  items: string[]
  note?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-3 pb-3">
        <span className="font-ui text-[10px] tracking-[0.28em] uppercase text-copper">{title}</span>
        <span className="h-px flex-1 bg-[rgba(212,136,10,0.18)]" />
      </div>
      <ul className="space-y-3">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-3 font-ui text-[15px] font-light leading-[1.9] text-[rgba(28,10,6,0.82)]"
          >
            <span className="mt-[12px] h-px w-4 shrink-0 bg-gold" />
            {it}
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 font-ui text-[13px] font-light italic leading-[1.8] text-muted">{note}</p>}
    </div>
  )
}