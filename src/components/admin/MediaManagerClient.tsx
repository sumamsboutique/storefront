'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { MediaFile } from '@/lib/admin/queries'
import { deleteMediaByPath } from '@/lib/admin/actions'
import { AdminCard } from '@/components/admin/AdminCard'
import { useToast } from '@/components/admin/AdminToast'
import { ConfirmModal } from '@/components/admin/AdminModal'

export function MediaManagerClient({
  files,
}: {
  files: MediaFile[]
}) {
  const { success, error } = useToast()
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopiedPath(path)
    success(`Copied path "${path}" to clipboard!`)
    setTimeout(() => setCopiedPath(null), 2500)
  }

  const handleDeleteRequest = (file: MediaFile) => {
    if (file.is_in_use) {
      error(
        `Cannot delete "${file.name}" because it is currently referenced by products or homepage banners.`
      )
      return
    }
    setDeleteTarget(file)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    const res = await deleteMediaByPath({ path: deleteTarget.path })
    if (!res.success) {
      error(res.error || 'Failed to delete asset.')
      setDeleteTarget(null)
      return
    }
    success(
      res.data?.managed_by_code
        ? `"${deleteTarget.name}" is a code-bundled asset and cannot be removed at runtime.`
        : `Removed asset "${deleteTarget.name}".`
    )
    setDeleteTarget(null)
  }

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter media assets by file name..."
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
          />
        </div>

        <div className="text-xs font-sans text-muted">
          {filtered.length} total brand assets
        </div>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((file) => (
          <AdminCard
            key={file.id}
            bodyClassName="p-3 flex flex-col justify-between h-full"
            className="group hover:border-copper transition-colors"
          >
            <div className="space-y-2">
              <div className="relative aspect-[3/4] bg-cream/40 overflow-hidden border border-[#DCC9A8]/40">
                {file.path.startsWith('/') || file.path.startsWith('http') ? (
                  <Image
                    src={file.path}
                    alt={file.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs text-muted">
                    {file.name}
                  </div>
                )}

                {file.is_in_use && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-dark/85 text-ivory text-[9px] font-sans font-medium uppercase tracking-wider">
                    In Use
                  </span>
                )}
              </div>

              <div>
                <h4
                  className="font-sans text-xs font-medium text-dark truncate"
                  title={file.name}
                >
                  {file.name}
                </h4>
                <p className="font-mono text-[10px] text-muted truncate">
                  {file.path}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#DCC9A8]/40 text-xs font-sans">
              <button
                type="button"
                onClick={() => handleCopy(file.path)}
                className={`text-xs font-medium transition-colors ${
                  copiedPath === file.path
                    ? 'text-copper font-bold'
                    : 'text-muted hover:text-dark'
                }`}
              >
                {copiedPath === file.path ? '✓ Copied' : 'Copy Path'}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteRequest(file)}
                disabled={file.is_in_use}
                className={`text-xs transition-colors ${
                  file.is_in_use
                    ? 'text-muted/40 cursor-not-allowed'
                    : 'text-[#A62719] hover:underline'
                }`}
                title={
                  file.is_in_use
                    ? 'Cannot delete an image that is actively in use'
                    : 'Delete unused asset'
                }
              >
                Delete
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Media Asset"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Make sure no external links rely on it.`}
        confirmLabel="Delete Asset"
        isDanger={true}
      />
    </div>
  )
}
