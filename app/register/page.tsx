"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/hooks/use-translation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "farmer",
    district: "",
    village: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        })
        return
      }
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now log in.",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <motion.div
          className="mx-auto w-full max-w-md space-y-6 p-8 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-500">Join KisanSetu to access agricultural tools and services</p>
          </div>

          <div className="flex justify-between mb-6">
            <div className={`h-2 w-1/2 ${step >= 1 ? "bg-green-600" : "bg-gray-200"} rounded-l-full`}></div>
            <div className={`h-2 w-1/2 ${step >= 2 ? "bg-green-600" : "bg-gray-200"} rounded-r-full`}></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="button" className="w-full bg-green-600 hover:bg-green-700" onClick={handleNextStep}>
                  Next
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="farmer" id="farmer" />
                      <Label htmlFor="farmer">Farmer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service-provider" id="service-provider" />
                      <Label htmlFor="service-provider">Service Provider</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ngo" id="ngo" />
                      <Label htmlFor="ngo">NGO / Co-operative</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select value={formData.district} onValueChange={(value) => handleSelectChange("district", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nashik">Nashik</SelectItem>
                      <SelectItem value="nagpur">Nagpur</SelectItem>
                      <SelectItem value="amravati">Amravati</SelectItem>
                      <SelectItem value="solapur">Solapur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="village">Village / Town</Label>
                  <Input
                    id="village"
                    name="village"
                    placeholder="Enter your village or town"
                    value={formData.village}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-green-600 hover:text-green-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="w-1/2" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button type="submit" className="w-1/2 bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:text-green-700">
              Login
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
