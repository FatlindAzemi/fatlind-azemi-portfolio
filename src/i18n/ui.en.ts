import type { UiStrings } from './types'

export const uiEn: UiStrings = {
  meta: {
    title: 'Fatlind Azemi — Software & Data Engineer',
    description:
      'Portfolio of Fatlind Azemi, Software & Data Engineer specializing in enterprise data infrastructure and modern application development.',
  },
  nav: {
    expertise: 'Expertise',
    projects: 'Projects',
    contact: 'Contact',
    getInTouch: 'Get in touch',
    backToTop: 'Back to top',
    sections: 'Section navigation',
    language: 'Language',
  },
  mail: {
    subject: 'Contact via fatlind-azemi.de',
    body: "Hi Fatlind,\n\nI came across your portfolio and would love to talk.\n\n",
  },
  hero: {
    getInTouch: 'Get in touch',
    viewProjects: 'View projects',
    scroll: 'Scroll',
    scrollToExpertise: 'Scroll to expertise',
  },
  expertise: {
    eyebrow: 'Capabilities',
    title: 'The stack I build with',
    description:
      'Two disciplines that usually sit in separate teams. I work across both — the pipelines that make data trustworthy, and the products that make it useful.',
    certified: 'Certified',
  },
  projects: {
    eyebrow: 'Selected work',
    title: 'Projects',
    description:
      'Data engineering is the bulk of what I do — ingestion, lakehouse layers, governance, and the reporting on top. Four of the builds below are data platforms; the last one is a product I took from zero to production.',
    dataEngineering: 'Data Engineering',
    productDevelopment: 'Product Development',
  },
  footer: {
    eyebrow: 'Contact',
    heading: "Let's build something worth shipping.",
    lead: 'Open to conversations about data platforms, product engineering, or anything that sits between the two.',
    imprint: 'Imprint',
    privacy: 'Privacy',
    builtWith: 'Built with React, Vite & Tailwind CSS',
    backToTop: 'Back to top ↑',
  },
  viz: {
    actual: 'ACTUAL',
    forecast: 'FORECAST',
    burstDetected: 'BURST DETECTED',
    migrated: 'MIGRATED',
    running: 'RUNNING',
    queued: 'QUEUED',
    months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
    layers: [
      'BI & REPORTING',
      'SEMANTIC LAYER',
      'LAKEHOUSE · DELTA',
      'INGESTION & ORCHESTRATION',
      'SOURCES',
    ],
    aria: {
      forecast:
        'Forecast chart: actual demand with a widening confidence interval',
      trends: 'Topic streams over time with a detected burst',
      billing: 'Monthly invoices stacked by payment status',
      migration: 'Migration grid: objects migrated, running, and queued',
      platform:
        'Platform layers built from sources up to the BI reporting layer',
    },
  },
}
