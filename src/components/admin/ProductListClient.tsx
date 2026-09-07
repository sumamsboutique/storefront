'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AdminProductItem } from '@/lib/admin/queries'
import {
  StockBadge,
  PublicationBadge,
  ActiveBadge,
} from '@/components/admin/AdminBadge'
import { ConfirmModal } from '@/components/admin/AdminModal'
import { useToast } from '@/components/admin/AdminToast'
import { deleteProduct, bulkUpdateProducts } from '@/lib/admin/actions'

export function ProductListClient({
  products,
  total,
  currentPage,
  categories,
}: {
  products: AdminProductItem[]
  total: number
  currentPage: number
  categories: { id: string; name: string }[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<AdminProductItem | null>(null)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  // Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/admin/products?${params.toString()}`)
  }

  // Filter change
  const handleFilterChange = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val) {
      params.set(key, val)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    router.push(`/admin/products?${params.toString()}`)
  }

  // Select all / toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(products.map((p) => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Bulk actions
  const handleBulkAction = (action: 'publish' | 'unpublish' | 'activate' | 'deactivate') => {
    if (selectedIds.length === 0) return
    startTransition(async () => {
      const res = await bulkUpdateProducts(selectedIds, action)
      if (res.success) {
        success(`Successfully updated ${selectedIds.length} products.`)
        setSelectedIds([])
        router.refresh()
      } else {
        error(res.error || 'Bulk operation failed.')
      }
    })
  }

  // Delete product
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    startTransition(async () => {
      const res = await deleteProduct(deleteTarget.id)
      if (res.success) {
        success(`Deleted product "${deleteTarget.name}".`)
        setDeleteTarget(null)
        router.refresh()
      } else {
        error(res.error || 'Failed to delete product.')
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, SKU, or weave..."
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-dark text-ivory text-xs font-sans font-medium uppercase tracking-wider hover:bg-copper transition-colors"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          {/* Category */}
          <select
            value={searchParams.get('categoryId') || ''}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Stock Status */}
          <select
            value={searchParams.get('stockStatus') || ''}
            onChange={(e) => handleFilterChange('stockStatus', e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          >
            <option value="">All Stock</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="sold">Sold</option>
          </select>

          {/* Published */}
          <select
            value={searchParams.get('published') || ''}
            onChange={(e) => handleFilterChange('published', e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
          >
            <option value="">All Statuses</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions Banner */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-cream border border-gold/40 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="font-medium text-dark">
            {selectedIds.length} product(s) selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('publish')}
              disabled={isPending}
              className="px-2.5 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-dark transition-colors"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction('unpublish')}
              disabled={isPending}
              className="px-2.5 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-dark transition-colors"
            >
              Unpublish
            </button>
            <button
              onClick={() => handleBulkAction('activate')}
              disabled={isPending}
              className="px-2.5 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-dark transition-colors"
            >
              Activate
            </button>
            <button
              onClick={() => handleBulkAction('deactivate')}
              disabled={isPending}
              className="px-2.5 py-1 bg-white border border-[#DCC9A8] hover:border-copper text-dark transition-colors"
            >
              Deactivate
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 overflow-x-auto shadow-sm">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 && selectedIds.length === products.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded text-copper focus:ring-copper"
                />
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Inventory</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC9A8]/30">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted">
                  No products found matching your search and filter criteria.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="rounded text-copper focus:ring-copper"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-13 bg-cream/60 overflow-hidden border border-[#DCC9A8]/40 shrink-0">
                        {p.primary_image ? (
                          <Image
                            src={p.primary_image}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[8px] text-muted">
                            IMG
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-dark hover:text-copper transition-colors">
                          <Link href={`/admin/products/${p.id}`}>{p.name}</Link>
                        </div>
                        <div className="text-[10px] text-muted font-mono">
                          {p.sku || p.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {p.category_name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-dark">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                    {p.compare_at_price && (
                      <div className="text-[10px] text-muted line-through">
                        ₹{p.compare_at_price.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StockBadge status={p.stock_status} />
                  </td>
                  <td className="px-4 py-3 space-y-1">
                    <div>
                      <PublicationBadge isPublished={p.is_published} />
                    </div>
                    <div>
                      <ActiveBadge isActive={p.is_active} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-copper hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(p)}
                        className="text-[#A62719] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Total & Pagination */}
      <div className="flex items-center justify-between text-xs font-sans text-muted px-1">
        <div>Total: {total} products</div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? If it has been ordered by customers, deletion will be blocked.`}
        confirmLabel="Delete Product"
        isDanger={true}
        isLoading={isPending}
      />
    </div>
  )
}
