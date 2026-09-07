'use client'

import React, { useEffect } from 'react'

export function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
  children: React.ReactNode
  maxWidth?: string
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full ${maxWidth} bg-[#FDFBF7] border border-[#DCC9A8] rounded-lg shadow-2xl overflow-hidden transition-all duration-200`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-[#DCC9A8]/50 px-6 py-4 bg-cream/40">
          <h3 className="font-display text-lg font-medium text-dark">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-dark p-1 text-sm font-sans"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmLabel = 'Delete',
  isDanger = true,
  isLoading = false,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmLabel?: string
  isDanger?: boolean
  isLoading?: boolean
}) {
  return (
    <AdminModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="font-sans text-sm text-dark/80 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCC9A8]/40">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider text-muted hover:text-dark bg-transparent border border-[#DCC9A8]/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2 text-xs font-sans font-medium uppercase tracking-wider text-ivory transition-colors ${
              isDanger
                ? 'bg-[#A62719] hover:bg-[#861F14]'
                : 'bg-copper hover:bg-[#A04A18]'
            } disabled:opacity-50`}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </AdminModal>
  )
}
