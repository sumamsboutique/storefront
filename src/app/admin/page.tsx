import React from 'react'
import Link from 'next/link'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import {
  getDashboardKPIs,
  getRecentOrders,
  getLowStockProducts,
  getRecentAuditLogs,
} from '@/lib/admin/queries'
import { AdminCard } from '@/components/admin/AdminCard'
import { OrderStatusBadge, StockBadge } from '@/components/admin/AdminBadge'
import { Eyebrow } from '@/components/shared/primitives'

export default async function AdminDashboardPage() {
  await requireAdminOrStaff()

  const [kpis, recentOrders, lowStockItems, recentLogs] = await Promise.all([
    getDashboardKPIs(),
    getRecentOrders(6),
    getLowStockProducts(6),
    getRecentAuditLogs(8),
  ])

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#DCC9A8]/40 pb-6">
        <div>
          <Eyebrow label="Overview" hairline={false} />
          <h1 className="font-display text-3xl font-light text-dark">
            Store <span className="italic text-copper">Dashboard</span>
          </h1>
          <p className="font-sans text-xs text-muted mt-1">
            Real-time health, order flow, inventory alerts, and content activity.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-copper hover:bg-[#A04A18] text-ivory text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2 bg-[#FDFBF7] hover:bg-cream text-dark border border-[#DCC9A8] text-xs font-sans font-medium uppercase tracking-wider transition-colors"
          >
            Edit CMS
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-[#FDFBF7] hover:bg-cream text-dark border border-[#DCC9A8] text-xs font-sans font-medium uppercase tracking-wider transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/admin/help"
            title="Step-by-step guides for everyday tasks"
            className="px-4 py-2 bg-[#FDFBF7] hover:bg-cream text-dark border border-[#DCC9A8] text-xs font-sans font-medium uppercase tracking-wider transition-colors"
          >
            Help?
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-[#FDFBF7] border border-[#DCC9A8]/70 rounded-lg p-5 shadow-[0_1px_2px_rgba(28,10,6,0.04),0_10px_28px_-16px_rgba(28,10,6,0.12)]">
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted block mb-1">
            Total Revenue
          </span>
          <div className="font-display text-2xl font-normal text-dark tracking-tight">
            ₹{kpis.totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="font-sans text-[11px] text-muted mt-1">
            Settled orders (paid & delivered)
          </p>
        </div>

        {/* Orders Count */}
        <div className="bg-[#FDFBF7] border border-[#DCC9A8]/70 rounded-lg p-5 shadow-[0_1px_2px_rgba(28,10,6,0.04),0_10px_28px_-16px_rgba(28,10,6,0.12)]">
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted block mb-1">
            Orders
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-normal text-dark">
              {kpis.totalOrders}
            </span>
            {kpis.pendingOrders > 0 && (
              <span className="font-sans text-xs text-copper font-medium">
                ({kpis.pendingOrders} pending)
              </span>
            )}
          </div>
          <p className="font-sans text-[11px] text-muted mt-1">
            All-time customer transactions
          </p>
        </div>

        {/* Active Products */}
        <div className="bg-[#FDFBF7] border border-[#DCC9A8]/70 rounded-lg p-5 shadow-[0_1px_2px_rgba(28,10,6,0.04),0_10px_28px_-16px_rgba(28,10,6,0.12)]">
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted block mb-1">
            Catalog Products
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-normal text-dark">
              {kpis.activeProducts}
            </span>
            <span className="font-sans text-xs text-muted">
              / {kpis.totalProducts} total
            </span>
          </div>
          <p className="font-sans text-[11px] text-muted mt-1">
            Active handloom & jewellery items
          </p>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-[#FBF3F1] border border-[#E8A59E]/70 rounded-lg p-5 shadow-[0_1px_2px_rgba(28,10,6,0.04),0_10px_28px_-16px_rgba(28,10,6,0.12)]">
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted block mb-1">
            Low Stock Alerts
          </span>
          <div className="font-display text-2xl font-normal text-[#A62719]">
            {kpis.lowStockCount}
          </div>
          <p className="font-sans text-[11px] text-muted mt-1">
            Items at or below 3 units
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2">
          <AdminCard
            title="Recent Orders"
            subtitle="Latest orders placed via guest checkout and customer accounts."
            action={
              <Link
                href="/admin/orders"
                className="text-xs font-sans text-copper hover:underline"
              >
                View all orders →
              </Link>
            }
          >
            {recentOrders.length === 0 ? (
              <div className="text-center py-10 text-muted font-sans text-xs">
                No orders recorded yet. As customers check out, they will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 -my-6">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-cream/40 border-b border-[#DCC9A8]/40 text-muted uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Total</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCC9A8]/30">
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-ivory/30 transition-colors">
                        <td className="px-6 py-3 font-mono text-[11px] text-dark">
                          {o.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-3">
                          <div className="font-medium text-dark">{o.customer_name}</div>
                          <div className="text-[10px] text-muted">{o.customer_email}</div>
                        </td>
                        <td className="px-6 py-3">
                          <OrderStatusBadge status={o.status} />
                        </td>
                        <td className="px-6 py-3 text-right font-medium text-dark">
                          ₹{o.total.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <Link
                            href={`/admin/orders/${o.id}`}
                            className="text-copper hover:underline font-medium text-xs"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminCard>
        </div>

        {/* Low Stock Alerts (1 col) */}
        <div>
          <AdminCard
            title="Inventory Watch"
            subtitle="Items requiring restocking or weaving runs."
            action={
              <Link
                href="/admin/products?stockStatus=low_stock"
                className="text-xs font-sans text-copper hover:underline"
              >
                Filter →
              </Link>
            }
          >
            {lowStockItems.length === 0 ? (
              <div className="text-center py-10 text-muted font-sans text-xs">
                All inventory levels are healthy.
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-[#DCC9A8]/40 bg-white/60"
                  >
                    <div>
                      <h4 className="font-sans text-xs font-medium text-dark truncate max-w-[160px]">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-sans text-muted">
                        SKU: {item.sku || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StockBadge status={item.stock_status} />
                      <Link
                        href={`/admin/products/${item.id}`}
                        className="text-xs text-copper hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        </div>
      </div>

      {/* Audit Activity Stream */}
      <AdminCard
        title="Administrative Activity Log"
        subtitle="Recent team actions, product modifications, and content updates."
      >
        {recentLogs.length === 0 ? (
          <div className="text-center py-6 text-muted font-sans text-xs">
            No audit log entries recorded yet. System mutations will be logged automatically.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 -my-6">
            <table className="w-full text-left font-sans text-xs">
              <thead className="bg-cream/40 border-b border-[#DCC9A8]/40 text-muted uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3">Staff Member</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Target Table</th>
                  <th className="px-6 py-3">Record Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCC9A8]/30">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-ivory/20 transition-colors">
                    <td className="px-6 py-2.5 text-muted text-[11px]">
                      {new Date(log.created_at).toLocaleString('en-IN', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="px-6 py-2.5 font-medium text-dark">
                      {log.changed_by_name}
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-cream text-dark">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-2.5 font-mono text-[11px] text-muted">
                      {log.table_name}
                    </td>
                    <td className="px-6 py-2.5 font-mono text-[11px] text-muted">
                      {log.record_id.slice(0, 8)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  )
}
