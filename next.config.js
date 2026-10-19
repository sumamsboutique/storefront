/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    // This network's DNS64 resolver answers *.supabase.co with NAT64 addresses
    // (64:ff9b::/96), which ipaddr.js classes as "reserved" — Next 16's SSRF
    // guard then treats them as private IPs and 400s every remote image in dev.
    // Prod DNS returns normal unicast addresses, so the guard stays on there.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // The three account sections now live as tabs on /account. Config redirects
  // give old links a real 308; a redirect() in a page would only meta-refresh.
  async redirects() {
    return [
      { source: '/account/profile', destination: '/account', permanent: true },
      { source: '/account/orders', destination: '/account?tab=orders', permanent: true },
      { source: '/account/addresses', destination: '/account?tab=addresses', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // ponytail: CSP keeps 'unsafe-inline' script because Next ships RSC payloads
          // as inline scripts without nonces. It still blocks remote script injection
          // and cross-origin exfiltration. Swap to nonce-based CSP when we add middleware.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // ponytail: 'unsafe-eval' only in dev — React/Turbopack needs eval for
              // dev callstacks/HMR. Next never evals in production mode.
              `script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://api.razorpay.com${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
              "style-src 'self' 'unsafe-inline'",
              // ponytail: Instagram review thumbnails may be pasted as post image URLs.
              "img-src 'self' data: blob: https://*.supabase.co https://*.razorpay.com https://*.cdninstagram.com https://*.fbcdn.net",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.razorpay.com https://api.razorpay.com",
              "frame-src 'self' https://*.razorpay.com https://checkout.razorpay.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // ponytail: HSTS only matters served over HTTPS; harmless locally.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ]
  },
}

module.exports = nextConfig