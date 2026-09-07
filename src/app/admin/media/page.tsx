import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminMedia } from '@/lib/admin/queries'
import { MediaManagerClient } from '@/components/admin/MediaManagerClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminMediaPage() {
  await requireAdminOrStaff()
  const files = await getAdminMedia()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Media Library' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Asset Storage & Imagery" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Media <span className="italic text-copper">Library</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          High-resolution product captures, editorial lookbooks, banners, and heritage brand assets.
        </p>
      </div>

      <MediaManagerClient files={files} />
    </div>
  )
}
