import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Replaces middleware.ts (Next 16 renamed the convention; the runtime is now
// Node.js and is not configurable). Supabase access tokens are short-lived, so
// something has to call the auth server on each request to rotate the refresh
// token and write the new cookies back. Without this, sessions expire mid-visit.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // Same graceful degradation as src/lib/supabase.ts: no config, no session handling.
  if (!url || !anonKey) return response

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        // Both the request (so this render sees the new token) and the response
        // (so the browser keeps it) have to be updated.
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
        // no-store/cache headers from the library — without them a CDN can serve
        // one visitor's auth cookies to someone else.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
      },
    },
  })

  // Must finish before the response is committed, or the rotated tokens are lost.
  await supabase.auth.getUser()

  return response
}

export const config = {
  // api/ is excluded so the Razorpay webhook pays no auth round-trip. Server
  // Actions post to their own page path, so they stay covered.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
