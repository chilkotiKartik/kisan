"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function NearbyEquipment() {
  const equipment = [
    {
      id: 1,
      name: "Tractor - John Deere 5310",
      image: "/tractor-1.jpg",
      price: "₹800/hour",
      distance: "2.5 km",
      rating: 4.8,
      reviews: 24,
      available: true,
    },
    {
      id: 2,
      name: "Rotavator - 7 feet",
      image: "/rotavator.jpg",
      price: "₹500/hour",
      distance: "3.2 km",
      rating: 4.5,
      reviews: 18,
      available: true,
    },
    {
      id: 3,
      name: "Sprayer - Battery Operated",
      image: "/sprayer.jpg",
      price: "₹300/day",
      distance: "4.1 km",
      rating: 4.2,
      reviews: 12,
      available: false,
    },
    {
      id: 4,
      name: "Thresher - Multi-crop",
      image: "/thresher.jpg",
      price: "₹600/hour",
      distance: "5.5 km",
      rating: 4.7,
      reviews: 31,
      available: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {equipment.map((item) => (
        <div key={item.id} className="flex border rounded-lg overflow-hidden">
          <div className="w-24 h-24 bg-gray-100">
            <img
              src={item.image || "/placeholder.svg?height=96&width=96"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{item.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{item.rating}</span>
                  <span className="text-xs text-muted-foreground">({item.reviews})</span>
                </div>
              </div>
              <Badge variant={item.available ? "default" : "outline"} className={item.available ? "bg-green-600" : ""}>
                {item.available ? "Available" : "Booked"}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm font-medium">{item.price}</div>
              <div className="text-xs text-muted-foreground">{item.distance}</div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="col-span-1 md:col-span-2 mt-2">
        View All Nearby Equipment
      </Button>
    </div>
  )
}
