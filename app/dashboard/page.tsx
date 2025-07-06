"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Tractor, Users, AlertTriangle, TrendingUp, Star, Phone } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useUser } from "@/hooks/use-user"
import { motion } from "framer-motion"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { UpcomingBookings } from "@/components/dashboard/upcoming-bookings"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { NearbyEquipment } from "@/components/dashboard/nearby-equipment"
import { CommunityUpdates } from "@/components/dashboard/community-updates"
import { ProviderDashboard } from "@/components/dashboard/provider-dashboard"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useUser()
  const isMobile = useIsMobile()
  const [greeting, setGreeting] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  if (!mounted || !user) return null

  // Show provider dashboard for equipment providers
  if (user.role === "provider") {
    return <ProviderDashboard user={user} />
  }

  // Farmer Dashboard
  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
      {/* Welcome Section */}
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {greeting}, {user.name.split(" ")[0]} 👋
          </h2>
          <p className="text-muted-foreground">Here's what's happening with your farm today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none">
            <Tractor className="mr-2 h-4 w-4" />
            Find Equipment
          </Button>
          {!isMobile && (
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Hire Help
            </Button>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Active Bookings",
            value: "3",
            subtitle: "2 upcoming this week",
            icon: Calendar,
            color: "text-blue-600",
          },
          {
            title: "Money Saved",
            value: "₹45,000",
            subtitle: "This year",
            icon: TrendingUp,
            color: "text-green-600",
          },
          {
            title: "Equipment Used",
            value: "12",
            subtitle: "Different types",
            icon: Tractor,
            color: "text-purple-600",
          },
          {
            title: "Your Rating",
            value: user.rating.toString(),
            subtitle: `${user.totalBookings} bookings`,
            icon: Star,
            color: "text-yellow-600",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Left Column - Bookings & Activity */}
        <motion.div
          className="lg:col-span-4 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              <UpcomingBookings />
            </TabsContent>
            <TabsContent value="activity" className="space-y-4">
              <RecentActivity />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Right Column - Weather */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🌤️ Weather Forecast</CardTitle>
              <CardDescription>
                Local weather for {user.location.village}, {user.location.district}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherWidget />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Nearby Equipment */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📍 Nearby Equipment</CardTitle>
              <CardDescription>Equipment available for rent in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <NearbyEquipment />
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Updates */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">👥 Community Updates</CardTitle>
              <CardDescription>Latest from your farming community</CardDescription>
            </CardHeader>
            <CardContent>
              <CommunityUpdates />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weather Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <CardTitle className="text-orange-700">🌧️ Weather Alert</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              Heavy rainfall expected in {user.location.district} over the next 48 hours. Consider securing your
              equipment and harvesting any ready crops.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                View Detailed Forecast
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions for Mobile */}
      {isMobile && (
        <motion.div
          className="grid grid-cols-2 gap-4 pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button className="h-16 bg-green-600 hover:bg-green-700 flex-col gap-1">
            <Tractor className="h-5 w-5" />
            <span className="text-sm">Rent Equipment</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Users className="h-5 w-5" />
            <span className="text-sm">Find Workers</span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
