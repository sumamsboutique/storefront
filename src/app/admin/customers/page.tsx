import React from 'react'
import { requireAdmin } from '@/lib/admin/auth'
import { getAdminCustomers } from '@/lib/admin/queries'
import { CustomerManagerClient } from '@/components/admin/CustomerManagerClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    role?: string
    page?: string
  }>
}) {
  const session = await requireAdmin() // Admin-only route

  const sp = await searchParams
  const page = parseInt(sp.page || '1') || 1
  const { customers, total } = await getAdminCustomers({
    search: sp.search,
    role: sp.role,
    page,
    limit: 25,
  })

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Customers & Staff' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="User Directory & Permissions" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Customer &amp; <span className="italic text-copper">Staff CRM</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Registered client accounts, order purchase history, and role-based staff administration.
        </p>
      </div>

      <CustomerManagerClient
        customers={customers}
        total={total}
        currentUserRole={session.profile.role}
      />
    </div>
  )
}
