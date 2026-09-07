import React from 'react'
import { cn } from '@/lib/cn'

export function AdminCard({
  title,
  subtitle,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
}: {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
}) {
  return (
    <div
      className={cn(
        'bg-[#FDFBF7] border border-[#DCC9A8]/60 rounded-lg overflow-hidden shadow-[0_1px_2px_rgba(28,10,6,0.04),0_10px_28px_-16px_rgba(28,10,6,0.12)]',
        className
      )}
    >
      {(title || subtitle || action) && (
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-3 border-b border-[#DCC9A8]/40 px-6 py-4.5',
            headerClassName
          )}
        >
          <div>
            {title && (
              <h2 className="font-display text-xl font-medium tracking-tight text-dark">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 font-sans text-xs text-muted">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={cn('p-6', bodyClassName)}>{children}</div>
    </div>
  )
}
