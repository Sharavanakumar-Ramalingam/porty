"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export function AnimatedWrapper({
  children,
  direction = "up",
}: {
  children: ReactNode
  direction?: "up" | "left" | "right" | "down"
}) {
  const variants: any = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  )
}
