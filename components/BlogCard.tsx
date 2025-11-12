"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BlogPost } from "@/content/data/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="transition-all duration-200 ease-in-out">
      <div
        className="cursor-pointer hover:bg-muted/30 transition-all duration-200 ease-in-out py-2 px-3 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-base font-medium">{post.title}</div>
            <div className="text-sm text-muted-foreground">{post.date}</div>
          </div>
          <div className="transition-transform duration-200 ease-in-out">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="pt-0 px-3 pb-2">
              <p className="text-sm text-muted-foreground whitespace-pre-line">{post.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

