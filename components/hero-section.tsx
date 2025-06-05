"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { ArrowRight, Play, Star, Users, Tractor, MapPin } from "lucide-react"

export function HeroSection() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Indian farmer with tractor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="mr-2 h-4 w-4 fill-current" />
                Trusted by 10,000+ farmers across India
              </motion.div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl xl:text-7xl/none">
                <span className="gradient-text">Empowering</span>
                <br />
                <span className="text-white">Rural India</span>
                <br />
                <span className="text-green-400">Together</span>
              </h1>

              <p className="max-w-[600px] text-gray-200 text-lg md:text-xl leading-relaxed">
                Join India's largest agricultural equipment sharing platform. Rent, lend, or borrow farming tools and
                services with just a few clicks.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="btn-animate bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg group"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">10,000+ Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <Tractor className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">5,000+ Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">500+ Villages</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto lg:ml-auto"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Quick search card with glassmorphism effect */}
            <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-white/20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Find Equipment Near You</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label htmlFor="equipment-type" className="text-sm font-medium text-gray-700">
                        What do you need?
                      </label>
                      <select
                        id="equipment-type"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select equipment type</option>
                        <option value="tractor">🚜 Tractor</option>
                        <option value="harvester">🌾 Harvester</option>
                        <option value="plough">🔧 Plough</option>
                        <option value="sprayer">💧 Sprayer</option>
                        <option value="pump">⚡ Water Pump</option>
                      </select>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <select
                        id="location"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select your district</option>
                        <option value="pune">📍 Pune</option>
                        <option value="nashik">📍 Nashik</option>
                        <option value="nagpur">📍 Nagpur</option>
                        <option value="amravati">📍 Amravati</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                      When do you need it?
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium rounded-lg btn-animate">
                      🔍 Search Equipment
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                    💡 <strong>Pro tip:</strong> Book 24 hours in advance for better availability
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Floating stats cards */}
            <motion.div
              className="absolute -top-4 -left-4 bg-white rounded-lg p-3 shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-green"></div>
                <span className="text-sm font-medium">24 available nearby</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                  />
                </div>
                <span className="text-sm font-medium">+127 farmers joined today</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
