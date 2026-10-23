'use client'

import { useCallback, useState, useTransition } from 'react'

// React 18 ends a transition at the first await, so `isPending` from
// useTransition drops while the server action is still running. Count the
// promise ourselves so busy labels and disabled states stay visible.
export function useAsyncTransition() {
  const [isPending, startTransition] = useTransition()
  const [busy, setBusy] = useState(false)

  const run = useCallback((task: () => Promise<void>) => {
    setBusy(true)
    startTransition(async () => {
      try {
        await task()
      } finally {
        setBusy(false)
      }
    })
  }, [])

  return [isPending || busy, run] as const
}
