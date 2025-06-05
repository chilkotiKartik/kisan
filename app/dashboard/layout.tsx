"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { MobileDashboardLayout } from "@/components/dashboard/mobile-dashboard-layout"
import { DesktopDashboardLayout } from "@/components/dashboard/desktop-dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = useUser()
  const router = useRouter()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isMobile) {
    return <MobileDashboardLayout user={user}>{children}</MobileDashboardLayout>
  }

  return <DesktopDashboardLayout user={user}>{children}</DesktopDashboardLayout>
}
