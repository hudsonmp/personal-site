"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExperienceItem } from "@/content/data/types"

interface ExperienceCardProps {
  item: ExperienceItem
  isNested?: boolean
}

export function ExperienceCard({ item, isNested = false }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusDot = (title: string) => {
    if (title.includes("Active")) {
      return <div className="w-2 h-2 bg-green-500 rounded-full" />
    }
    if (title.includes("Upcoming")) {
      return <div className="w-2 h-2 bg-blue-500 rounded-full" />
    }
    return null
  }

  return (
    <div className={`transition-all duration-200 ease-in-out ${isNested ? "ml-6 mt-2" : ""}`}>
      <div>
        <div
          className="cursor-pointer hover:bg-muted/30 transition-all duration-200 ease-in-out py-2 px-3 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {item.isProjectCategory ? (
                getStatusDot(item.title)
              ) : item.logo ? (
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src={item.logo}
                    alt={`${item.organization} logo`}
                    width={32}
                    height={32}
                    className="object-contain rounded"
                  />
                </div>
              ) : null}
              <div className="text-left">
                <div className="text-base font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground text-right">{item.dates}</div>
              <div className="transition-transform duration-200 ease-in-out">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
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
                <p className="text-sm text-muted-foreground whitespace-pre-line">{item.description}</p>
                {item.nested && (
                  <div className="mt-4 space-y-2">
                    {item.nested.map((nestedItem) => (
                      <ExperienceCard key={nestedItem.id} item={nestedItem} isNested />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

