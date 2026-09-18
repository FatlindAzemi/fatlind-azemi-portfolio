export type Locale = 'en' | 'de'

export type DataVizKind =
  | 'forecast'
  | 'trends'
  | 'billing'
  | 'migration'
  | 'platform'

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  techStack: string[]
  metrics: string[]
  category: 'data' | 'product'
  vizKind: DataVizKind
  vizCaption: string
}

export interface Skill {
  name: string
  category: string
  terminalCommand?: string
  terminalOutput?: string[]
}

export interface ExpertiseCategory {
  title: string
  subtitle: string
  skills: Skill[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: 'linkedin' | 'mail' | 'github'
}

export interface Certification {
  issuer: string
  name: string
  image: string
}

export interface PortfolioData {
  name: string
  title: string
  portrait: string
  subtitle: string
  bio: string[]
  email: string
  expertise: [ExpertiseCategory, ExpertiseCategory]
  certifications: Certification[]
  projects: Project[]
  socialLinks: SocialLink[]
}
