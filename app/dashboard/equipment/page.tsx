"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function EquipmentPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("my-equipment")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    priceUnit: "hour",
    location: "",
  })

  const myEquipment = [
    {
      id: 1,
      name: "Tractor - Mahindra 575",
      category: "Tractor",
      image: "/tractor-mahindra.jpg",
      status: "available",
      price: "₹800/hour",
      bookings: 12,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Water Pump - 5HP",
      category: "Irrigation",
      image: "/water-pump.jpg",
      status: "rented",
      price: "₹300/day",
      bookings: 8,
      rating: 4.5,
    },
  ]

  const rentedEquipment = [
    {
      id: 1,
      name: "Harvester - New Holland",
      category: "Harvester",
      image: "/harvester.jpg",
      owner: "Lakshmi Devi",
      rentedUntil: "12 Jun 2025",
      price: "₹2,500/day",
    },
    {
      id: 2,
      name: "Rotavator - 7 feet",
      category: "Tillage",
      image: "/rotavator.jpg",
      owner: "Amit Patil",
      rentedUntil: "Tomorrow",
      price: "₹500/hour",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Equipment Added",
      description: `${formData.name} has been added to your equipment list.`,
    })
    setShowAddDialog(false)
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      priceUnit: "hour",
      location: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold tracking-tight">Equipment</h2>
          <p className="text-muted-foreground">Manage your equipment and rentals</p>
        </motion.div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>Add your equipment details to list it for rent</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEquipment} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Tractor - Mahindra 575"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractor">Tractor</SelectItem>
                      <SelectItem value="harvester">Harvester</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="tillage">Tillage</SelectItem>
                      <SelectItem value="seeding">Seeding</SelectItem>
                      <SelectItem value="spraying">Spraying</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Describe your equipment, condition, features, etc."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="e.g. 800"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceUnit">Price Unit</Label>
                  <Select value={formData.priceUnit} onValueChange={(value) => handleSelectChange("priceUnit", value)}>
                    <SelectTrigger id="priceUnit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Per Hour</SelectItem>
                      <SelectItem value="day">Per Day</SelectItem>
                      <SelectItem value="week">Per Week</SelectItem>
                      <SelectItem value="acre">Per Acre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Hadapsar, Pune"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Equipment Image</Label>
                <Input id="image" type="file" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Equipment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-equipment" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-equipment">My Equipment</TabsTrigger>
          <TabsTrigger value="rented">Rented Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="my-equipment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myEquipment.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <img
                        src={item.image || "/placeholder.svg?height=192&width=384"}
                        alt={item.name}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          item.status === "available" ? "bg-green-600" : "bg-orange-500"
                        }`}
                      >
                        {item.status === "available" ? "Available" : "Rented Out"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>View Bookings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-medium">{item.price}</div>
                      <div className="text-sm text-muted-foreground">{item.bookings} bookings</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="rented" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rentedEquipment.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <img
                        src={item.image || "/placeholder.svg?height=192&width=384"}
                        alt={item.name}
                        className="h-full w-full object-cover rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Owner:</span>
                        <span>{item.owner}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rented until:</span>
                        <span>{item.rentedUntil}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">{item.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                    <Button variant="outline" className="w-full">
                      Extend Rental
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Return</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
