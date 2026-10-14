'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { firstEnabled, selectedIndex, stepIndex, type DropdownOption } from '@/lib/dropdown'

export type { DropdownOption }

type MenuPos = {
  top?: number
  bottom?: number
  left: number
  minWidth: number
  maxWidth: number
}

/** Place the menu under (or above) the trigger, kept inside the viewport. */
function placeMenu(r: DOMRect): MenuPos {
  const gap = 4
  const vh = window.innerHeight
  const vw = window.innerWidth
  const up = r.bottom + 280 > vh && r.top > 280
  const maxW = vw - r.left - 8
  const minWidth = Math.max(120, Math.min(r.width, maxW))
  return {
    top: up ? undefined : r.bottom + gap,
    bottom: up ? vh - r.top + gap : undefined,
    left: r.left,
    minWidth,
    maxWidth: Math.max(minWidth, Math.min(360, maxW)),
  }
}

/**
 * Custom listbox dropdown replacing the native <select>. Controlled:
 * `value`/`onChange` like the selects it replaces. The option panel is portaled
 * to <body> so it is not clipped by scroll/overflow containers (admin tables,
 * modals). Keyboard: Enter/Space/Arrow to open, arrows to move, Esc to close.
 */
export function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  disabled = false,
  className,
}: {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  ariaLabel?: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [pos, setPos] = useState<MenuPos | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  const current = options.find((o) => o.value === value)
  const label = current?.label ?? placeholder ?? ''

  const openMenu = () => {
    if (disabled) return
    const r = btnRef.current?.getBoundingClientRect()
    if (r) setPos(placeMenu(r))
    setActive(selectedIndex(options, value))
    setOpen(true)
  }

  const close = () => setOpen(false)

  const select = (i: number) => {
    const opt = options[i]
    if (!opt || opt.disabled) return
    onChange(opt.value)
    setOpen(false)
    btnRef.current?.focus()
  }

  // Close (rather than chase) on scroll/resize — the panel is fixed-positioned.
  useEffect(() => {
    if (!open) return
    const onScroll = () => close()
    const onResize = () => close()
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return
      close()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openMenu()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => stepIndex(options, i, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => stepIndex(options, i, -1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(firstEnabled(options))
    } else if (e.key === 'End') {
      e.preventDefault()
      let i = options.length - 1
      while (i >= 0 && options[i]!.disabled) i--
      setActive(i)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      select(active)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      close()
    }
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        disabled={disabled}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onKeyDown}
        className={cn('relative flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50', className)}
      >
        <span className={cn('truncate', !current && 'text-muted')}>{label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={cn('pointer-events-none shrink-0 text-muted transition-transform', open && 'rotate-180')}
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && pos
        ? createPortal(
            <ul
              ref={menuRef}
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
              style={{ position: 'fixed', top: pos.top, bottom: pos.bottom, left: pos.left, minWidth: pos.minWidth, maxWidth: pos.maxWidth }}
              className="z-[200] max-h-[320px] overflow-y-auto border border-[rgba(140,106,85,0.3)] bg-white py-1 shadow-[0_22px_45px_-20px_rgba(28,10,6,0.5)]"
            >
              {options.map((o, i) => {
                const selected = o.value === value
                return (
                  <li
                    key={o.value}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={o.disabled || undefined}
                    onMouseEnter={() => !o.disabled && setActive(i)}
                    onClick={() => select(i)}
                    className={cn(
                      'cursor-pointer px-3 py-2 text-xs',
                      o.disabled && 'cursor-not-allowed opacity-40',
                      i === active && !o.disabled && 'bg-cream',
                      selected ? 'font-medium text-copper' : 'text-dark',
                    )}
                  >
                    {o.label}
                  </li>
                )
              })}
            </ul>,
            document.body,
          )
        : null}
    </>
  )
}
