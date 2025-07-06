"use client"

import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { Tractor, Users, Star, Globe, MessageCircle, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Tractor className="h-10 w-10 text-green-600" />,
      title: "Smart Equipment Sharing",
      description:
        "Rent or lend agricultural equipment with ease and affordability. Access tractors, harvesters, and more.",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "5,000+ Equipment Listed",
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Farmer Community",
      description: "Connect with fellow farmers, share knowledge, and build lasting relationships in your local area.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "10,000+ Active Farmers",
    },
    {
      icon: <Star className="h-10 w-10 text-green-600" />,
      title: "Trust & Verification",
      description: "Verified profiles with ratings and reviews ensure secure and reliable transactions every time.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "4.8/5 Average Rating",
    },
    {
      icon: <Globe className="h-10 w-10 text-green-600" />,
      title: "Multi-Language Support",
      description: "Available in Hindi, Marathi, Bengali, Tamil, and more regional languages for better accessibility.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "5+ Languages Supported",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-green-600" />,
      title: "Real-time Communication",
      description: "Chat with equipment owners, negotiate prices, and coordinate pickups through our messaging system.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "24/7 Support Available",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: "Secure Payments",
      description: "Safe and secure payment options with insurance coverage and dispute resolution for peace of mind.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      stats: "100% Secure Transactions",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm text-green-600 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            ✨ Platform Features
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
            Revolutionizing Agricultural Equipment Sharing
          </h2>
          <p className="mx-auto max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform offers innovative solutions to make farming more accessible, efficient, and profitable for
            everyone.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-600/20"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 group-hover:bg-green-100 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-green-600">{feature.stats}</span>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg btn-animate group">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
