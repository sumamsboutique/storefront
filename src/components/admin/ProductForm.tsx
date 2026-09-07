'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/admin/AdminToast'
import { saveProduct } from '@/lib/admin/actions'
import { AdminCard } from '@/components/admin/AdminCard'
import { ImageGalleryManager, type ImageItem } from '@/components/admin/ImageUploader'
import { VariantEditor, type VariantItem } from '@/components/admin/VariantEditor'
import type { ProductFormValues } from '@/lib/admin/schemas'

export type CategoryOption = {
  id: string
  name: string
  parent_id: string | null
  parent_name?: string | null
}

export function ProductForm({
  initialData,
  categories,
  isEdit = false,
}: {
  initialData?: Partial<ProductFormValues> & { id?: string }
  categories: CategoryOption[]
  isEdit?: boolean
}) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  // Form State
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '')
  const [sku, setSku] = useState(initialData?.sku || '')
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '')
  const [comparePrice, setComparePrice] = useState(
    initialData?.compare_at_price ? String(initialData.compare_at_price) : ''
  )
  const [badgeText, setBadgeText] = useState(initialData?.badge_text || '')
  const [badgeColor, setBadgeColor] = useState(initialData?.badge_color || '#BF5E18')
  const [stockStatus, setStockStatus] = useState(initialData?.stock_status || 'in_stock')
  const [isFeaturedLarge, setIsFeaturedLarge] = useState(
    initialData?.is_featured_large ?? false
  )
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true)
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? false)

  // Descriptions & Accordions
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || ''
  )
  const [description, setDescription] = useState(initialData?.description || '')
  const [fabricWeave, setFabricWeave] = useState(
    initialData?.fabric_weave_details || ''
  )
  const [dimensions, setDimensions] = useState(initialData?.dimensions || '')
  const [careInstructions, setCareInstructions] = useState(
    initialData?.care_instructions || ''
  )
  const [shippingNote, setShippingNote] = useState(
    initialData?.shipping_returns_note || ''
  )
  const [occasionTagsStr, setOccasionTagsStr] = useState(
    (initialData?.occasion_tags || []).join(', ')
  )

  // Images & Variants
  const [images, setImages] = useState<ImageItem[]>(
    (initialData?.images as ImageItem[]) || []
  )
  const [variants, setVariants] = useState<VariantItem[]>(
    (initialData?.variants as VariantItem[]) || []
  )

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || '')
  const [seoDesc, setSeoDesc] = useState(initialData?.seo_description || '')

  // Auto slug generation from name
  const handleNameChange = (val: string) => {
    setName(val)
    if (!isEdit && !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setSlug(generated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const occasion_tags = occasionTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const payload: ProductFormValues = {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      category_id: categoryId || null,
      sku: sku.trim() || null,
      price: parseFloat(price) || 0,
      compare_at_price: comparePrice ? parseFloat(comparePrice) : null,
      badge_text: badgeText.trim() || null,
      badge_color: badgeColor.trim() || null,
      stock_status: stockStatus as 'in_stock' | 'low_stock' | 'out_of_stock' | 'sold',
      is_featured_large: isFeaturedLarge,
      is_active: isActive,
      is_published: isPublished,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      fabric_weave_details: fabricWeave.trim() || null,
      dimensions: dimensions.trim() || null,
      care_instructions: careInstructions.trim() || null,
      shipping_returns_note: shippingNote.trim() || null,
      occasion_tags,
      images: images.map((img) => ({
        ...img,
        aspect_ratio: img.aspect_ratio || '3/4',
      })),
      variants,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDesc.trim() || null,
    }

    startTransition(async () => {
      const res = await saveProduct(initialData?.id || null, payload)
      if (res.success) {
        success(isEdit ? 'Product updated successfully.' : 'Product created successfully.')
        router.push('/admin/products')
        router.refresh()
      } else {
        error(res.error || 'Failed to save product.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Action Header */}
      <div className="flex items-center justify-between gap-4 sticky top-16 z-20 bg-ivory/95 backdrop-blur py-3 border-b border-[#DCC9A8]/40">
        <Link
          href="/admin/products"
          className="text-xs font-sans text-muted hover:text-dark transition-colors"
        >
          ← Cancel and Return
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-copper hover:bg-[#A04A18] text-ivory text-xs font-sans font-medium uppercase tracking-wider transition-colors disabled:opacity-50 shadow-sm"
          >
            {isPending ? 'Saving Product...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Core Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <AdminCard title="General Information">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Product Name <span className="text-[#A62719]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Crimson Kadwa Jangla Benarasi"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                    URL Slug <span className="text-[#A62719]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="crimson-kadwa-jangla-benarasi"
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.parent_name ? `${c.parent_name} → ${c.name}` : c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Short Description (PLP / Card Subtitle)
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="e.g. Handwoven Kadwa Jangla in pure Katan silk"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed heritage craft notes, story of the weave, and master weaver background..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </AdminCard>

          {/* Pricing & Inventory */}
          <AdminCard title="Pricing & Inventory">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Price (₹) <span className="text-[#A62719]">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="34500"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Compare at Price (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder="Optional original price"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="SB-BEN-001"
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </AdminCard>

          {/* Image Gallery */}
          <AdminCard
            title="Product Imagery"
            subtitle="Multi-angle photography with mandatory alt text for accessibility."
          >
            <ImageGalleryManager images={images} onChange={setImages} />
          </AdminCard>

          {/* PDP Specifications & Accordions */}
          <AdminCard
            title="PDP Accordion Content"
            subtitle="Detailed accordion content rendered on the customer Product Detail Page."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Fabric & Weave Details (Accordion 1)
                </label>
                <textarea
                  rows={2}
                  value={fabricWeave}
                  onChange={(e) => setFabricWeave(e.target.value)}
                  placeholder="Pure Katan Silk with gold zari kadwa motifs..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Dimensions (Accordion 2)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="Length: 5.5 meters, Width: 46 inches. Unstitched blouse piece: 0.8 meters."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Care Instructions (Accordion 3)
                </label>
                <input
                  type="text"
                  value={careInstructions}
                  onChange={(e) => setCareInstructions(e.target.value)}
                  placeholder="Dry clean only. Store wrapped in muslin cloth."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Shipping & Returns Note (Accordion 4)
                </label>
                <input
                  type="text"
                  value={shippingNote}
                  onChange={(e) => setShippingNote(e.target.value)}
                  placeholder="Dispatches within 48 hours. Complimentary express courier across India."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  Occasion Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={occasionTagsStr}
                  onChange={(e) => setOccasionTagsStr(e.target.value)}
                  placeholder="Bridal, Wedding, Festive, Heirloom, Reception"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </AdminCard>

          {/* Variants */}
          <AdminCard
            title="Product Variants"
            subtitle="Optional variants (e.g. stitched/unstitched blouse piece, size, color) with custom stock."
          >
            <VariantEditor variants={variants} onChange={setVariants} />
          </AdminCard>

          {/* SEO Metadata */}
          <AdminCard title="Search Engine Optimization (SEO)">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Crimson Kadwa Benarasi Handloom Saree | Sumam's Boutique"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  placeholder="Discover authentic Bengal handloom sarees and heritage jewellery hand-crafted in Varanasi and Bengal..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Right 1 Column: Publication, Badges & Merchandising */}
        <div className="space-y-6">
          {/* Publication Status */}
          <AdminCard title="Status & Visibility">
            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between p-3 border border-[#DCC9A8]/40 bg-white">
                <div>
                  <div className="font-medium text-dark">Published</div>
                  <div className="text-[10px] text-muted">Visible on storefront</div>
                </div>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 text-copper rounded focus:ring-copper"
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-[#DCC9A8]/40 bg-white">
                <div>
                  <div className="font-medium text-dark">Active</div>
                  <div className="text-[10px] text-muted">Enabled in system</div>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-copper rounded focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
                  Inventory State
                </label>
                <select
                  value={stockStatus}
                  onChange={(e) =>
                    setStockStatus(e.target.value as 'in_stock' | 'low_stock' | 'out_of_stock' | 'sold')
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </AdminCard>

          {/* Badges & Merchandising */}
          <AdminCard title="Merchandising Badges">
            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. Exclusive, Bestseller, Heirloom"
                  className="w-full px-3 py-2 bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-muted mb-1.5">
                  Badge Color
                </label>
                <select
                  value={badgeColor}
                  onChange={(e) => setBadgeColor(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
                >
                  <option value="#BF5E18">Copper Accent (#BF5E18)</option>
                  <option value="#D4880A">Gold Accent (#D4880A)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#DCC9A8]/40 bg-white mt-4">
                <div>
                  <div className="font-medium text-dark">Featured Large Card</div>
                  <div className="text-[10px] text-muted">
                    Renders 2x width on homepage collection grid
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isFeaturedLarge}
                  onChange={(e) => setIsFeaturedLarge(e.target.checked)}
                  className="h-4 w-4 text-copper rounded focus:ring-copper"
                />
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </form>
  )
}
