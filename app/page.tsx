"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, ChevronRight, Github } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExperienceCard } from "@/components/ExperienceCard"
import { FloatingSocialBar } from "@/components/FloatingSocialBar"
import { BlogCard } from "@/components/BlogCard"
import { MathProofs } from "@/components/MathProofs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { projects } from "@/content/data/projects"
import { education } from "@/content/data/education"
import { research } from "@/content/data/research"
import { blogPosts } from "@/content/data/blog"
import { mathProofs } from "@/content/data/math"
import { talks } from "@/content/data/talks"
import { ExperienceItem } from "@/content/data/types"

const ProjectGraph = dynamic(() => import("@/components/ProjectGraph").then((mod) => mod.ProjectGraph), {
  ssr: false,
})

const categories = {
  research: research,
  projects: projects,
  "learning": education,
  talks: talks,
  proofs: mathProofs,
  blog: blogPosts,
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<keyof typeof categories>("research")
  const [isMobile, setIsMobile] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(true)
  const [selectedProject, setSelectedProject] = useState<ExperienceItem | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    setIsAboutOpen(!isMobile)
  }, [isMobile])

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">hey, i'm hudson</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              fifteen. research+dual-enrollment @ ucsd. patrick henry high school '28. mentored + funded cs ed research. presenting @ gsdsef.
            </p>

            {/* About Section */}
            <div>
              <div
                className="cursor-pointer flex items-center justify-between mb-4"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                <h2 className="text-2xl font-semibold text-foreground">about</h2>
                {isMobile && (
                  <div className="transition-transform duration-200">
                    {isAboutOpen ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {isAboutOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
              <p className="text-muted-foreground leading-relaxed mb-4">
                      researching how can cognitive models and expert constraints improve pedagogical llm use for computing education. i think about how tech can be used to teach problem solving and decomposition, pattern recognition, and high-level reasoning in secondary and post-secondary education. i also like math, physics, hci, and cs.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="/cv/cv-current.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        View CV
                      </a>
                      <a
                        href="/cv/cv-current.pdf"
                download
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <FileText className="h-4 w-4" />
                Download CV
              </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
          {activeTab === "projects" && (
            <div className="mb-8 h-[500px] w-full rounded-lg overflow-hidden bg-background">
              <ProjectGraph
                projects={projects}
                onProjectClick={(project: ExperienceItem) => {
                  setSelectedProject(project)
                }}
              />
            </div>
          )}
          {activeTab === "proofs" && <MathProofs proofs={mathProofs} />}
          {activeTab === "blog" && (
            blogPosts.length > 0 ? (
              blogPosts.map((post) => <BlogCard key={post.id} post={post} />)
            ) : (
              <div className="py-12 text-center">
                <p className="text-4xl">👀</p>
              </div>
            )
          )}
          {activeTab !== "projects" && activeTab !== "blog" && activeTab !== "proofs" && (
            categories[activeTab].length > 0 ? (
              categories[activeTab].map((item) => <ExperienceCard key={item.id} item={item} />)
            ) : (
              <div className="py-12">
                <p className="text-muted-foreground">Content for {activeTab} coming soon...</p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">made with ❤️ by hudson + ai</div>
      </div>

      <FloatingSocialBar />

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedProject?.organization} • {selectedProject?.dates}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedProject?.description}
            </p>
            {(selectedProject as any)?.githubUrl && (
              <a
                href={(selectedProject as any).githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
