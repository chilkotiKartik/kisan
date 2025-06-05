"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Star, Calendar, Clock, Heart, MessageSquare, Phone, Tractor } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/components/ui/use-toast"

export default function SearchPage() {
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const equipment = [
    {
      id: 1,
      name: "Tractor - Mahindra 575",
      owner: "Suresh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹800/hour",
      location: "Hadapsar, Pune",
      distance: "2.5 km",
      rating: 4.8,
      reviews: 24,
      available: true,
      category: "tractor",
      features: ["GPS Enabled", "AC Cabin", "Power Steering"],
    },
    {
      id: 2,
      name: "Harvester - New Holland",
      owner: "Lakshmi Devi",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹2,500/day",
      location: "Kharadi, Pune",
      distance: "4.1 km",
      rating: 4.9,
      reviews: 31,
      available: true,
      category: "harvester",
      features: ["Multi-crop", "Self-propelled", "High capacity"],
    },
    {
      id: 3,
      name: "Water Pump - 5HP",
      owner: "Amit Patil",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹300/day",
      location: "Wagholi, Pune",
      distance: "3.2 km",
      rating: 4.5,
      reviews: 18,
      available: true,
      category: "irrigation",
      features: ["Electric", "Portable", "High efficiency"],
    },
    {
      id: 4,
      name: "Rotavator - 7 feet",
      owner: "Prakash Joshi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1592982634040-c0be17c4e2c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹500/hour",
      location: "Baner, Pune",
      distance: "5.5 km",
      rating: 4.7,
      reviews: 22,
      available: false,
      category: "tillage",
      features: ["Heavy duty", "Adjustable depth", "PTO driven"],
    },
    {
      id: 5,
      name: "Sprayer - Battery Operated",
      owner: "Anita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹200/day",
      location: "Hinjewadi, Pune",
      distance: "6.8 km",
      rating: 4.3,
      reviews: 15,
      available: true,
      category: "spraying",
      features: ["Rechargeable", "Lightweight", "Adjustable nozzle"],
    },
    {
      id: 6,
      name: "Thresher - Multi-crop",
      owner: "Rajendra Singh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "₹1,200/day",
      location: "Wakad, Pune",
      distance: "7.2 km",
      rating: 4.6,
      reviews: 28,
      available: true,
      category: "harvesting",
      features: ["Multi-crop", "High output", "Easy operation"],
    },
  ]

  const categories = [
    { value: "all", label: "All Equipment", icon: "🚜" },
    { value: "tractor", label: "Tractors", icon: "🚜" },
    { value: "harvester", label: "Harvesters", icon: "🌾" },
    { value: "irrigation", label: "Irrigation", icon: "💧" },
    { value: "tillage", label: "Tillage", icon: "🔧" },
    { value: "spraying", label: "Spraying", icon: "💨" },
    { value: "harvesting", label: "Harvesting", icon: "🌾" },
  ]

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleBookNow = (equipment: any) => {
    toast({
      title: "🎉 Booking Initiated",
      description: `Starting booking process for ${equipment.name}`,
    })
  }

  const handleContact = (owner: string, method: string) => {
    toast({
      title: `📞 Contacting ${owner}`,
      description: `Opening ${method} to contact equipment owner`,
    })
  }

  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">🔍 Find Equipment</h2>
        <p className="text-muted-foreground">Discover agricultural equipment available for rent near you</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search equipment, owner, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={`whitespace-nowrap ${
                selectedCategory === category.value ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{filteredEquipment.length} equipment found</p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </motion.div>

      {/* Equipment Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEquipment.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Equipment Image */}
              <div className="relative h-48">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  <Badge className={`${item.available ? "bg-green-600" : "bg-gray-600"}`}>
                    {item.available ? "Available" : "Booked"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-white/90">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.distance}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Equipment Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.owner} />
                      <AvatarFallback>{item.owner[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{item.owner}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {item.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <p className="text-lg font-bold text-green-600">{item.price}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleContact(item.owner, "message")}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleContact(item.owner, "call")}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Book Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!item.available}
                    onClick={() => handleBookNow(item)}
                  >
                    {item.available ? (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Currently Booked
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEquipment.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tractor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No equipment found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse different categories</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Quick Actions for Mobile */}
      {isMobile && (
        <motion.div
          className="fixed bottom-20 left-4 right-4 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Need help finding equipment?</p>
                <p className="text-xs text-muted-foreground">Get personalized recommendations</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Get Help
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
