"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Calendar } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

interface ExperienceItem {
  id: string
  title: string
  organization: string
  logo: string
  role?: string
  description: string
  dates: string
  nested?: ExperienceItem[]
  isProjectCategory?: boolean
}

const workExperience: ExperienceItem[] = [
  {
    id: "ucsd-lab",
    title: "CS Education Lab UCSD",
    organization: "UCSD",
    logo: "/images/ucsd-logo.png",
    role: "Researcher",
    description:
      "Researching the integration of AI in novice CS education under PhD Student Annapurna Vadaparty and Professor Leo Porter.",
    dates: "June 2025 - present",
  },
  {
    id: "swear",
    title: "SDUSD Student Wellness, Education, and Resources Committee",
    organization: "SDUSD",
    logo: "/images/swear-logo.png",
    role: "Outreach Representative",
    description:
      "Working with peers, advisors, and district board members to improve student mental health with AI and student outreach.",
    dates: "May 2025 - present",
  },
  {
    id: "high-school-clubs",
    title: "High School Clubs",
    organization: "Patrick Henry High School",
    logo: "/images/patrick-henry-shield.png",
    role: "Leadership",
    description: "Leadership roles across multiple student organizations",
    dates: "May 2025 - present",
    nested: [
      {
        id: "ai-club",
        title: "Henry AI Club",
        organization: "Henry AI Club",
        logo: "/images/henry-ai-logo.png",
        role: "Founder + President",
        description:
          "Created + growing an AI club at my high school to integrate AI literacy and prompt engineering into our curriculum. Bringing pizza to meetings attracts lotssss of members!",
        dates: "May 2025 - present",
      },
      {
        id: "cs-club",
        title: "CS Club",
        organization: "CS Club",
        logo: "/images/patrick-henry-shield.png",
        role: "Vice President",
        description:
          "Transforming a historically dead club into a vibrant community of student builders at my high school.",
        dates: "May 2025 - present",
      },
      {
        id: "model-un",
        title: "Henry Model UN",
        organization: "Henry Model UN",
        logo: "/images/patrick-henry-emblem.png",
        role: "Under Secretariat for Outreach",
        description:
          "Designing an AI-powered conference management system and recruiting additional high schools to our conference.",
        dates: "June 2025 - present",
      },
    ],
  },
]

const projects: ExperienceItem[] = [
  {
    id: "active-projects",
    title: "Active Projects",
    organization: "Current Work",
    logo: "/images/henry-ai-logo.png",
    description: "Currently active projects and builds",
    dates: "2025",
    isProjectCategory: true,
    nested: [
      {
        id: "netwrxk",
        title: "Netwrxk",
        organization: "netwrxk.com",
        logo: "/images/ucsd-seal.png",
        description:
          "Worked with two UCSD Data Science students to match students with professors and labs based on academia @UCSD engineering",
        dates: "April 2025 - May 2025",
      },
      {
        id: "firstintel",
        title: "FirstIntel",
        organization: "TritonHacks",
        logo: "/images/tritonhacks-logo.png",
        description:
          "Fine-tuned a CV model to count the number of people inside a building and relay that information to first responders via SMS.\nAwards: TritonHacks finalist",
        dates: "2025",
      },
      {
        id: "schoolassess",
        title: "SchoolAssess",
        organization: "schoolassess.vercel.app",
        logo: "/images/henry-ai-logo.png",
        description:
          "Help schools estimate the value of their assets to submit to insurance in case of shooting or natural disaster.",
        dates: "May 2025",
      },
    ],
  },
  {
    id: "upcoming-projects",
    title: "Upcoming Projects",
    organization: "Future Work",
    logo: "/images/henry-ai-logo.png",
    description: "Projects in development and planning",
    dates: "2025",
    isProjectCategory: true,
    nested: [
      {
        id: "events-aggregator",
        title: "Events Aggregator",
        organization: "Henry AI Club",
        logo: "/images/henry-ai-logo.png",
        description:
          "Scrape high school Instagram accounts to identify upcoming events and input them into an interactive + filterable centralized calendar.",
        dates: "Coming Soon",
      },
      {
        id: "voice-journal",
        title: "Voice Journal",
        organization: "Henry AI Club",
        logo: "/images/henry-ai-logo.png",
        description:
          "Allow users to record 60 second audio clips of them talking about their mood and AI will identify trends and generate a shareable graphic for Snapchat + Instagram.\nBusiness Model: B2B2C with therapists + school psychologists",
        dates: "Coming Soon",
      },
    ],
  },
]

const education: ExperienceItem[] = [
  {
    id: "patrick-henry",
    title: "Patrick Henry High School",
    organization: "Patrick Henry High School",
    logo: "/images/patrick-henry-shield.png",
    description: "GPA: 4.17\nActivities: Model UN, VP CS Club, Founder + President AI Club, JV tennis & XC",
    dates: "August 2024 - June 2028",
  },
  {
    id: "aops",
    title: "Art of Problem Solving",
    organization: "AoPS",
    logo: "/images/aops-logo.png",
    description: "Advanced college-level single variable calculus and differential equations.",
    dates: "June 2025 - December 2025",
  },
]


const categories = {
  "locked in": workExperience,
  projects: projects,
  "learning": education,
}

function ExperienceCard({ item, isNested = false }: { item: ExperienceItem; isNested?: boolean }) {
  const [isOpen, setIsOpen] = useState(item.isProjectCategory || false)

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
              ) : (
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src={item.logo || "/placeholder.svg"}
                    alt={`${item.organization} logo`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
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
                <p className="text-sm text-muted-foreground whitespace-pre-line ml-11">{item.description}</p>
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

function FloatingSocialBar() {
  const [isHovered, setIsHovered] = useState(false)

  const socialLinks = [
    { icon: Github, href: "https://github.com/hudsonmp", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/hudson-mitchell-pullman-5bbb18318/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hudsonmitchellpullman@gmail.com", label: "Email" },
    { icon: Twitter, href: "https://x.com/hudsonmp10", label: "Twitter" },
    { icon: Calendar, href: "https://cal.com/hudsonmp", label: "Schedule Meeting" },
  ]

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg z-50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex gap-2">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon className="w-5 h-5 text-gray-700" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<keyof typeof categories>("locked in")

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">hey, i'm hudson</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              fifteen. high school sophomore. research @ ucsd. patrick henry high school '28. building saas.
            </p>

            {/* About Section - moved inside header */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">about</h2>
              <p className="text-muted-foreground leading-relaxed">
                super curious about how computers + ai are improving our lives. love thinking about innovative ideas,
                collaborating with researchers, teaching others, using generative ai, and talking about startups. i
                focus on how interactive ai tools will transform what and how we should teach and address mental health.
              </p>
            </div>
          </div>
          <div className="w-48 h-48 relative flex-shrink-0">
            <Image
              src="/images/hudson-profile.jpeg"
              alt="Hudson's profile picture"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(categories).map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(category as keyof typeof categories)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4 mb-12">
          {categories[activeTab].length > 0 ? (
            categories[activeTab].map((item) => <ExperienceCard key={item.id} item={item} />)
          ) : (
            <div className="py-12">
              <p className="text-muted-foreground">Content for {activeTab} coming soon...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">made with ❤️ by hudson + ai</div>
      </div>

      <FloatingSocialBar />
    </div>
  )
}
