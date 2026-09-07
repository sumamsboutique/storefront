'use client'

import React, { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AdminCustomerRow } from '@/lib/admin/queries'
import { RoleBadge } from '@/components/admin/AdminBadge'
import { ConfirmModal } from '@/components/admin/AdminModal'
import { useToast } from '@/components/admin/AdminToast'
import { updateUserRole } from '@/lib/admin/actions'

export function CustomerManagerClient({
  customers,
  total,
  currentUserRole,
}: {
  customers: AdminCustomerRow[]
  total: number
  currentUserRole: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [roleTarget, setRoleTarget] = useState<{
    user: AdminCustomerRow
    newRole: 'admin' | 'staff' | 'customer'
  } | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/customers?${params.toString()}`)
  }

  const handleRoleFilter = (r: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (r) {
      params.set('role', r)
    } else {
      params.delete('role')
    }
    params.set('page', '1')
    router.push(`/admin/customers?${params.toString()}`)
  }

  const handleRoleUpdateConfirm = () => {
    if (!roleTarget) return
    startTransition(async () => {
      const res = await updateUserRole({
        user_id: roleTarget.user.id,
        role: roleTarget.newRole,
      })

      if (res.success) {
        success(
          `Updated role for ${roleTarget.user.full_name || 'user'} to "${roleTarget.newRole}".`
        )
        setRoleTarget(null)
        router.refresh()
      } else {
        error(res.error || 'Failed to update role.')
      }
    })
  }

  const isAdmin = currentUserRole === 'admin'

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 flex flex-wrap items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, email, or phone..."
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-dark text-ivory text-xs font-sans font-medium uppercase tracking-wider hover:bg-copper transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
          {['', 'customer', 'staff', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => handleRoleFilter(r)}
              className={`px-3 py-1 border capitalize transition-colors ${
                (searchParams.get('role') || '') === r
                  ? 'bg-copper text-ivory border-copper font-medium'
                  : 'bg-white text-muted border-[#DCC9A8]/80 hover:text-dark'
              }`}
            >
              {r ? r : 'All Users'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 overflow-x-auto shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Orders</th>
              <th className="px-6 py-3 text-right">Total Spent</th>
              <th className="px-6 py-3">Joined Date</th>
              {isAdmin && <th className="px-6 py-3 text-right">Role Management</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC9A8]/30">
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 7 : 6}
                  className="px-6 py-12 text-center text-muted"
                >
                  No registered users found matching the search.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-ivory/20 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="font-medium text-dark">
                      {c.full_name || 'Valued Customer'}
                    </div>
                    <div className="text-[10px] text-muted font-mono">
                      ID: {c.id.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="text-dark">{c.email || '—'}</div>
                    <div className="text-[10px] text-muted font-mono">{c.phone || '—'}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <RoleBadge role={c.role} />
                  </td>
                  <td className="px-6 py-3.5 text-center font-medium text-dark">
                    {c.order_count}
                  </td>
                  <td className="px-6 py-3.5 text-right font-medium text-dark">
                    ₹{c.total_spent.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-3.5 text-muted text-[11px]">
                    {new Date(c.created_at).toLocaleDateString('en-IN', {
                      dateStyle: 'medium',
                    })}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-3.5 text-right">
                      <select
                        value={c.role}
                        onChange={(e) =>
                          setRoleTarget({
                            user: c,
                            newRole: e.target.value as 'admin' | 'staff' | 'customer',
                          })
                        }
                        className="px-2 py-1 text-[11px] bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                      >
                        <option value="customer">Customer</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs font-sans text-muted px-1">
        Showing {customers.length} of {total} registered accounts
      </div>

      {/* Role Update Confirmation Modal */}
      <ConfirmModal
        isOpen={roleTarget !== null}
        onClose={() => setRoleTarget(null)}
        onConfirm={handleRoleUpdateConfirm}
        title="Confirm User Role Change"
        message={`Are you sure you want to change the role of "${
          roleTarget?.user.full_name || roleTarget?.user.email || 'this user'
        }" to "${roleTarget?.newRole}"? Staff and admins gain privileged access to store data.`}
        confirmLabel="Change Role"
        isDanger={roleTarget?.newRole === 'admin'}
        isLoading={isPending}
      />
    </div>
  )
}
