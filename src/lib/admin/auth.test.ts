import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const cookieJar = new Map<string, string>()

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => {
      const value = cookieJar.get(name)
      return value ? { name, value } : undefined
    },
    set: (_opts: unknown) => {},
  })),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  }),
}))

crypto.randomUUID = crypto.randomUUID ?? (() => 'crypto-random-uuid')

describe('Admin auth demo-cookie gate', () => {
  beforeEach(() => {
    cookieJar.clear()
  })

  afterEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  it('rejects a planted admin session cookie in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    cookieJar.set('sumams_admin_session', JSON.stringify({ role: 'admin' }))
    const { getAdminSession } = await import('./auth')
    const session = await getAdminSession()
    expect(session).toBeNull()
  })

  it('accepts the demo session cookie outside production', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    cookieJar.set('sumams_admin_session', JSON.stringify({ role: 'admin' }))
    const { getAdminSession } = await import('./auth')
    const session = await getAdminSession()
    expect(session?.profile.role).toBe('admin')
  })
})