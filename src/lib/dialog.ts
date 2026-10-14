'use client'

import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Overlay-panel behaviour shared by the mobile menu and the cart drawer:
 * focus moves into the panel on open, Tab is trapped inside it, Escape
 * closes it, the page behind cannot scroll, and focus returns to whatever
 * opened it. Returns the panel ref.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void): RefObject<T> {
  const ref = useRef<T>(null)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  // ponytail: initial .focus() must win over the browser's post-click focus
  // (applied as the click's default action) and land AFTER the panel's
  // visibility transition starts — else .focus() no-ops on a hidden element.
  // Wait until the first focusable is truly visible, so the browser accepts
  // the focus; skip busy-waiting, upgrades to rAF-polling if it ever flakes.
  useLayoutEffect(() => {
    if (!open) return
    const panel = ref.current
    const previous = document.activeElement as HTMLElement | null

    let cancelled = false
    const focusWhenVisible = () => {
      const target = panel?.querySelector<HTMLElement>(FOCUSABLE)
      if (target && getComputedStyle(target).visibility !== 'hidden') target.focus()
      else if (!cancelled) requestAnimationFrame(focusWhenVisible)
    }
    requestAnimationFrame(focusWhenVisible)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      )
      if (nodes.length === 0) return
      const first = nodes[0]!
      const last = nodes[nodes.length - 1]!
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelled = true
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      previous?.focus?.()
    }
  }, [open])

  return ref
}
