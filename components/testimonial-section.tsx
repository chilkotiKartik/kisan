"use client"

import { useTranslation } from "@/hooks/use-translation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function TestimonialSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      quote:
        "KisanSetu has completely transformed how I manage my farm. I was able to rent a tractor at half the price I used to pay, and the booking process was incredibly simple. The community support is amazing!",
      author: "Rajesh Patel",
      role: "Wheat Farmer, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      location: "Pune, Maharashtra",
      savings: "₹50,000 saved annually",
    },
    {
      quote:
        "As a small farmer, I could never afford my own harvester. Now I can rent one whenever I need it, and I've even started lending my water pump to earn extra income. It's a win-win for everyone!",
      author: "Lakshmi Devi",
      role: "Rice Farmer, Tamil Nadu",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      location: "Coimbatore, Tamil Nadu",
      savings: "₹30,000 extra income",
    },
    {
      quote:
        "The community features are incredible. I've learned so many new farming techniques from other farmers, and the local language support makes it accessible for everyone in my village.",
      author: "Amit Singh",
      role: "Vegetable Farmer, Punjab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      location: "Ludhiana, Punjab",
      savings: "40% cost reduction",
    },
    {
      quote:
        "The trust and verification system gives me confidence when renting equipment. I know I'm dealing with genuine farmers, and the insurance coverage provides peace of mind.",
      author: "Priya Sharma",
      role: "Organic Farmer, Rajasthan",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      location: "Jaipur, Rajasthan",
      savings: "100% secure transactions",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeIndex])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
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
            💬 Success Stories
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">
            Hear From Our Farmers
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
            Real stories from farmers who have transformed their agricultural practices with KisanSetu.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="relative">
                      <Quote className="absolute -top-4 -left-4 h-16 w-16 text-green-200" />
                      <blockquote className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed pl-8">
                        "{testimonials[activeIndex].quote}"
                      </blockquote>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                        <AvatarImage
                          src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                          alt={testimonials[activeIndex].author}
                        />
                        <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
                          {testimonials[activeIndex].author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{testimonials[activeIndex].author}</div>
                        <div className="text-sm text-gray-600">{testimonials[activeIndex].role}</div>
                        <div className="text-sm text-green-600 font-medium">
                          📍 {testimonials[activeIndex].location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        💰 {testimonials[activeIndex].savings}
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <motion.div
                      className="relative h-64 md:h-full rounded-2xl overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Farmer with equipment"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </motion.div>

                    {/* Floating stats */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">4.9★</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-green-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="sr-only">Testimonial {index + 1}</span>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>

          {/* Additional testimonials preview */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  index === activeIndex
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200 hover:border-green-200"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
