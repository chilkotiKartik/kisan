"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, MessageSquare, Phone, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function BookingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const upcomingBookings = [
    {
      id: 1,
      equipment: "Tractor - Mahindra 575",
      owner: "Suresh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "Today",
      time: "2:00 PM - 6:00 PM",
      location: "Hadapsar, Pune",
      status: "confirmed",
      price: "₹3,200",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      equipment: "Water Pump - 5HP",
      owner: "Amit Patil",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "Tomorrow",
      time: "9:00 AM - 12:00 PM",
      location: "Wagholi, Pune",
      status: "pending",
      price: "₹900",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+91 98765 43211",
    },
    {
      id: 3,
      equipment: "Harvester - New Holland",
      owner: "Lakshmi Devi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "12 Jun 2025",
      time: "7:00 AM - 7:00 PM",
      location: "Kharadi, Pune",
      status: "confirmed",
      price: "₹2,500",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      phone: "+91 98765 43212",
    },
  ]

  const pastBookings = [
    {
      id: 1,
      equipment: "Rotavator - 7 feet",
      owner: "Prakash Joshi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "28 May 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Baner, Pune",
      status: "completed",
      price: "₹3,000",
      rated: true,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1592982634040-c0be17c4e2c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      equipment: "Sprayer - Battery Operated",
      owner: "Anita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      date: "15 May 2025",
      time: "8:00 AM - 5:00 PM",
      location: "Hinjewadi, Pune",
      status: "completed",
      price: "₹600",
      rated: false,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      equipment: "Tractor - John Deere 5310",
      owner: "Rajendra Singh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: "2 May 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Wakad, Pune",
      status: "completed",
      price: "₹4,800",
      rated: true,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ]

  const handleCancelBooking = (bookingId: number) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    })
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
    setShowReviewDialog(false)
    setRating(0)
    setReview("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-green-600"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
          <p className="text-muted-foreground">Manage your equipment rentals and bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700">📅 New Booking</Button>
        </div>
      </motion.div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Equipment Image */}
                      <div className="md:w-48 h-48 md:h-auto">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.equipment}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{booking.equipment}</h3>
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.owner} />
                                <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{booking.owner}</span>
                                <p className="text-sm text-muted-foreground">Equipment Owner</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </Badge>
                            <span className="text-xl font-bold text-green-600">{booking.price}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                          {booking.status === "pending" && (
                            <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                              Cancel
                            </Button>
                          )}
                          {booking.status === "confirmed" && (
                            <Button variant="outline" size="sm">
                              Modify
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4">
            {pastBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Equipment Image */}
                      <div className="md:w-48 h-48 md:h-auto">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.equipment}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{booking.equipment}</h3>
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.owner} />
                                <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">{booking.owner}</span>
                                <p className="text-sm text-muted-foreground">Equipment Owner</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gray-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Completed
                            </Badge>
                            <span className="text-xl font-bold text-gray-600">{booking.price}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {booking.rated ? (
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground">Your rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < booking.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                    <Star className="h-4 w-4 mr-2" />
                                    Rate & Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle>Rate Your Experience</DialogTitle>
                                    <DialogDescription>
                                      How was your experience with {booking.equipment}?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Rating</label>
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <button key={star} onClick={() => setRating(star)} className="p-1">
                                            <Star
                                              className={`h-6 w-6 ${
                                                star <= rating
                                                  ? "fill-yellow-400 text-yellow-400"
                                                  : "text-gray-300 hover:text-yellow-300"
                                              }`}
                                            />
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label htmlFor="review" className="text-sm font-medium">
                                        Review (Optional)
                                      </label>
                                      <Textarea
                                        id="review"
                                        placeholder="Share your experience..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleSubmitReview} className="bg-green-600 hover:bg-green-700">
                                      Submit Review
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                            <Button variant="outline" size="sm">
                              Download Receipt
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings.length + pastBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingBookings.length} upcoming, {pastBookings.length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <span className="text-green-600">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹10,300</div>
            <p className="text-xs text-muted-foreground">₹6,100 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Based on {pastBookings.filter((b) => b.rated).length} reviews
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
