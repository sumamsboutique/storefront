import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getOpenPaymentReconciliations } from '@/lib/admin/queries'
import { PaymentReconciliationClient } from '@/components/admin/PaymentReconciliationClient'
import { AdminCard } from '@/components/admin/AdminCard'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { Eyebrow } from '@/components/shared/primitives'

export const dynamic = 'force-dynamic'

export default async function PaymentReconciliationPage() {
  await requireAdminOrStaff()
  const { cases, error } = await getOpenPaymentReconciliations()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Payment Review' }]} />
      <header className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Captured payments" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Payment <span className="italic text-copper">Review</span>
        </h1>
        <p className="mt-1 max-w-3xl font-sans text-xs leading-relaxed text-muted">
          Review captured payments that could not be fulfilled automatically. Confirm stock before
          fulfillment. Any refund must be completed in Razorpay first; this screen records that
          external action and never issues a refund.
        </p>
      </header>

      {error ? (
        <AdminCard title="Payment review queue unavailable">
          <p role="alert" className="text-sm text-[#A62719]">{error}</p>
        </AdminCard>
      ) : (
        <PaymentReconciliationClient cases={cases} />
      )}
    </div>
  )
}
