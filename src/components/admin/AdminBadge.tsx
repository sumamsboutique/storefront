import React from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'copper'
  | 'gold'

export function AdminBadge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  const styles: Record<BadgeVariant, string> = {
    neutral: 'bg-[#EDE3D6] text-dark border-[#DCC9A8]/60',
    copper: 'bg-[#BF5E18]/10 text-copper border-[#BF5E18]/30 font-medium',
    gold: 'bg-[#D4880A]/10 text-[#9A6207] border-[#D4880A]/30 font-medium',
    success: 'bg-[#EAF5EC] text-[#1E6B2C] border-[#B6E0BC]',
    warning: 'bg-[#FEF6E6] text-[#9A6207] border-[#FADBA2]',
    danger: 'bg-[#FDF0EE] text-[#A62719] border-[#F5BDB6]',
    info: 'bg-[#EBF2F7] text-[#1B5280] border-[#B7D4EA]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-sans tracking-wide uppercase border rounded',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    pending: { label: 'Pending', variant: 'warning' },
    paid: { label: 'Paid', variant: 'success' },
    processing: { label: 'Processing', variant: 'info' },
    shipped: { label: 'Shipped', variant: 'copper' },
    delivered: { label: 'Delivered', variant: 'success' },
    cancelled: { label: 'Cancelled', variant: 'neutral' },
    refunded: { label: 'Refunded', variant: 'danger' },
    expired: { label: 'Expired', variant: 'neutral' },
  }

  const cfg = map[status] || { label: status, variant: 'neutral' }
  return <AdminBadge variant={cfg.variant}>{cfg.label}</AdminBadge>
}

export function StockBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    in_stock: { label: 'In Stock', variant: 'success' },
    low_stock: { label: 'Low Stock', variant: 'warning' },
    out_of_stock: { label: 'Out of Stock', variant: 'danger' },
    sold: { label: 'Sold', variant: 'neutral' },
  }

  const cfg = map[status] || { label: status, variant: 'neutral' }
  return <AdminBadge variant={cfg.variant}>{cfg.label}</AdminBadge>
}

export function PublicationBadge({ isPublished }: { isPublished: boolean }) {
  return isPublished ? (
    <AdminBadge variant="success">Published</AdminBadge>
  ) : (
    <AdminBadge variant="neutral">Draft</AdminBadge>
  )
}

export function ActiveBadge({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <AdminBadge variant="success">Active</AdminBadge>
  ) : (
    <AdminBadge variant="danger">Inactive</AdminBadge>
  )
}

export function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    admin: { label: 'Admin', variant: 'copper' },
    staff: { label: 'Staff', variant: 'gold' },
    customer: { label: 'Customer', variant: 'neutral' },
  }

  const cfg = map[role] || { label: role, variant: 'neutral' }
  return <AdminBadge variant={cfg.variant}>{cfg.label}</AdminBadge>
}
