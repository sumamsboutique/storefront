import { createServerClient, type CookieOptions, createBrowserClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type UserRole = 'admin' | 'staff' | 'customer'

export type AdminProfile = {
  id: string
  role: UserRole
  full_name: string | null
  email: string | null
  phone: string | null
  created_at?: string
  updated_at?: string
}

export type AdminSession = {
  user: {
    id: string
    email?: string
  }
  profile: AdminProfile
}

export function createAdminBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function createAdminServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Ignored when called from Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Ignored when called from Server Components
          }
        },
      },
    }
  )
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const supabase = await createAdminServerClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role, full_name, email, phone, created_at, updated_at')
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
