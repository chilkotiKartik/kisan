"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, MessageSquare, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function UpcomingBookings() {
  const bookings = [
    {
      id: 1,
      equipment: "Tractor - Mahindra 575",
      owner: "Suresh Kumar",
      avatar: "/farmer-2.jpg",
      date: "Today",
      time: "2:00 PM - 6:00 PM",
      location: "Hadapsar, Pune",
      status: "confirmed",
    },
    {
      id: 2,
      equipment: "Water Pump - 5HP",
      owner: "Amit Patil",
      avatar: "/farmer-3.jpg",
      date: "Tomorrow",
      time: "9:00 AM - 12:00 PM",
      location: "Wagholi, Pune",
      status: "pending",
    },
    {
      id: 3,
      equipment: "Harvester - New Holland",
      owner: "Lakshmi Devi",
      avatar: "/farmer-1.jpg",
      date: "12 Jun 2025",
      time: "7:00 AM - 7:00 PM",
      location: "Kharadi, Pune",
      status: "confirmed",
    },
  ]

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{booking.equipment}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={booking.avatar || "/placeholder.svg"} alt={booking.owner} />
                        <AvatarFallback>{booking.owner[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{booking.owner}</span>
                    </div>
                  </div>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "outline"}
                    className={booking.status === "confirmed" ? "bg-green-600" : ""}
                  >
                    {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex border-t md:border-t-0 md:border-l">
                <Button variant="ghost" className="flex-1 rounded-none h-auto py-4">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="ghost" className="flex-1 rounded-none h-auto py-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
