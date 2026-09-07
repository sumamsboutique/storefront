import React from 'react'
import { notFound } from 'next/navigation'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminOrderById } from '@/lib/admin/queries'
import { OrderDetailClient } from '@/components/admin/OrderDetailClient'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminOrStaff()
  const { id } = await params
  const order = await getAdminOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: 'Orders', href: '/admin/orders' },
          { label: `Order #${order.id.slice(0, 8)}` },
        ]}
      />

      <OrderDetailClient order={order} />
    </div>
  )
}
