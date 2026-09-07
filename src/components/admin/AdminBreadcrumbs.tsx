import React from 'react'
import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export function AdminBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-sans text-muted mb-4">
      <Link href="/admin" className="hover:text-copper transition-colors">
        Admin
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-copper transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-dark font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
