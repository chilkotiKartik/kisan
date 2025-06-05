"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Tractor, Star, DollarSign, Plus, Eye, MessageSquare, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

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

interface ProviderDashboardProps {
  user: User
}

export function ProviderDashboard({ user }: ProviderDashboardProps) {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("overview")

  const myEquipment = [
    {
      id: 1,
      name: "Tractor - Mahindra 575",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "available",
      price: "₹800/hour",
      bookings: 12,
      rating: 4.8,
      earnings: "₹24,000",
    },
    {
      id: 2,
      name: "Water Pump - 5HP",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "rented",
      price: "₹300/day",
      bookings: 8,
      rating: 4.5,
      earnings: "₹12,000",
    },
    {
      id: 3,
      name: "Rotavator - 7 feet",
      image:
        "https://images.unsplash.com/photo-1592982634040-c0be17c4e2c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "maintenance",
      price: "₹500/hour",
      bookings: 15,
      rating: 4.9,
      earnings: "₹18,500",
    },
  ]

  const pendingBookings = [
    {
      id: 1,
      equipment: "Tractor - Mahindra 575",
      renter: "Amit Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "Tomorrow",
      time: "9:00 AM - 5:00 PM",
      price: "₹6,400",
      status: "pending",
    },
    {
      id: 2,
      equipment: "Water Pump - 5HP",
      renter: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "15 Jun 2025",
      time: "6:00 AM - 12:00 PM",
      price: "₹1,800",
      status: "pending",
    },
  ]

  const stats = [
    {
      title: "Total Earnings",
      value: "₹54,500",
      subtitle: "This month",
      icon: DollarSign,
      color: "text-green-600",
      change: "+12%",
    },
    {
      title: "Active Equipment",
      value: "3",
      subtitle: "2 available, 1 rented",
      icon: Tractor,
      color: "text-blue-600",
      change: "+1",
    },
    {
      title: "Pending Requests",
      value: "5",
      subtitle: "Awaiting approval",
      icon: Calendar,
      color: "text-orange-600",
      change: "+2",
    },
    {
      title: "Average Rating",
      value: "4.8",
      subtitle: "From 35 reviews",
      icon: Star,
      color: "text-yellow-600",
      change: "+0.1",
    },
  ]

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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]} 🚜</h2>
          <p className="text-muted-foreground">Manage your equipment and bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Pending Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📋 Pending Requests</CardTitle>
                <CardDescription>Equipment booking requests awaiting your approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.renter} />
                        <AvatarFallback>{booking.renter[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{booking.equipment}</h4>
                        <p className="text-sm text-muted-foreground">{booking.renter}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{booking.price}</p>
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📈 Recent Activity</CardTitle>
                <CardDescription>Your latest equipment activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    action: "Booking completed",
                    equipment: "Tractor - Mahindra 575",
                    amount: "₹6,400",
                    time: "2 hours ago",
                  },
                  {
                    action: "New booking request",
                    equipment: "Water Pump - 5HP",
                    amount: "₹1,800",
                    time: "5 hours ago",
                  },
                  { action: "Payment received", equipment: "Rotavator - 7 feet", amount: "₹3,500", time: "1 day ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.equipment}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{activity.amount}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myEquipment.map((equipment) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <img
                      src={equipment.image || "/placeholder.svg"}
                      alt={equipment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${
                        equipment.status === "available"
                          ? "bg-green-600"
                          : equipment.status === "rented"
                            ? "bg-blue-600"
                            : "bg-orange-600"
                      }`}
                    >
                      {equipment.status === "available"
                        ? "Available"
                        : equipment.status === "rented"
                          ? "Rented"
                          : "Maintenance"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{equipment.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">{equipment.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bookings:</span>
                        <span>{equipment.bookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{equipment.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Earnings:</span>
                        <span className="font-semibold text-green-600">{equipment.earnings}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.renter} />
                        <AvatarFallback>{booking.renter[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.equipment}</h3>
                        <p className="text-muted-foreground">{booking.renter}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{booking.price}</p>
                      <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-green-600 hover:bg-green-700">Accept Booking</Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="destructive">Decline</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
