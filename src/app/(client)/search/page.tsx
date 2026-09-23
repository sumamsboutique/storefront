import { Suspense } from 'react'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'
import SearchResults from './SearchResults'

export const metadata = { title: 'Search · Sumam\u2019s Boutique' }

export default function Search() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Suspense>
        <SearchResults />
      </Suspense>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}