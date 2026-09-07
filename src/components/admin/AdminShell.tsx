'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { ToastProvider } from './AdminToast'

export function AdminShell({
  children,
  userEmail,
  userName,
  userRole = 'admin',
}: {
  children: React.ReactNode
  userEmail?: string
  userName?: string | null
  userRole?: 'admin' | 'staff' | 'customer'
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-ivory flex flex-col md:flex-row text-dark font-sans selection:bg-gold/20 selection:text-dark">
        {/* Sidebar */}
        <AdminSidebar
          role={userRole}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader
            userName={userName || userEmail || 'Staff'}
            userRole={userRole}
            onOpenMobile={() => setIsMobileOpen(true)}
          />

          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
