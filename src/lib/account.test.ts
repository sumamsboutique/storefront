import { describe, it, expect } from 'vitest'
import { ProfileSchema, PasswordSchema } from './schemas'

const profile = (over: Record<string, unknown> = {}) => ({
  fullName: 'Aparna Sen',
  phone: '+91 98765 43210',
  ...over,
})

const password = (over: Record<string, unknown> = {}) => ({
  currentPassword: 'old-pass-123',
  newPassword: 'new-pass-456',
  confirmPassword: 'new-pass-456',
  ...over,
})

const message = (result: { success: boolean; error?: { issues?: { message: string }[] } }) =>
  result.error?.issues?.[0]?.message

describe('ProfileSchema', () => {
  it('accepts a normal name and phone', () => {
    const r = ProfileSchema.safeParse(profile())
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.fullName).toBe('Aparna Sen')
  })

  it('trims surrounding whitespace', () => {
    const r = ProfileSchema.safeParse(profile({ fullName: '  Aparna Sen  ', phone: ' 9876543210 ' }))
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.fullName).toBe('Aparna Sen')
      expect(r.data.phone).toBe('9876543210')
    }
  })

  it('rejects a too-short name', () => {
    expect(ProfileSchema.safeParse(profile({ fullName: 'A' })).success).toBe(false)
  })

  it('rejects a junk phone number', () => {
    expect(ProfileSchema.safeParse(profile({ phone: 'call-me' })).success).toBe(false)
  })

  // role is not in the schema, so a role-smuggled payload is stripped, not applied.
  it('ignores any role field a caller tries to smuggle in', () => {
    const r = ProfileSchema.safeParse(profile({ role: 'admin' }))
    expect(r.success).toBe(true)
    if (r.success) expect('role' in r.data).toBe(false)
  })
})

describe('PasswordSchema', () => {
  it('accepts a matching pair', () => {
    expect(PasswordSchema.safeParse(password()).success).toBe(true)
  })

  it('rejects a mismatch, naming the confirm field', () => {
    const r = PasswordSchema.safeParse(password({ confirmPassword: 'different' }))
    expect(r.success).toBe(false)
    expect(message(r)).toBe('Passwords do not match.')
  })

  it('rejects reusing the current password', () => {
    const r = PasswordSchema.safeParse(
      password({ newPassword: 'old-pass-123', confirmPassword: 'old-pass-123' }),
    )
    expect(r.success).toBe(false)
    expect(message(r)).toBe('Choose a password different from your current one.')
  })

  it('rejects a new password under 8 characters', () => {
    const r = PasswordSchema.safeParse(password({ newPassword: 'short1', confirmPassword: 'short1' }))
    expect(r.success).toBe(false)
  })

  it('rejects a missing current password', () => {
    expect(PasswordSchema.safeParse(password({ currentPassword: '' })).success).toBe(false)
  })
})
