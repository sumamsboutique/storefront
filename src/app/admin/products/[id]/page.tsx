import React from 'react'
import { notFound } from 'next/navigation'
import { requireAdminOrStaff } from '@/lib/admin/auth'
import { getAdminProductById, getAdminCategories } from '@/lib/admin/queries'
import { ProductForm } from '@/components/admin/ProductForm'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { CATALOG } from '@/lib/catalog'

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminOrStaff()
  const { id } = await params

  const [dbProduct, categories] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories(),
  ])

  // Fallback to static catalog if product is not in database
  let product = dbProduct

  if (!product) {
    const staticItem = CATALOG.find((c) => c.id === id)
    if (staticItem) {
      product = {
        id: staticItem.id,
        name: staticItem.name,
        slug: staticItem.slug,
        category_id: null,
        short_description: staticItem.sub || '',
        description: '',
        fabric_weave_details: staticItem.weave,
        occasion_tags: staticItem.occasion ? [staticItem.occasion] : [],
        dimensions: '',
        care_instructions: 'Dry clean only',
        shipping_returns_note: 'Dispatches within 48 hours',
        price: staticItem.priceNum,
        compare_at_price: null,
        sku: `SKU-${staticItem.slug.slice(0, 8).toUpperCase()}`,
        badge_text: staticItem.badge,
        badge_color: '#BF5E18',
        is_featured_large: false,
        stock_status: staticItem.sold ? 'sold' : 'in_stock',
        is_active: true,
        is_published: true,
        seo_title: `${staticItem.name} | Sumam's Boutique`,
        seo_description: staticItem.sub,
        product_images: (staticItem.images || []).map((path, idx) => ({
          storage_path: path,
          alt_text: staticItem.name,
          display_order: idx,
          is_primary: idx === 0,
        })),
        product_variants: [
          {
            variant_type: 'Standard',
            variant_value: 'Default',
            stock_quantity: staticItem.sold ? 0 : 5,
            price_override: null,
          },
        ],
      }
    }
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[
          { label: 'Products', href: '/admin/products' },
          { label: product.name },
        ]}
      />

      <div className="border-b border-[#DCC9A8]/40 pb-4">
        <Eyebrow label="Edit Product" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          {product.name}
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Update pricing, variants, PDP accordions, photography, and visibility.
        </p>
      </div>

      <ProductForm
        isEdit={true}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          category_id: product.category_id,
          sku: product.sku,
          price: product.price,
          compare_at_price: product.compare_at_price,
          badge_text: product.badge_text,
          badge_color: product.badge_color,
          is_featured_large: product.is_featured_large,
          stock_status: product.stock_status,
          is_active: product.is_active,
          is_published: product.is_published,
          short_description: product.short_description,
          description: product.description,
          fabric_weave_details: product.fabric_weave_details,
          dimensions: product.dimensions,
          care_instructions: product.care_instructions,
          shipping_returns_note: product.shipping_returns_note,
          occasion_tags: product.occasion_tags || [],
          seo_title: product.seo_title,
          seo_description: product.seo_description,
          images: product.product_images || [],
          variants: product.product_variants || [],
        }}
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
