import Script from 'next/script'

// gtag.js GA4 embed. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
// `id` on inline Script lets Next dedupe/replace reliably across navigations.
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!id) return null
  return (
    <>
      <Script
        id="ga-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  const w = window as GtagWindow
  if (typeof w.gtag === 'function') w.gtag('event', event, params)
}