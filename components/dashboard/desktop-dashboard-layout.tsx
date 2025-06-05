"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "farmer" | "provider" | "both"
  avatar?: string
  location: {
    district: string
    village: string
  }
  verified: boolean
  rating: number
  totalBookings: number
}

interface DesktopDashboardLayoutProps {
  children: React.ReactNode
  user: User
}

export function DesktopDashboardLayout({ children, user }: DesktopDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1">
        <DashboardSidebar user={user} />
        <main className="flex-1 p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
