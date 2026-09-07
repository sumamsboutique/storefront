import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminCategories } from '@/lib/admin/queries'
import { CategoryManagerClient } from '@/components/admin/CategoryManagerClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminCategoriesPage() {
  await requireAdminOrStaff()
  const categories = await getAdminCategories()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Categories' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Taxonomy & Navigation" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Category <span className="italic text-copper">Structure</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Organize Bengal handloom varieties, jewellery collections, Bengali typography, and homepage highlights.
        </p>
      </div>

      <CategoryManagerClient categories={categories} />
    </div>
  )
}
