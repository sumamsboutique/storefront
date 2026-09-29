import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'
import AuthScreen from '@/components/admin/AuthScreen'
import AccountPanel from '@/components/storefront/AccountPanel'
import { getCustomerSession } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await getCustomerSession()

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />

      {session ? (
        <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
          <AccountPanel
            name={session.profile.full_name}
            email={session.profile.email ?? session.user.email ?? ''}
          />
        </div>
      ) : (
        <AuthScreen variant="customer" />
      )}

      <SareeBorderDivider />
      <Footer />
    </main>
  )
}