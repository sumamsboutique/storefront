import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminCoupons } from '@/lib/admin/queries'
import { CouponsManagerClient } from '@/components/admin/CouponsManagerClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminCouponsPage() {
  await requireAdminOrStaff()
  const coupons = await getAdminCoupons()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Discount Coupons' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Promotions & Discounts" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Discount <span className="italic text-copper">Coupons</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Create percentage or fixed-amount codes customers apply at checkout. Discounts
          are validated server-side on the coupon table at order time.
        </p>
      </div>

      <CouponsManagerClient coupons={coupons} />
    </div>
  )
}