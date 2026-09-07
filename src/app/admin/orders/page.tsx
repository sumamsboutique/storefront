import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminOrders } from '@/lib/admin/queries'
import { OrderListClient } from '@/components/admin/OrderListClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    status?: string
    page?: string
  }
}) {
  await requireAdminOrStaff()

  const page = parseInt(searchParams.page || '1') || 1
  const { orders, total } = await getAdminOrders({
    search: searchParams.search,
    status: searchParams.status,
    page,
    limit: 25,
  })

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Orders' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Order Fulfillment & CRM" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Customer <span className="italic text-copper">Orders</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Monitor order status, customer delivery addresses, payment confirmation, and packaging dispatch.
        </p>
      </div>

      <OrderListClient orders={orders} total={total} />
    </div>
  )
}
