'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  type: ToastType
  message: string
}

type ToastContextType = {
  toast: (message: string, type?: ToastType) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }, [])

  const contextValue = {
    toast: addToast,
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    warning: (msg: string) => addToast(msg, 'warning'),
    info: (msg: string) => addToast(msg, 'info'),
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 shadow-lg border text-sm font-sans transition-all duration-300 ${
              t.type === 'success'
                ? 'bg-cream text-dark border-gold/60 border-l-4 border-l-copper'
                : t.type === 'error'
                ? 'bg-[#FDF2F0] text-[#7A1C12] border-[#E8A59E] border-l-4 border-l-[#C43828]'
                : t.type === 'warning'
                ? 'bg-[#FEF9E7] text-[#78540B] border-[#F2DE9C] border-l-4 border-l-gold'
                : 'bg-ivory text-dark border-[#DCC9A8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {t.type === 'success' && (
                <span className="text-copper shrink-0">✓</span>
              )}
              {t.type === 'error' && (
                <span className="text-[#C43828] shrink-0 font-bold">!</span>
              )}
              {t.type === 'warning' && (
                <span className="text-gold shrink-0">▲</span>
              )}
              <span className="leading-snug">{t.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="text-muted hover:text-dark text-xs p-1"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
