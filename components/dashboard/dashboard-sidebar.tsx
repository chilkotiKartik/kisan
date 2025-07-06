"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  Tractor,
  Users,
} from "lucide-react"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Equipment",
      icon: Tractor,
      href: "/dashboard/equipment",
      color: "text-green-500",
    },
    {
      label: "Bookings",
      icon: Calendar,
      href: "/dashboard/bookings",
      color: "text-violet-500",
    },
    {
      label: "Community",
      icon: Users,
      href: "/dashboard/community",
      color: "text-pink-700",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "text-orange-500",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "text-yellow-500",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/dashboard/payments",
      color: "text-emerald-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileNav routes={routes} pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex h-screen w-64 flex-col border-r">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <span className="text-xl font-bold">KisanSetu</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  pathname === route.href ? "bg-accent" : "transparent",
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Tractor className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>
      </aside>
    </>
  )
}

interface MobileNavProps {
  routes: {
    label: string
    icon: any
    href: string
    color?: string
  }[]
  pathname: string
  setOpen: (open: boolean) => void
}

function MobileNav({ routes, pathname, setOpen }: MobileNavProps) {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <Link href="/" className="flex items-center gap-2 px-2" onClick={() => setOpen(false)}>
        <div className="bg-green-600 text-white p-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        <span className="text-xl font-bold">KisanSetu</span>
      </Link>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === route.href ? "bg-accent" : "transparent",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setOpen(false)}>
          <Tractor className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>
    </div>
  )
}
