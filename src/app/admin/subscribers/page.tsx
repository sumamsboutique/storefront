import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminSubscribers } from '@/lib/admin/queries'
import { removeSubscriber } from '@/lib/admin/actions'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { AdminBadge } from '@/components/admin/AdminBadge'

export default async function AdminSubscribersPage() {
  await requireAdminOrStaff()
  const { rows, total } = await getAdminSubscribers()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Newsletter Subscribers' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Email List Management" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Newsletter <span className="italic text-copper">Subscribers</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Emails collected from the storefront footer. Removing a subscriber stops
          future campaigns to that address.
        </p>
      </div>

      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 overflow-x-auto shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Subscribed At</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC9A8]/30">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted">
                  No subscribers yet. They will appear here as people sign up in the footer.
                </td>
              </tr>
            ) : (
              rows.map((s) => (
                <tr key={s.id} className="hover:bg-ivory/20 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-dark">{s.email}</td>
                  <td className="px-6 py-3.5 text-muted capitalize">{s.source}</td>
                  <td className="px-6 py-3.5">
                    <AdminBadge variant={s.is_active ? 'success' : 'danger'}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-3.5 text-muted text-[11px]">
                    {new Date(s.created_at).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    {/* ponytail: progressive-enhancement form, no client JS needed */}
                    <form action={async () => { await removeSubscriber(s.id) }}>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-white border border-[#DCC9A8] hover:border-danger text-muted hover:text-danger font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs font-sans text-muted px-1">
        Showing {rows.length} of {total} subscriber{total === 1 ? '' : 's'}
      </div>
    </div>
  )
}