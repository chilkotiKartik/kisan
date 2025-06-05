"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  UserIcon,
  Tractor,
  BarChart3,
  Settings,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import Link from "next/link"

interface MobileDashboardLayoutProps {
  children: React.ReactNode
  user: {
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
}

export function MobileDashboardLayout({ children, user }: MobileDashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useUser()
  const [showSidebar, setShowSidebar] = useState(false)

  const farmerNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", badge: null },
    { icon: Search, label: "Find Equipment", href: "/dashboard/search", badge: null },
    { icon: Calendar, label: "My Bookings", href: "/dashboard/bookings", badge: 2 },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 5 },
    { icon: UserIcon, label: "Profile", href: "/dashboard/profile", badge: null },
  ]

  const providerNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", badge: null },
    { icon: Tractor, label: "My Equipment", href: "/dashboard/equipment", badge: null },
    { icon: Calendar, label: "Bookings", href: "/dashboard/bookings", badge: 3 },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", badge: null },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 7 },
  ]

  const navItems = user.role === "provider" ? providerNavItems : farmerNavItems

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)} className="h-10 w-10">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-gray-900">KisanSetu</h1>
            <p className="text-xs text-gray-500 capitalize">{user.role} Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-10 w-10">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
              3
            </Badge>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-green-100 text-green-700 text-sm">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-2 flex items-center justify-around sticky bottom-0 z-40">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-colors ${
                  isActive ? "bg-green-50 text-green-600" : "text-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-20 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
          onClick={() => router.push(user.role === "provider" ? "/dashboard/equipment/add" : "/dashboard/search")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Profile */}
                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-green-100 text-green-700">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{user.rating}</span>
                    </div>
                    <div className="text-gray-600">{user.totalBookings} bookings</div>
                    {user.verified && <Badge className="bg-green-100 text-green-700 text-xs">✓ Verified</Badge>}
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setShowSidebar(false)}>
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            isActive ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && <Badge className="ml-auto bg-red-500 text-white text-xs">{item.badge}</Badge>}
                        </div>
                      </Link>
                    )
                  })}
                </nav>

                {/* Additional Menu Items */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                  <Link href="/dashboard/settings" onClick={() => setShowSidebar(false)}>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50">
                      <Settings className="h-5 w-5" />
                      <span className="font-medium">Settings</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                  >
                    <span className="h-5 w-5">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
