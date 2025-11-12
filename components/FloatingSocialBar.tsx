"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Calendar } from "lucide-react"
import { socialLinks } from "@/content/data/social-links"

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Calendar,
}

export function FloatingSocialBar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg z-50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex gap-2">
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap]
          return (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
            >
              <Icon className="w-5 h-5 text-gray-700" />
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}

