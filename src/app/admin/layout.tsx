import { getAdminSession } from '@/lib/admin/auth'
import { AdminShell } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Admin CRM & CMS — Sumam's Boutique",
  description: "Administrative control center for Sumam's Boutique",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  return (
    <AdminShell
      userEmail={session?.user.email}
      userName={session?.profile.full_name}
      userRole={session?.profile.role}
    >
      {children}
    </AdminShell>
  )
}
