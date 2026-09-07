'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AdminCard } from '@/components/admin/AdminCard'
import { useToast } from '@/components/admin/AdminToast'
import { saveStoreSettings } from '@/lib/admin/actions'
import type { StoreSettingsValues } from '@/lib/admin/schemas'

export function StoreSettingsForm({
  initialSettings,
}: {
  initialSettings: StoreSettingsValues
}) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  const [general, setGeneral] = useState(initialSettings.general)
  const [commerce, setCommerce] = useState(initialSettings.commerce)
  const [social, setSocial] = useState(initialSettings.social)
  const [notifications, setNotifications] = useState(initialSettings.notifications)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: StoreSettingsValues = {
      general: {
        store_name: general.store_name.trim(),
        tagline: general.tagline?.trim(),
        email: general.email.trim(),
        phone: general.phone.trim(),
        whatsapp: general.whatsapp?.trim(),
        address: general.address?.trim(),
      },
      commerce: {
        free_shipping_threshold: Number(commerce.free_shipping_threshold),
        flat_shipping_rate: Number(commerce.flat_shipping_rate),
        currency_symbol: commerce.currency_symbol || '₹',
        currency_code: commerce.currency_code || 'INR',
        tax_inclusive: commerce.tax_inclusive,
      },
      social: {
        instagram: social.instagram?.trim(),
        facebook: social.facebook?.trim(),
        youtube: social.youtube?.trim(),
      },
      notifications: {
        order_alert_email: notifications.order_alert_email?.trim(),
        low_stock_threshold: Number(notifications.low_stock_threshold),
        notify_on_new_order: notifications.notify_on_new_order,
      },
    }

    startTransition(async () => {
      const res = await saveStoreSettings(payload)
      if (res.success) {
        success('Boutique store settings updated.')
        router.refresh()
      } else {
        error(res.error || 'Failed to update store settings.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-copper hover:bg-[#A04A18] text-ivory text-xs font-sans font-medium uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
        >
          {isPending ? 'Saving Settings...' : 'Save All Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Boutique Information */}
        <AdminCard
          title="Boutique Identity & Contact"
          subtitle="Primary brand name, contact channels, and concierge details."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Store Name
              </label>
              <input
                type="text"
                required
                value={general.store_name}
                onChange={(e) => setGeneral({ ...general, store_name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={general.tagline || ''}
                onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Customer Concierge Email
                </label>
                <input
                  type="email"
                  required
                  value={general.email}
                  onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={general.phone}
                  onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  WhatsApp Concierge Line
                </label>
                <input
                  type="text"
                  value={general.whatsapp || ''}
                  onChange={(e) => setGeneral({ ...general, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Atelier Address
                </label>
                <input
                  type="text"
                  value={general.address || ''}
                  onChange={(e) => setGeneral({ ...general, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Commerce & Shipping Rules */}
        <AdminCard
          title="Shipping & Commerce Rules"
          subtitle="Shipping rates, free shipping cart thresholds, and currency formatting."
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Free Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={commerce.free_shipping_threshold}
                  onChange={(e) =>
                    setCommerce({
                      ...commerce,
                      free_shipping_threshold: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
                <span className="text-[10px] text-muted mt-1 block">
                  Orders above this value qualify for free domestic shipping.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Standard Flat Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={commerce.flat_shipping_rate}
                  onChange={(e) =>
                    setCommerce({
                      ...commerce,
                      flat_shipping_rate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
                <span className="text-[10px] text-muted mt-1 block">
                  Applied if subtotal is below the threshold.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  value={commerce.currency_symbol}
                  onChange={(e) =>
                    setCommerce({ ...commerce, currency_symbol: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                  Currency Code
                </label>
                <input
                  type="text"
                  value={commerce.currency_code}
                  onChange={(e) =>
                    setCommerce({ ...commerce, currency_code: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Social Presence */}
        <AdminCard
          title="Social Channels & Links"
          subtitle="Links to verified social pages displayed across the footer and contact pages."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={social.instagram || ''}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/sumamsboutique"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={social.facebook || ''}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/sumamsboutique"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={social.youtube || ''}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                placeholder="https://youtube.com/@sumamsboutique"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>
          </div>
        </AdminCard>

        {/* Notifications & Low-Stock Alerts */}
        <AdminCard
          title="Notifications & Alerts"
          subtitle="Internal alerts for orders and low warehouse inventory."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Order Notification Dispatch Email
              </label>
              <input
                type="email"
                value={notifications.order_alert_email || ''}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    order_alert_email: e.target.value,
                  })
                }
                placeholder="orders@sumamsboutique.com"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1">
                Low Stock Warning Threshold (Quantity)
              </label>
              <input
                type="number"
                min={0}
                value={notifications.low_stock_threshold}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    low_stock_threshold: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
              <span className="text-[10px] text-muted mt-1 block">
                Products at or below this count will flag in the inventory watch.
              </span>
            </div>
          </div>
        </AdminCard>
      </div>
    </form>
  )
}
