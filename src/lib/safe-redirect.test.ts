import { describe, expect, it } from 'vitest'
import { safeLocalRedirectPath } from './safe-redirect'

describe('safeLocalRedirectPath', () => {
  it('preserves a same-site path and its query', () => {
    expect(safeLocalRedirectPath('/account/orders?sort=new')).toBe('/account/orders?sort=new')
  })

  it('rejects protocol-relative, absolute, and backslash-normalized URLs', () => {
    expect(safeLocalRedirectPath('//evil.example/path')).toBe('/account')
    expect(safeLocalRedirectPath('https://evil.example/path')).toBe('/account')
    expect(safeLocalRedirectPath('/\\evil.example/path')).toBe('/account')
  })

  it('rejects control characters and uses the supplied fallback', () => {
    expect(safeLocalRedirectPath('/account\r\nLocation: https://evil.example', '/')).toBe('/')
    expect(safeLocalRedirectPath(null)).toBe('/account')
  })
})
