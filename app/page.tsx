"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Calendar } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react"

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
    role: "Research Assistant",
    description: "Conducting research on computer science education and the integration of human-AI interaction into learning experiences. Researching AI integration in novice CS education under PhD Student Annapurna Vadaparty and Professor Leo Porter.",
    dates: "June 2025 - present",
  },
  {
    id: "swear",
    title: "SDUSD Student Wellness, Education, and Resources Committee",
    organization: "SDUSD",
    logo: "/images/swear-logo.png",
    role: "Outreach Representative",
    description: "Improving student mental health with AI and student outreach initiatives.",
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
        description: "Integrating AI literacy and prompt engineering into high school curriculum.",
        dates: "May 2025 - present",
      },
      {
        id: "cs-club",
        title: "CS Club",
        organization: "CS Club",
        logo: "/images/patrick-henry-shield.png",
        role: "Vice President",
        description: "Building a community of student builders and developers.",
        dates: "May 2025 - present",
      },
      {
        id: "model-un",
        title: "Henry Model UN",
        organization: "Henry Model UN",
        logo: "/images/patrick-henry-emblem.png",
        role: "Under Secretariat for Outreach",
        description: "Designing AI-powered conference management system and expanding conference participation.",
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
        id: "syntra",
        title: "Syntra",
        organization: "Cerebral Valley",
        logo: "/images/cerebral-valley-logo.png",
        description: "AI-powered design tool integration. Top 6 finalist at Gemini AI Hackathon Cerebral Valley. Built with team focusing on bridging code and design workflows.",
        dates: "2025",
      },
      {
        id: "arxai",
        title: "ArxAI",
        organization: "SDx",
        logo: "/images/henry-ai-logo.png",
        description: "Launches deep research with Parallel AI and Claude's Agentic SDK. System for processing and annotating research papers with AI-powered analysis, highlighting relevant sections, and storing annotated PDFs in Supabase storage buckets.",
        dates: "October 2025",
      },
      {
        id: "turingvault",
        title: "TuringVault",
        organization: "CipherHacks",
        logo: "/images/henry-ai-logo.png",
        description: "AI-powered security analysis tool for GitHub repositories. Identifies vulnerabilities in AI-assisted code using GPT-5 Reasoning. Evaluates files for common security risks (SQL injection, XSS, hardcoded secrets) and provides targeted recommendations with code snippets and explanations. Best Design winner at CipherHacks '25.",
        dates: "October-November 2025",
      },
      {
        id: "events",
        title: "Events Aggregator",
        organization: "Henry AI Club",
        logo: "/images/henry-ai-logo.png",
        description: "Automated Instagram scraper that downloads and stores content from Patrick Henry High School Instagram accounts in Supabase. Features dual mode operation (initialization vs hourly updates), caption storage, smart content filtering, and organized storage buckets. Runs automatically every hour via GitHub Actions.",
        dates: "2025",
      },
      {
        id: "prez-challenge",
        title: "Lesson Plan Generator",
        organization: "prez-challenge",
        logo: "/images/henry-ai-logo.png",
        description: "AI-powered web application that transforms textbook PDFs into comprehensive, interactive lesson plans for teachers using OpenAI's GPT-4. Features customizable duration (7, 14, or 30 days), interactive calendar view, comprehensive lesson plans with student notes, review questions, mini-quizzes with answer keys, and educational standards references.",
        dates: "2025",
      },
      {
        id: "firstintel",
        title: "FirstIntel",
        organization: "TritonHacks",
        logo: "/images/tritonhacks-logo.png",
        description: "Computer vision model using YOLOv8 with DeepSORT to track people entering/exiting buildings via security camera footage. Fine-tuned YOLO-v8 on a Kaggle dataset of 400+ doors to recognize doorways. Automatically alerts first responders via SMS/Twilio when crisis occurs, providing real-time building occupancy data to help first responders execute faster, safer rescues.",
        dates: "2025",
      },
      {
        id: "schoolassess",
        title: "SchoolAssess",
        organization: "schoolassess.vercel.app",
        logo: "/images/henry-ai-logo.png",
        description: "Helping schools estimate asset values for insurance claims.",
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
        id: "voice-journal",
        title: "Voice Journal",
        organization: "Henry AI Club",
        logo: "/images/henry-ai-logo.png",
        description: "AI-powered mood tracking via voice recordings with trend analysis and shareable graphics. B2B2C model.",
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

const research: ExperienceItem[] = [
  {
    id: "problem-decomposition",
    title: "Teaching Problem Decomposition with Input-Output Pair Specification",
    organization: "CS Education Research",
    logo: "/images/ucsd-logo.png",
    role: "Research Proposal",
    description: "Research on teaching problem decomposition skills in LLM-assisted computer science education. Focusing on how manipulating input-output pairs in problems can enhance pedagogical outcomes and develop requirement fluency - the ability to competently articulate and refine requirements using computational thinking. Adapting programming plans to skills required for AI-assisted programmers through exercises targeting identification, refinement, and testing of input-output pairs.",
    dates: "2025",
  },
  {
    id: "gsdsef-2026",
    title: "GSDSEF 2026",
    organization: "Greater San Diego Science & Engineering Fair",
    logo: "/images/isef-logo.png",
    role: "Presenter",
    description: "Presenting research at the Greater San Diego Science & Engineering Fair with goal of advancing to present at the International Science and Engineering Fair (ISEF) in Phoenix, Arizona.",
    dates: "2026",
  },
  {
    id: "iticse-2026",
    title: "ITiCSE 2026",
    organization: "ACM ITiCSE",
    logo: "/images/iticse-logo.png",
    role: "Submitting",
    description: "Submitting research to Innovation and Technology in Computer Science Education conference in Madrid, Spain.",
    dates: "July 13-15, 2026",
  },
  {
    id: "respect-2026",
    title: "RESPECT 2026",
    organization: "ACM SIGCSE",
    logo: "/images/SIGCSE-logo_home.jpg",
    role: "Submitting",
    description: "Submitting research to Research on Equity and Sustained Participation in Engineering, Computing, and Technology conference in Chicago.",
    dates: "June 8-11, 2026",
  },
]

const speeches: ExperienceItem[] = [
  {
    id: "speeches-placeholder",
    title: "Speeches",
    organization: "Public Speaking",
    logo: "/images/patrick-henry-shield.png",
    description: "Public speaking engagements and presentations",
    dates: "2025-2026",
    isProjectCategory: true,
    nested: [
      {
        id: "khan-lab-summit",
        title: "Khan Lab School AI and Education Summit",
        organization: "Khan Academy",
        logo: "/images/khan-academy-logo.png",
        role: "Presenter",
        description: "Presented on integrating critical thinking, problem decomposition and high-level reasoning into computer science education. Spoke alongside students, researchers, educators and entrepreneurs about AI-supported education in computer science.",
        dates: "November 2025",
      },
    ],
  },
]

const categories = {
  "locked in": workExperience,
  projects: projects,
  "learning": education,
  research: research,
  speeches: speeches,
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
              fifteen. high school sophomore. research @ ucsd. patrick henry high school '28. mentored + funded cs ed research. presenting @ gsdsef.
            </p>

            {/* About Section - moved inside header */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">about</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                super curious about how computers + ai are improving our lives. love thinking about innovative ideas,
                collaborating with researchers, teaching others, using generative ai, and talking about startups. i
                focus on how interactive ai tools will transform what and how we should teach and address mental health.
              </p>
              <a
                href="/cv-11-25.pdf"
                download
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText className="h-4 w-4" />
                Download CV
              </a>
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
