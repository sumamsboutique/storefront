import React from 'react'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminCategories } from '@/lib/admin/queries'
import { ProductForm } from '@/components/admin/ProductForm'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminNewProductPage() {
  await requireAdminOrStaff()
  const categories = await getAdminCategories()

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: 'Products', href: '/admin/products' },
          { label: 'New Product' },
        ]}
      />

      <div className="border-b border-[#DCC9A8]/40 pb-4">
        <Eyebrow label="New Catalog Item" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          Add <span className="italic text-copper">Product</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Create a new handloom saree or jewellery piece with images, pricing, and craft notes.
        </p>
      </div>

      <ProductForm
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          parent_id: c.parent_id,
          parent_name: c.parent_name,
        }))}
      />
    </div>
  )
}
