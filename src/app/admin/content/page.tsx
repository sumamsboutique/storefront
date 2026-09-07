import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminContentBlocks } from '@/lib/admin/queries'
import { ContentManagerClient } from '@/components/admin/ContentManagerClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminContentPage() {
  await requireAdminOrStaff()
  const blocks = await getAdminContentBlocks()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Homepage CMS' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Content Management System" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Homepage <span className="italic text-copper">CMS</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Edit brand copy, announcements, hero photography, featured collection curation, and footer links.
        </p>
      </div>

      <ContentManagerClient blocks={blocks} />
    </div>
  )
}
