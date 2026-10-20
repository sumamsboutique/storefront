'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { MediaFile, MediaSource } from '@/lib/admin/queries'
import { deleteMediaByPath } from '@/lib/admin/actions'
import { AdminCard } from '@/components/admin/AdminCard'
import { useToast } from '@/components/admin/AdminToast'
import { ConfirmModal } from '@/components/admin/AdminModal'

const SOURCE_META: Record<MediaSource, { label: string; desc: string }> = {
  product: { label: 'Product Photos', desc: 'Uploaded against a catalogue product.' },
  content: { label: 'Homepage & Content', desc: 'Referenced by a homepage content block, hero slide or banner.' },
  local: { label: 'Bundled Assets', desc: 'Files shipped in /public. Read-only at runtime.' },
}

const SOURCE_ORDER: MediaSource[] = ['product', 'content', 'local']

export function MediaManagerClient({
  files,
}: {
  files: MediaFile[]
}) {
  const { success, error } = useToast()
  const [copiedPath, setCopiedPath] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sourceFilter, setSourceFilter] = useState<MediaSource | 'all'>('all')

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopiedPath(path)
    success(`Copied path "${path}" to clipboard!`)
    setTimeout(() => setCopiedPath(null), 2500)
  }

  const handleDeleteRequest = (file: MediaFile) => {
    if (file.source !== 'product') {
      error(`"${file.name}" is bundled with the site and cannot be removed here.`)
      return
    }
    if (file.is_in_use) {
      error(`Cannot delete "${file.name}" while a product still uses it.`)
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
    success(`Removed asset "${deleteTarget.name}".`)
    setDeleteTarget(null)
  }

  const term = searchTerm.toLowerCase()
  const filtered = files.filter(
    (f) =>
      (sourceFilter === 'all' || f.source === sourceFilter) &&
      (f.name.toLowerCase().includes(term) || f.path.toLowerCase().includes(term))
  )

  const grouped = SOURCE_ORDER.map((source) => ({
    source,
    items: filtered.filter((f) => f.source === source),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-[#FDFBF7] border border-[#DCC9A8]/60 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter media assets by file name or path..."
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCC9A8]/80 text-dark font-sans focus:outline-none focus:border-copper"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', ...SOURCE_ORDER] as const).map((s) => {
            const count = s === 'all' ? files.length : files.filter((f) => f.source === s).length
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSourceFilter(s)}
                className={`px-2.5 py-1 text-[10px] font-sans font-medium uppercase tracking-wider border transition-colors ${
                  sourceFilter === s
                    ? 'bg-copper text-ivory border-copper'
                    : 'bg-white text-muted border-[#DCC9A8]/70 hover:border-copper'
                }`}
              >
                {s === 'all' ? 'All' : SOURCE_META[s].label} ({count})
              </button>
            )
          })}
        </div>

        <div className="text-xs font-sans text-muted">
          {filtered.length} of {files.length} assets
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="font-sans text-xs text-muted py-8 text-center">
          No media assets match this filter.
        </p>
      )}

      {/* Grouped Grid of Media Assets */}
      {grouped.map(({ source, items }) => (
        <div key={source} className="space-y-3">
          <div className="flex items-baseline gap-3 border-b border-[#DCC9A8]/40 pb-2">
            <h3 className="font-display text-lg font-light text-dark">{SOURCE_META[source].label}</h3>
            <span className="font-sans text-[10px] text-muted">
              {items.length} {items.length === 1 ? 'asset' : 'assets'}
            </span>
            <span className="font-sans text-[10px] text-muted ml-auto hidden sm:block">
              {SOURCE_META[source].desc}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((file) => (
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
                    {!file.is_in_use && source === 'content' && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-cream/90 text-muted text-[9px] font-sans font-medium uppercase tracking-wider">
                        Draft only
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
                    <p className="font-mono text-[10px] text-muted truncate" title={file.path}>
                      {file.path}
                    </p>
                    <p className="font-sans text-[10px] text-muted mt-1 truncate" title={file.used_by.join(', ')}>
                      {file.used_by.join(', ')}
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
                    disabled={file.source !== 'product'}
                    className={`text-xs transition-colors ${
                      file.source !== 'product'
                        ? 'text-muted/40 cursor-not-allowed'
                        : 'text-[#A62719] hover:underline'
                    }`}
                    title={
                      file.source !== 'product'
                        ? 'Bundled or content-managed assets are removed by editing the site, not here'
                        : file.is_in_use
                          ? 'Cannot delete an image a product still uses'
                          : 'Delete unused asset'
                    }
                  >
                    Delete
                  </button>
                </div>
              </AdminCard>
            ))}
          </div>
        </div>
      ))}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Media Asset"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This removes the image row from the product record.`}
        confirmLabel="Delete Asset"
        isDanger={true}
      />
    </div>
  )
}
