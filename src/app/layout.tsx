import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Hind, Hind_Siliguri } from 'next/font/google'
import { CartDrawer } from '@/components/storefront/CartDrawer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const hind = Hind({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
})

const hindSiliguri = Hind_Siliguri({
  subsets: ['latin', 'bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
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
      className={`${cormorant.variable} ${dmSans.variable} ${hind.variable} ${hindSiliguri.variable}`}
    >
      <body className="antialiased">
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}
