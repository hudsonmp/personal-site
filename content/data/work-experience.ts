import { ExperienceItem } from "./types"

export const workExperience: ExperienceItem[] = [
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

