import { Suspense } from 'react'
import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import Plp from '@/components/storefront/Plp'
import { SareeBorderDivider } from '@/components/shared/primitives'
import { getProductsByType } from '@/lib/data'

export default async function Sarees() {
  const products = await getProductsByType('saree')
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Suspense>
        <Plp products={products} keyword="SAREES" title="Our Saree Collection" types={['saree']} />
      </Suspense>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}