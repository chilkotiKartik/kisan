"use client"

import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

export function StatsSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { value: 10000, label: t("farmers") },
    { value: 5000, label: t("equipment_listings") },
    { value: 25000, label: t("bookings_completed") },
    { value: 500, label: t("villages_covered") },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-green-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("stats_title")}</h2>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">{t("stats_subtitle")}</p>
          </div>
        </div>
        <div ref={ref} className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CountUp end={stat.value} inView={inView} />
              <p className="text-sm font-medium text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, inView }: { end: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start > end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, inView])

  return <div className="text-4xl font-bold">{new Intl.NumberFormat().format(count)}+</div>
}
