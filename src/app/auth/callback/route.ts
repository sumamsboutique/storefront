import { NextResponse, type NextRequest } from 'next/server'
import { createAdminServerClient } from '@/lib/admin/auth'
import { safeLocalRedirectPath } from '@/lib/safe-redirect'

// Supabase bounces back here (PKCE) after the Google round-trip. createServerClient
// runs the PKCE flow, so the code verifier is already in a cookie and this only
// has to swap the one-time code for a session.
export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl
  const code = searchParams.get('code')

  // URL normalization treats backslashes like slashes in special URLs, so a
  // simple startsWith('/') check is not enough to prevent external redirects.
  const next = safeLocalRedirectPath(searchParams.get('next'))

  if (code) {
    const supabase = await createAdminServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  // Covers both a cancelled consent screen (Supabase sends error, not code) and a
  // failed exchange. The account page surfaces this.
  return NextResponse.redirect(`${origin}/account?error=oauth`)
}
