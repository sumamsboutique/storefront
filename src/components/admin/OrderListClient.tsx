'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AdminOrderRow } from '@/lib/admin/queries'
import { OrderStatusBadge } from '@/components/admin/AdminBadge'

export function OrderListClient({
  orders,
  total,
}: {
  orders: AdminOrderRow[]
  total: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/orders?${params.toString()}`)
  }

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }
    params.set('page', '1')
    router.push(`/admin/orders?${params.toString()}`)
  }

  const currentStatus = searchParams.get('status') || ''

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID or payment reference..."
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-dark text-ivory text-xs font-sans font-medium uppercase tracking-wider hover:bg-copper transition-colors"
          >
            Search
          </button>
        </form>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          {[
            { key: '', label: 'All Orders' },
            { key: 'pending', label: 'Pending' },
            { key: 'paid', label: 'Paid' },
            { key: 'processing', label: 'Processing' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'delivered', label: 'Delivered' },
            { key: 'cancelled', label: 'Cancelled' },
            { key: 'expired', label: 'Expired (abandoned)' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleFilter(item.key)}
              className={`px-3 py-1 border transition-colors ${
                currentStatus === item.key
                  ? 'bg-copper text-ivory border-copper font-medium'
                  : 'bg-white text-muted border-[#DCC9A8]/80 hover:text-dark hover:border-dark'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 overflow-x-auto shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Total</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC9A8]/30">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-[11px] text-dark font-medium">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="text-copper hover:underline"
                    >
                      {o.id.slice(0, 8)}...
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-muted text-[11px]">
                    {new Date(o.created_at).toLocaleString('en-IN', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-dark">{o.customer_name}</div>
                    <div className="text-[10px] text-muted">{o.customer_email}</div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">
                    {o.item_count} item{o.item_count === 1 ? '' : 's'}
                  </td>
                  <td className="px-5 py-3.5">
                    <OrderStatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-dark text-sm">
                    ₹{o.total.toLocaleString('en-IN')}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="px-3 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-copper font-medium transition-colors"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs font-sans text-muted px-1">
        Showing {orders.length} of {total} total orders
      </div>
    </div>
  )
}
