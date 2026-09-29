import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Hind_Siliguri } from 'next/font/google'
import { CartDrawer } from '@/components/storefront/CartDrawer'
import { GoogleAnalytics } from '@/components/storefront/GoogleAnalytics'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Siliguri covers Bengali + Devanagari + Latin, so it also replaces Hind.
const bengali = Hind_Siliguri({
  subsets: ['latin', 'bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: "Sumam's Boutique",
  description: 'Bengal-heritage sarees and fine jewellery.',
  openGraph: {
    title: "Sumam's Boutique",
    description: 'Bengal-heritage sarees and fine jewellery.',
    siteName: "Sumam's Boutique",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable} ${bengali.variable}`}
    >
      <body className="antialiased">
        {children}
        <CartDrawer />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
