import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'

export type UserRole = 'admin' | 'staff' | 'customer'

export type AdminProfile = {
  id: string
  role: UserRole
  full_name: string | null
  email: string | null
  phone: string | null
  avatar_url?: string | null
  created_at?: string
  updated_at?: string
}

export type AdminSession = {
  user: {
    id: string
    email?: string
    // Set by Supabase while an email change waits on its confirmation link.
    newEmail?: string | null
  }
  profile: AdminProfile
}

export async function createAdminServerClient() {
  const cookieStore = await cookies()
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // getAll/setAll, not the deprecated get/set/remove: @supabase/ssr needs to
      // read every chunked auth cookie and write refreshed tokens back, or
      // sessions end early and logins drop out at random.
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignored when called from Server Components
          }
        },
      },
    }
  )

  // Dev demo sessions never sign into Supabase, so the cookie client would be
  // anonymous and RLS would silently block admin writes (0 rows, no error).
  // Only that session-less dev case bypasses RLS; production keeps the guard.
  if (demoEnabled() && cookieStore.get('sumams_admin_session')?.value === DEMO_COOKIE_VALUE) {
    const { data: { session } } = await client.auth.getSession()
    if (!session) {
      const service = createServiceClient()
      if (service) return service
    }
  }

  return client
}

// Demo admin session. Unsigned and user-plantable, so production trusts only
// the Supabase path below. Dev-only for the same reason as the demo login.
// Read at call time, not module load, so a running dev server picks the value
// up immediately instead of depending on how its module cache was warmed.
const demoEnabled = () => process.env.NODE_ENV !== 'production'
// The demo cookie acts as a password: anyone who knows it is the local admin.
// It must be a fixed server-side value, never anything the client chooses,
// otherwise any visitor can mint themselves an admin session by setting it.
export const DEMO_COOKIE_VALUE = 'sumams-demo-admin'

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    // 1. Check for local/demo admin session cookie
    if (demoEnabled()) {
      const cookieStore = await cookies()
      const demoCookie = cookieStore.get('sumams_admin_session')?.value
      if (demoCookie === DEMO_COOKIE_VALUE) {
        return {
          user: {
            id: 'admin-dev-01',
            email: 'admin@sumamsboutique.com',
          },
          profile: {
            id: 'admin-dev-01',
            role: 'admin',
            full_name: 'Sunit Saha (Atelier Admin)',
            email: 'admin@sumamsboutique.com',
            phone: '+91 98765 43210',
          },
        }
      }
    }

    // 2. Otherwise check Supabase authentication
    const supabase = await createAdminServerClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name, email, phone, avatar_url, created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError || !profile) return null
    if (profile.role !== 'admin' && profile.role !== 'staff') return null

    return {
      user: {
        id: user.id,
        email: user.email ?? profile.email ?? undefined,
      },
      profile: profile as AdminProfile,
    }
  } catch (err) {
    console.error('[admin/auth] error getting session:', err)
    return null
  }
}

export async function getCustomerSession(): Promise<AdminSession | null> {
  try {
    const supabase = await createAdminServerClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name, email, phone, avatar_url, created_at, updated_at')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError || !profile || profile.role !== 'customer') return null

    return {
      user: {
        id: user.id,
        email: user.email ?? profile.email ?? undefined,
        newEmail: user.new_email ?? null,
      },
      profile: profile as AdminProfile,
    }
  } catch (err) {
    console.error('[admin/auth] error getting customer session:', err)
    return null
  }
}

export async function requireAdminOrStaff(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) {
    redirect('/admin/login')
  }
  return session
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await requireAdminOrStaff()
  if (session.profile.role !== 'admin') {
    redirect('/admin?error=forbidden')
  }
  return session
}
