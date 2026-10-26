import { describe, expect, it } from 'vitest'
import { requireExplicitSupabaseMutationTarget } from '../../scripts/require-explicit-supabase-target.mjs'

describe('requireExplicitSupabaseMutationTarget', () => {
  it('requires an explicit apply flag and exact remote project confirmation', () => {
    expect(() => requireExplicitSupabaseMutationTarget(
      'https://project123.supabase.co', [], 'seed.mjs'
    )).toThrow(/Refusing Supabase mutation/)

    expect(() => requireExplicitSupabaseMutationTarget(
      'https://project123.supabase.co', ['--apply', '--confirm-project-ref', 'other-project'], 'seed.mjs'
    )).toThrow(/Refusing Supabase mutation/)
  })

  it('accepts a matching, explicitly confirmed project target', () => {
    expect(requireExplicitSupabaseMutationTarget(
      'https://project123.supabase.co', ['--apply', '--confirm-project-ref', 'project123'], 'seed.mjs'
    )).toBe('project123')
  })

  it('supports explicit confirmation of a local Supabase target', () => {
    expect(requireExplicitSupabaseMutationTarget(
      'http://127.0.0.1:54321', ['--apply', '--confirm-project-ref', 'local'], 'seed.mjs'
    )).toBe('local')
  })
})
