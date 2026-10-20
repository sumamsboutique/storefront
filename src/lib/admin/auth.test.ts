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

describe('Admin session resolution', () => {
  beforeEach(() => {
    cookieJar.clear()
  })
  afterEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  // The demo login was removed entirely: no cookie value, real or guessed,
  // may mint an admin session in any environment.
  it('rejects the retired demo cookie in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    cookieJar.set('sumams_admin_session', 'sumams-demo-admin')
    const { getAdminSession } = await import('./auth')
    expect(await getAdminSession()).toBeNull()
  })

  it('rejects the retired demo cookie outside production too', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    cookieJar.set('sumams_admin_session', 'sumams-demo-admin')
    const { getAdminSession } = await import('./auth')
    expect(await getAdminSession()).toBeNull()
  })

  it('rejects a self-chosen cookie value where an admin session is claimed', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    cookieJar.set('sumams_admin_session', JSON.stringify({ role: 'admin' }))
    const { getAdminSession } = await import('./auth')
    expect(await getAdminSession()).toBeNull()
  })
})