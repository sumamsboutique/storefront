'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminCategoryItem } from '@/lib/admin/queries'
import { AdminCard } from '@/components/admin/AdminCard'
import { AdminModal, ConfirmModal } from '@/components/admin/AdminModal'
import { ActiveBadge } from '@/components/admin/AdminBadge'
import { useToast } from '@/components/admin/AdminToast'
import { saveCategory, deleteCategory, reorderCategories } from '@/lib/admin/actions'
import type { CategoryFormValues } from '@/lib/admin/schemas'

export function CategoryManagerClient({
  categories,
}: {
  categories: AdminCategoryItem[]
}) {
  const router = useRouter()
  const { success, error } = useToast()
  const [isPending, startTransition] = useTransition()

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<AdminCategoryItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminCategoryItem | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [nameBn, setNameBn] = useState('')
  const [slug, setSlug] = useState('')
  const [parentId, setParentId] = useState<string>('')
  const [isHeroTile, setIsHeroTile] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [displayOrder, setDisplayOrder] = useState(0)
  const [gradient, setGradient] = useState('')

  const openCreateModal = () => {
    setEditingCategory(null)
    setName('')
    setNameBn('')
    setSlug('')
    setParentId('')
    setIsHeroTile(false)
    setIsActive(true)
    setDisplayOrder(categories.length)
    setGradient('linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)')
    setIsFormOpen(true)
  }

  const openEditModal = (cat: AdminCategoryItem) => {
    setEditingCategory(cat)
    setName(cat.name)
    setNameBn(cat.name_bn || '')
    setSlug(cat.slug)
    setParentId(cat.parent_id || '')
    setIsHeroTile(cat.is_hero_tile)
    setIsActive(cat.is_active)
    setDisplayOrder(cat.display_order)
    setGradient(cat.tile_gradient_fallback || '')
    setIsFormOpen(true)
  }

  const handleNameChange = (val: string) => {
    setName(val)
    if (!editingCategory && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      )
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: CategoryFormValues = {
      name: name.trim(),
      name_bn: nameBn.trim() || null,
      slug: slug.trim().toLowerCase(),
      parent_id: parentId || null,
      is_hero_tile: isHeroTile,
      display_order: displayOrder,
      is_active: isActive,
      tile_gradient_fallback: gradient.trim() || null,
    }

    startTransition(async () => {
      const res = await saveCategory(editingCategory?.id || null, payload)
      if (res.success) {
        success(editingCategory ? 'Category updated.' : 'Category created.')
        setIsFormOpen(false)
        router.refresh()
      } else {
        error(res.error || 'Failed to save category.')
      }
    })
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    startTransition(async () => {
      const res = await deleteCategory(deleteTarget.id)
      if (res.success) {
        success(`Deleted category "${deleteTarget.name}".`)
        setDeleteTarget(null)
        router.refresh()
      } else {
        error(res.error || 'Cannot delete category.')
      }
    })
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= categories.length) return

    const copy = [...categories]
    const temp = copy[index]
    copy[index] = copy[targetIdx]
    copy[targetIdx] = temp

    startTransition(async () => {
      const res = await reorderCategories(copy.map((c) => c.id))
      if (res.success) {
        router.refresh()
      } else {
        error('Failed to update order.')
      }
    })
  }

  // Potential parent categories (exclude the one currently being edited to prevent cycles)
  const availableParents = categories.filter(
    (c) => !editingCategory || c.id !== editingCategory.id
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-copper hover:bg-[#A04A18] text-ivory text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm"
        >
          + Add Category
        </button>
      </div>

      <AdminCard
        title="Category Hierarchy & Weaves"
        subtitle="Manage primary product lines (Sarees, Fine Jewellery) and authentic weave classifications."
      >
        <div className="overflow-x-auto -mx-6 -my-6">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-cream/40 border-b border-[#DCC9A8]/50 text-muted uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3 w-16 text-center">Order</th>
                <th className="px-6 py-3">Category / Weave</th>
                <th className="px-6 py-3">Bengali Script</th>
                <th className="px-6 py-3">Parent Line</th>
                <th className="px-6 py-3 text-center">Products</th>
                <th className="px-6 py-3">Homepage Tile</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCC9A8]/30">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-muted">
                    No categories registered yet. Click &quot;+ Add Category&quot; to establish your catalog structure.
                  </td>
                </tr>
              ) : (
                categories.map((cat, idx) => (
                  <tr key={cat.id} className="hover:bg-ivory/20 transition-colors">
                    {/* Move controls */}
                    <td className="px-6 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'up')}
                          disabled={idx === 0 || isPending}
                          className="px-1.5 py-0.5 text-muted hover:text-dark disabled:opacity-25"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(idx, 'down')}
                          disabled={idx === categories.length - 1 || isPending}
                          className="px-1.5 py-0.5 text-muted hover:text-dark disabled:opacity-25"
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>
                    </td>

                    {/* Name & Slug */}
                    <td className="px-6 py-3.5">
                      <div className="font-medium text-dark">{cat.name}</div>
                      <div className="text-[10px] font-mono text-muted">{cat.slug}</div>
                    </td>

                    {/* Bengali Name */}
                    <td className="px-6 py-3.5 font-bengali text-sm text-dark">
                      {cat.name_bn || '—'}
                    </td>

                    {/* Parent Category */}
                    <td className="px-6 py-3.5 text-muted">
                      {cat.parent_name ? (
                        <span className="px-2 py-0.5 bg-cream/80 text-dark text-[11px]">
                          {cat.parent_name}
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-copper font-medium">
                          Root Collection
                        </span>
                      )}
                    </td>

                    {/* Product count */}
                    <td className="px-6 py-3.5 text-center font-medium text-dark">
                      {cat.product_count}
                    </td>

                    {/* Hero Tile setting */}
                    <td className="px-6 py-3.5">
                      {cat.is_hero_tile ? (
                        <span className="px-2 py-0.5 bg-gold/15 text-[#9A6207] border border-gold/30 text-[10px] uppercase font-medium">
                          Hero Showcase
                        </span>
                      ) : (
                        <span className="text-muted text-[11px]">Standard</span>
                      )}
                    </td>

                    {/* Active */}
                    <td className="px-6 py-3.5">
                      <ActiveBadge isActive={cat.is_active} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="text-copper hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(cat)}
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
      </AdminCard>

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                Category Name (English) <span className="text-[#A62719]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Baluchari"
                className="w-full px-3 py-2 text-xs border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                Bengali Script Name
              </label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="বালুচরি"
                className="w-full px-3 py-2 text-xs border border-[#DCC9A8]/80 text-dark font-bengali focus:outline-none focus:border-copper"
              />
            </div>
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
                placeholder="baluchari"
                className="w-full px-3 py-2 text-xs font-mono border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
                Parent Category
              </label>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
              >
                <option value="">None (Top-Level Category)</option>
                {availableParents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-muted mb-1.5">
              Tile Gradient Fallback (CSS)
            </label>
            <input
              type="text"
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              placeholder="linear-gradient(155deg, #2A0D06, #7A2C0C 50%, #BF5E18)"
              className="w-full px-3 py-2 text-xs font-mono border border-[#DCC9A8]/80 text-dark focus:outline-none focus:border-copper"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-[#DCC9A8]/40">
            <label className="flex items-center gap-2 text-xs font-sans text-dark cursor-pointer">
              <input
                type="checkbox"
                checked={isHeroTile}
                onChange={(e) => setIsHeroTile(e.target.checked)}
                className="h-4 w-4 text-copper rounded focus:ring-copper"
              />
              <span>Homepage Hero Showcase Tile</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-sans text-dark cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 text-copper rounded focus:ring-copper"
              />
              <span>Active in Navigation</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCC9A8]/40">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-muted hover:text-dark border border-[#DCC9A8]/60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 text-xs font-sans font-medium uppercase tracking-wider bg-copper hover:bg-[#A04A18] text-ivory transition-colors disabled:opacity-50"
            >
              {isPending ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deleteTarget?.name}"? If products or subcategories are assigned, deletion will be blocked.`}
        confirmLabel="Delete Category"
        isDanger={true}
        isLoading={isPending}
      />
    </div>
  )
}
