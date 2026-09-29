import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'
import AuthScreen from '@/components/admin/AuthScreen'
import AddressBook from '@/components/storefront/AddressBook'
import { getCustomerSession } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export default async function AddressesPage() {
  const session = await getCustomerSession()

  if (!session) {
    return (
      <main className="min-h-screen bg-ivory flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
          <AuthScreen variant="customer" />
        </div>
        <SareeBorderDivider />
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 px-[clamp(20px,6vw,85px)] py-14">
        <AddressBook
          email={session.user.email ?? session.profile.email ?? ''}
        />
      </div>
      <SareeBorderDivider />
      <Footer />
    </main>
  )
}