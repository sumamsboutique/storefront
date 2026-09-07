'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export type ImageItem = {
  id?: string
  storage_path: string
  alt_text: string
  display_order: number
  is_primary: boolean
  aspect_ratio?: string
}

export function ImageGalleryManager({
  images,
  onChange,
}: {
  images: ImageItem[]
  onChange: (images: ImageItem[]) => void
}) {
  const [newPath, setNewPath] = useState('')
  const [newAlt, setNewAlt] = useState('')
  const [error, setError] = useState('')

  const handleAdd = () => {
    setError('')
    if (!newPath.trim()) {
      setError('Please provide an image path or URL.')
      return
    }
    if (!newAlt.trim()) {
      setError('Alt text is required for accessibility.')
      return
    }

    const newImg: ImageItem = {
      storage_path: newPath.trim(),
      alt_text: newAlt.trim(),
      display_order: images.length,
      is_primary: images.length === 0, // make first image primary automatically
      aspect_ratio: '3/4',
    }

    onChange([...images, newImg])
    setNewPath('')
    setNewAlt('')
  }

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index)
    // if removed image was primary, set new first image as primary
    if (images[index].is_primary && updated.length > 0) {
      updated[0].is_primary = true
    }
    onChange(updated)
  }

  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      is_primary: i === index,
    }))
    onChange(updated)
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= images.length) return
    const copy = [...images]
    const temp = copy[index]
    copy[index] = copy[targetIdx]
    copy[targetIdx] = temp
    // update display_order
    onChange(copy.map((img, i) => ({ ...img, display_order: i })))
  }

  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images]
    updated[index] = { ...updated[index], alt_text: alt }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {/* Existing Images List */}
      {images.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-[#DCC9A8]/60 bg-ivory/40">
          <p className="text-xs font-sans text-muted">
            No images uploaded yet. Add high-resolution product photos below.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative border p-3 bg-white transition-all ${
                img.is_primary ? 'border-copper ring-1 ring-copper' : 'border-[#DCC9A8]/60'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[3/4] bg-cream/40 overflow-hidden mb-2.5">
                {img.storage_path.startsWith('/') || img.storage_path.startsWith('http') ? (
                  <Image
                    src={img.storage_path}
                    alt={img.alt_text}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs text-muted">
                    {img.storage_path}
                  </div>
                )}

                {img.is_primary && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-copper text-ivory text-[9px] font-sans font-medium uppercase tracking-wider shadow">
                    Primary
                  </span>
                )}
              </div>

              {/* Alt Text Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-medium uppercase tracking-wider text-muted">
                  Alt text <span className="text-[#A62719]">*</span>
                </label>
                <input
                  type="text"
                  value={img.alt_text}
                  onChange={(e) => handleAltChange(idx, e.target.value)}
                  placeholder="e.g. Kadwa Benarasi in rich crimson"
                  className="w-full px-2 py-1 text-xs border border-[#DCC9A8]/60 font-sans text-dark focus:outline-none focus:border-copper"
                />
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#DCC9A8]/40 text-[11px] font-sans">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="px-1.5 py-0.5 text-muted hover:text-dark disabled:opacity-25"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === images.length - 1}
                    className="px-1.5 py-0.5 text-muted hover:text-dark disabled:opacity-25"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {!img.is_primary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      className="text-xs text-copper hover:underline"
                    >
                      Make Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-xs text-[#A62719] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Form */}
      <div className="p-4 border border-[#DCC9A8]/60 bg-cream/30 space-y-3">
        <h4 className="font-sans text-xs font-medium uppercase tracking-wider text-dark">
          Add New Product Image
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-sans text-muted mb-1">
              Storage Path or URL
            </label>
            <input
              type="text"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="/Products/crimson-kadwa-benarasi.png"
              className="w-full px-3 py-1.5 text-xs border border-[#DCC9A8]/80 bg-white font-sans text-dark focus:outline-none focus:border-copper"
            />
          </div>
          <div>
            <label className="block text-[11px] font-sans text-muted mb-1">
              Alt Text (Required for accessibility)
            </label>
            <input
              type="text"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              placeholder="Close-up of golden zari kadwa motif"
              className="w-full px-3 py-1.5 text-xs border border-[#DCC9A8]/80 bg-white font-sans text-dark focus:outline-none focus:border-copper"
            />
          </div>
        </div>

        {error && <p className="text-xs text-[#A62719] font-sans">{error}</p>}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-1.5 text-xs font-sans font-medium uppercase tracking-wider bg-dark text-ivory hover:bg-copper transition-colors"
          >
            + Add Image
          </button>
        </div>
      </div>
    </div>
  )
}
