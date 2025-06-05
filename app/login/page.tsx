"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/hooks/use-translation"
import { useUser } from "@/hooks/use-user"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Eye, EyeOff, Smartphone, User, Tractor } from "lucide-react"

export default function LoginPage() {
  const { t } = useTranslation()
  const { login } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(formData.email, formData.password)

      if (success) {
        toast({
          title: "🎉 Welcome back!",
          description: "Login successful. Redirecting to dashboard...",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "❌ Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    {
      email: "demo@kisansetu.com",
      password: "demo123",
      role: "Farmer",
      icon: <User className="h-4 w-4" />,
      description: "Experience the farmer dashboard",
    },
    {
      email: "provider@kisansetu.com",
      password: "provider123",
      role: "Equipment Provider",
      icon: <Tractor className="h-4 w-4" />,
      description: "Experience the provider dashboard",
    },
  ]

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <motion.div
          className="w-full max-w-md space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* App-like header */}
          <div className="text-center space-y-2">
            <motion.div
              className="mx-auto w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tractor className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your KisanSetu account</p>
          </div>

          {/* Login Form */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-6 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="remember-me" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/register" className="text-green-600 hover:text-green-700 font-medium">
                Sign up
              </Link>
            </div>
          </motion.div>

          {/* Demo Accounts */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">🚀 Try Demo Accounts</h3>
              <p className="text-sm text-gray-600">Experience different user roles</p>
            </div>

            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <motion.button
                  key={index}
                  onClick={() => fillDemoCredentials(account.email, account.password)}
                  className="w-full p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      {account.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{account.role}</div>
                      <div className="text-sm text-gray-600">{account.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {account.email} / {account.password}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mobile App Features */}
          <motion.div
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="h-6 w-6" />
              <h3 className="font-semibold">Mobile App Experience</h3>
            </div>
            <p className="text-green-100 text-sm">
              Enjoy a native app-like experience with offline support, push notifications, and seamless performance.
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
