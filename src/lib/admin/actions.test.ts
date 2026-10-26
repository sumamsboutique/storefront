import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  imageDeleteError: null as Error | null,
  imageUpdateRow: { id: 'image-1' } as { id: string } | null,
  imageUpdateFilters: [] as [string, unknown][],
  contentUpserts: [] as [{ section_key: string; content: unknown; published_content?: unknown; is_published?: boolean }, { onConflict: string }][],
  contentUpsertError: null as Error | null,
  rpc: vi.fn(),
  logAudit: vi.fn(),
  clearCatalogCache: vi.fn(),
  revalidatePath: vi.fn(),
}))

vi.mock('./auth', () => ({
  requireAdminOrStaff: async () => ({ user: { id: 'staff-1' }, profile: { role: 'staff' } }),
  requireAdmin: async () => ({ user: { id: 'admin-1' }, profile: { role: 'admin' } }),
  createAdminServerClient: async () => ({
    from: (table: string) => {
      if (table === 'products') {
        return { update: () => ({ eq: async () => ({ error: null }) }) }
      }
      if (table === 'product_images') {
        const deleteResult = { error: mocks.imageDeleteError }
        const deleteQuery = {
          not: async () => deleteResult,
          then: (resolve: (value: typeof deleteResult) => unknown) => Promise.resolve(deleteResult).then(resolve),
        }
        return {
          delete: () => ({
            eq: () => deleteQuery,
            not: async () => deleteResult,
          }),
          update: () => {
            const query = {
              eq: (key: string, value: unknown) => {
                mocks.imageUpdateFilters.push([key, value])
                return query
              },
              select: () => query,
              maybeSingle: async () => ({ data: mocks.imageUpdateRow, error: null }),
            }
            return query
          },
        }
      }
      if (table === 'product_variants') {
        return { delete: () => ({ eq: async () => ({ error: null }) }) }
      }
      if (table === 'content_blocks') {
        return {
          upsert: (row: (typeof mocks.contentUpserts)[number][0], options: { onConflict: string }) => {
            mocks.contentUpserts.push([row, options])
            return { select: () => ({ single: async () => ({
              data: mocks.contentUpsertError ? null : { id: 'content-1' },
              error: mocks.contentUpsertError,
            }) }) }
          },
        }
      }
      throw new Error(`Unexpected table ${table}`)
    },
    rpc: mocks.rpc,
  }),
}))

vi.mock('next/cache', () => ({ revalidatePath: mocks.revalidatePath }))
vi.mock('next/headers', () => ({ headers: async () => new Headers(), cookies: async () => ({}) }))
vi.mock('./audit', () => ({ logAudit: mocks.logAudit }))
vi.mock('../settings', () => ({ clearStoreSettingsCache: vi.fn() }))
vi.mock('../data', () => ({ clearCatalogCache: mocks.clearCatalogCache }))
vi.mock('../email', () => ({
  renderOrderStatus: vi.fn(),
  renderWelcome: vi.fn(),
  sendEmail: vi.fn(),
  sendPaidOrderEmails: vi.fn(),
}))
vi.mock('../image-files', () => ({ hasMatchingImageSignature: vi.fn() }))
vi.mock('../supabase', () => ({ createServiceClient: vi.fn() }))

beforeEach(() => {
  vi.resetModules()
  mocks.imageDeleteError = null
  mocks.imageUpdateRow = { id: 'image-1' }
  mocks.imageUpdateFilters = []
  mocks.contentUpserts = []
  mocks.contentUpsertError = null
  mocks.rpc.mockReset().mockResolvedValue({ data: { ok: true, updated: 2 }, error: null })
  mocks.logAudit.mockReset()
  mocks.clearCatalogCache.mockReset()
  mocks.revalidatePath.mockReset()
})

const baseProduct = {
  name: 'Silk Saree',
  slug: 'silk-saree',
  price: 1250,
  images: [],
  variants: [],
}

describe('saveProduct synchronization safeguards', () => {
  it('reports image deletion failures and invalidates the already-updated catalog', async () => {
    mocks.imageDeleteError = new Error('foreign key prevents deletion')
    const { saveProduct } = await import('./actions')

    const result = await saveProduct('product-1', baseProduct)

    expect(result.success).toBe(false)
    expect(result.error).toContain('Product details were saved')
    expect(mocks.clearCatalogCache).toHaveBeenCalledOnce()
    expect(mocks.revalidatePath).toHaveBeenCalledWith('/')
    expect(mocks.logAudit).not.toHaveBeenCalled()
  })

  it('scopes existing image updates to the current product', async () => {
    const { saveProduct } = await import('./actions')

    const result = await saveProduct('product-1', {
      ...baseProduct,
      images: [{
        id: '00000000-0000-4000-8000-000000000001',
        storage_path: 'Products/silk-saree/front.jpg',
        alt_text: 'Front view of silk saree',
        display_order: 0,
        is_primary: true,
        aspect_ratio: '3/4',
      }],
    })

    expect(result.success).toBe(true)
    expect(mocks.imageUpdateFilters).toContainEqual(['product_id', 'product-1'])
    expect(mocks.logAudit).toHaveBeenCalledOnce()
  })

  it('does not claim success when an existing image no longer belongs to the product', async () => {
    mocks.imageUpdateRow = null
    const { saveProduct } = await import('./actions')

    const result = await saveProduct('product-1', {
      ...baseProduct,
      images: [{
        id: '00000000-0000-4000-8000-000000000001',
        storage_path: 'Products/silk-saree/front.jpg',
        alt_text: 'Front view of silk saree',
        display_order: 0,
        is_primary: true,
        aspect_ratio: '3/4',
      }],
    })

    expect(result.success).toBe(false)
    expect(mocks.logAudit).not.toHaveBeenCalled()
    expect(mocks.clearCatalogCache).toHaveBeenCalledOnce()
  })
})

describe('reorderCategories transaction boundary', () => {
  it('rejects duplicate category IDs before calling the database', async () => {
    const { reorderCategories } = await import('./actions')
    const id = '00000000-0000-4000-8000-000000000001'

    const result = await reorderCategories([id, id])

    expect(result).toEqual({ success: false, error: 'A category cannot appear more than once.' })
    expect(mocks.rpc).not.toHaveBeenCalled()
  })

  it('uses the atomic database operation and records each reordered category', async () => {
    const { reorderCategories } = await import('./actions')
    const ids = [
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000002',
    ]

    const result = await reorderCategories(ids)

    expect(result).toEqual({ success: true })
    expect(mocks.rpc).toHaveBeenCalledWith('reorder_categories', { p_ordered_ids: ids })
    expect(mocks.logAudit).toHaveBeenCalledTimes(2)
  })

  it('reports database failures instead of claiming the order was saved', async () => {
    mocks.rpc.mockResolvedValue({ data: null, error: new Error('database unavailable') })
    const { reorderCategories } = await import('./actions')
    const ids = ['00000000-0000-4000-8000-000000000001']

    const result = await reorderCategories(ids)

    expect(result).toEqual({
      success: false,
      error: 'Could not update category order. Reload the page and retry.',
    })
    expect(mocks.logAudit).not.toHaveBeenCalled()
  })
})

describe('saveContentBlock publication boundary', () => {
  it('saves drafts without replacing the published snapshot', async () => {
    const { saveContentBlock } = await import('./actions')
    const draft = [{ id: 1, eyebrow: 'Draft copy' }]

    const result = await saveContentBlock({ section_key: 'hero', content: draft, publishNow: false })

    expect(result.success).toBe(true)
    expect(mocks.contentUpserts).toEqual([[{
      section_key: 'hero',
      content: draft,
      updated_at: expect.any(String),
    }, { onConflict: 'section_key' }]])
  })

  it('writes the draft and published snapshot together when publishing', async () => {
    const { saveContentBlock } = await import('./actions')
    const published = [{ id: 1, eyebrow: 'Live copy' }]

    const result = await saveContentBlock({ section_key: 'hero', content: published, publishNow: true })

    expect(result.success).toBe(true)
    expect(mocks.contentUpserts[0][0]).toMatchObject({
      section_key: 'hero',
      content: published,
      published_content: published,
      is_published: true,
    })
  })

  it('reports upsert failures instead of auditing a successful save', async () => {
    mocks.contentUpsertError = new Error('database unavailable')
    const { saveContentBlock } = await import('./actions')

    const result = await saveContentBlock({ section_key: 'hero', content: [], publishNow: false })

    expect(result).toEqual({ success: false, error: 'database unavailable' })
    expect(mocks.logAudit).not.toHaveBeenCalled()
  })
})
