"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "farmer" | "provider" | "both"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  location: {
    district: string
    village: string
  }
  verified: boolean
  rating: number
  totalBookings: number
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("kisansetu_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic
    if (email === "demo@kisansetu.com" && password === "demo123") {
      const demoUser: User = {
        id: "1",
        name: "Rajesh Patel",
        email: "demo@kisansetu.com",
        phone: "+91 98765 43210",
        role: "farmer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        location: {
          district: "Pune",
          village: "Hadapsar",
        },
        verified: true,
        rating: 4.8,
        totalBookings: 24,
      }
      setUser(demoUser)
      localStorage.setItem("kisansetu_user", JSON.stringify(demoUser))
      return true
    } else if (email === "provider@kisansetu.com" && password === "provider123") {
      const providerUser: User = {
        id: "2",
        name: "Suresh Kumar",
        email: "provider@kisansetu.com",
        phone: "+91 98765 43211",
        role: "provider",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        location: {
          district: "Pune",
          village: "Wagholi",
        },
        verified: true,
        rating: 4.9,
        totalBookings: 156,
      }
      setUser(providerUser)
      localStorage.setItem("kisansetu_user", JSON.stringify(providerUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kisansetu_user")
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
