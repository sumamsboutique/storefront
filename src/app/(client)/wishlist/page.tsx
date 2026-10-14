import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { getAllProducts } from '@/lib/data'
import { PAD } from '@/components/shared/primitives'
import { cn } from '@/lib/cn'
import { WishlistView } from './wishlist-view'

export const revalidate = 300

export default async function Wishlist() {
  const products = await getAllProducts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory">
        <div className={cn(PAD)}>
          <WishlistView products={products} />
        </div>
      </main>
      <Footer />
    </>
  )
}
