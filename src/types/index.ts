export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  techStack: string[]
  metrics: string[]
  category: 'data' | 'product'
  dataVizType: 'line-chart' | 'node-graph' | 'bar-chart'
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
  label: string
  icon: string
}

export interface PortfolioData {
  name: string
  title: string
  subtitle: string
  bio: string[]
  email: string
  expertise: [ExpertiseCategory, ExpertiseCategory]
  projects: Project[]
  socialLinks: SocialLink[]
}

export interface NeuralNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
}

export interface MousePosition {
  x: number
  y: number
}
