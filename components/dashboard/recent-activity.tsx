"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      description: "Your booking for Tractor - Mahindra 575 has been confirmed",
      time: "2 hours ago",
      icon: "/tractor-icon.png",
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment Received",
      description: "You received ₹1,200 for Water Pump rental",
      time: "Yesterday",
      icon: "/payment-icon.png",
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "Amit Patil: Is the water pump still available for tomorrow?",
      time: "2 days ago",
      avatar: "/farmer-3.jpg",
      name: "AP",
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      description: "Suresh Kumar gave you a 5-star rating",
      time: "3 days ago",
      avatar: "/farmer-2.jpg",
      name: "SK",
    },
    {
      id: 5,
      type: "listing_viewed",
      title: "Listing Viewed",
      description: "Your Harvester listing was viewed 12 times today",
      time: "3 days ago",
      icon: "/view-icon.png",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
          {activity.avatar ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.name} />
              <AvatarFallback>{activity.name}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <img src={activity.icon || "/placeholder.svg"} alt={activity.type} className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{activity.title}</h4>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
