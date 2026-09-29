import Navbar from '@/components/storefront/Navbar'
import Footer from '@/components/storefront/Footer'
import { SareeBorderDivider } from '@/components/shared/primitives'
import AuthScreen from '@/components/admin/AuthScreen'
import AccountDashboard, { type AccountTab } from '@/components/storefront/AccountDashboard'
import { getCustomerSession } from '@/lib/admin/auth'

export const dynamic = 'force-dynamic'

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>
}) {
  const session = await getCustomerSession()
  const { tab } = await searchParams

  // Unknown or missing tab falls back to the first tab, so a stale link still lands.
  const key = Array.isArray(tab) ? tab[0] : tab
  const active: AccountTab = key === 'orders' || key === 'addresses' ? key : 'profile'

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      <Navbar />

      {session ? (
        <div className="flex-1">
          <AccountDashboard
            tab={active}
            initialProfile={{
              fullName: session.profile.full_name,
              email: session.profile.email ?? session.user.email ?? '',
              phone: session.profile.phone,
              avatarUrl: session.profile.avatar_url ?? null,
              createdAt: session.profile.created_at ?? null,
              pendingEmail: session.user.newEmail ?? null,
            }}
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
