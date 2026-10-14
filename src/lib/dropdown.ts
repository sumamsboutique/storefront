export type DropdownOption = { value: string; label: string; disabled?: boolean }

export function firstEnabled(options: DropdownOption[]): number {
  return options.findIndex((o) => !o.disabled)
}

/** Index to highlight when the menu opens: the selected option, else the first usable one. */
export function selectedIndex(options: DropdownOption[], value: string): number {
  const i = options.findIndex((o) => o.value === value)
  return i >= 0 ? i : firstEnabled(options)
}

/** Clamped move: skips disabled options, stops at the first/last enabled one. */
export function stepIndex(options: DropdownOption[], from: number, dir: 1 | -1): number {
  if (from < 0) return firstEnabled(options)
  let i = from
  for (let n = 0; n < options.length; n++) {
    i += dir
    if (i < 0 || i >= options.length) return from
    if (!options[i]!.disabled) return i
  }
  return from
}
