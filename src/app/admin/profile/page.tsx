import { getAdminSession } from '@/lib/admin/auth'
import ProfileTab, { type AccountProfile } from '@/components/storefront/ProfileTab'
import { Eyebrow } from '@/components/shared/primitives'
import { AdminBreadcrumbs } from '@/components/admin/AdminBreadcrumbs'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>
}) {
  const session = await getAdminSession()
  // role check also falls out of getAdminSession: a customer profile returns null.
  if (!session) redirect('/admin/login')

  const { error } = await searchParams
  const oauthError = (Array.isArray(error) ? error[0] : error) === 'oauth'

  const initialProfile: AccountProfile = {
    fullName: session.profile.full_name,
    email: session.profile.email ?? session.user.email ?? '',
    phone: session.profile.phone,
    avatarUrl: session.profile.avatar_url ?? null,
    createdAt: session.profile.created_at ?? null,
    pendingEmail: session.user.newEmail ?? null,
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs items={[{ label: 'My Profile' }]} />

      <div className="border-b border-[#DCC9A8]/40 pb-5">
        <Eyebrow label="Account" hairline={false} />
        <h1 className="font-display text-3xl font-light text-dark">
          My <span className="italic text-copper">Profile</span>
        </h1>
        <p className="font-sans text-xs text-muted mt-1">
          Update your name, contact details, sign-in email and password.
        </p>
      </div>

      {oauthError && (
        <p role="alert" className="border border-[#A31621] bg-white px-3.5 py-2.5 font-sans text-[12px] text-[#A31621]">
          Sign-in did not complete. Please try again.
        </p>
      )}

      <ProfileTab profile={initialProfile} />
    </div>
  )
}
