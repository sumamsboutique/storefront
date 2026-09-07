import React from 'react'
import Link from 'next/link'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminProducts, getAdminCategories } from '@/lib/admin/queries'
import { ProductListClient } from '@/components/admin/ProductListClient'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    categoryId?: string
    stockStatus?: string
    published?: string
    active?: string
    page?: string
  }
}) {
  await requireAdminOrStaff()

  const page = parseInt(searchParams.page || '1') || 1
  const [{ products, total }, categories] = await Promise.all([
    getAdminProducts({
      search: searchParams.search,
      categoryId: searchParams.categoryId,
      stockStatus: searchParams.stockStatus,
      published: searchParams.published,
      active: searchParams.active,
      page,
      limit: 20,
    }),
    getAdminCategories(),
  ])

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'Products' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#DCC9A8]/40 pb-5">
        <div>
          <Eyebrow label="Catalog Management" hairline={false} />
          <h1 className="font-display text-3xl font-light text-dark">
            All <span className="italic text-copper">Products</span>
          </h1>
          <p className="font-sans text-xs text-muted mt-1">
            Manage handloom sarees, fine jewellery, pricing, inventory, and status.
          </p>
        </div>

        <div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-copper hover:bg-[#A04A18] text-ivory text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>+</span> Create New Product
          </Link>
        </div>
      </div>

      <ProductListClient
        products={products}
        total={total}
        currentPage={page}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  )
}
