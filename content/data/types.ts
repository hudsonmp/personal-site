export interface ExperienceItem {
  id: string
  title: string
  organization: string
  logo: string
  role?: string
  description: string
  dates: string
  nested?: ExperienceItem[]
  isProjectCategory?: boolean
  githubUrl?: string
}

export interface SocialLink {
  icon: string
  href: string
  label: string
}

