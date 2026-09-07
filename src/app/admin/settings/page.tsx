import React from 'react'
import { requireAdmin } from '@/lib/admin/auth'
import { getAdminStoreSettings } from '@/lib/admin/queries'
import { StoreSettingsForm } from '@/components/admin/StoreSettingsForm'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminSettingsPage() {
  await requireAdmin() // Admin-only route
  const settings = await getAdminStoreSettings()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Store Settings' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Boutique Configuration" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Store <span className="italic text-copper">Settings</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Configure atelier brand details, shipping fee thresholds, notification routing, and verified social channels.
        </p>
      </div>

      <StoreSettingsForm
        initialSettings={{
          general: {
            store_name: settings.general.store_name,
            tagline: settings.general.tagline,
            email: settings.general.email,
            phone: settings.general.phone,
            whatsapp: settings.general.whatsapp,
            address: settings.general.address,
          },
          commerce: {
            free_shipping_threshold: Number(settings.commerce.free_shipping_threshold),
            flat_shipping_rate: Number(settings.commerce.flat_shipping_rate),
            currency_symbol: String(settings.commerce.currency_symbol || '₹'),
            currency_code: String(settings.commerce.currency_code || 'INR'),
            tax_inclusive: Boolean(settings.commerce.tax_inclusive),
          },
          social: {
            instagram: settings.social.instagram,
            facebook: settings.social.facebook,
            youtube: settings.social.youtube,
          },
          notifications: {
            order_alert_email: String(settings.notifications.order_alert_email || ''),
            low_stock_threshold: Number(settings.notifications.low_stock_threshold || 3),
            notify_on_new_order: Boolean(settings.notifications.notify_on_new_order),
          },
        }}
      />
    </div>
  )
}
