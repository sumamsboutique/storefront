import { describe, expect, it } from 'vitest'
import { hasMatchingImageSignature } from './image-files'

const file = (type: string, bytes: number[]) =>
  new File([new Uint8Array(bytes)], 'image', { type })

describe('hasMatchingImageSignature', () => {
  it.each([
    ['image/jpeg', [0xff, 0xd8, 0xff, 0x00]],
    ['image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ['image/webp', [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]],
  ])('accepts a %s signature', async (type, bytes) => {
    expect(await hasMatchingImageSignature(file(type, bytes))).toBe(true)
  })

  it('rejects content that does not match the declared type', async () => {
    expect(await hasMatchingImageSignature(file('image/png', [0xff, 0xd8, 0xff]))).toBe(false)
  })

  it('rejects truncated signatures and unsupported types', async () => {
    expect(await hasMatchingImageSignature(file('image/webp', [0x52, 0x49, 0x46, 0x46]))).toBe(false)
    expect(await hasMatchingImageSignature(file('image/gif', [0x47, 0x49, 0x46, 0x38]))).toBe(false)
  })
})
