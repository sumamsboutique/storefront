import { Suspense } from 'react'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'
import { getAllProducts } from '@/lib/data'
import SearchResults from './SearchResults'

export const metadata = { title: 'Search · Sumam\u2019s Boutique' }

export default async function Search() {
  const products = await getAllProducts()
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Suspense>
        <SearchResults products={products} />
      </Suspense>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}
