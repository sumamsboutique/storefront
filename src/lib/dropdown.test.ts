import { describe, it, expect } from 'vitest'
import { firstEnabled, selectedIndex, stepIndex, type DropdownOption } from './dropdown'

const opts: DropdownOption[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B', disabled: true },
  { value: 'c', label: 'C' },
]

describe('dropdown keyboard nav', () => {
  it('skips disabled options in both directions', () => {
    expect(stepIndex(opts, 0, 1)).toBe(2)
    expect(stepIndex(opts, 2, -1)).toBe(0)
  })

  it('clamps at the ends instead of wrapping', () => {
    expect(stepIndex(opts, 2, 1)).toBe(2)
    expect(stepIndex(opts, 0, -1)).toBe(0)
  })

  it('firstEnabled skips a leading disabled option', () => {
    expect(firstEnabled([{ value: 'x', label: 'X', disabled: true }, ...opts])).toBe(1)
  })

  it('selectedIndex falls back to the first enabled when value is unknown', () => {
    expect(selectedIndex(opts, 'c')).toBe(2)
    expect(selectedIndex(opts, 'zzz')).toBe(0)
  })
})
