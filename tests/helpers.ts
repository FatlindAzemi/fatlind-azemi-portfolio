import type { Page } from '@playwright/test'

export const SITE = 'https://fatlind-azemi.de'

export interface SitePage {
  /** URL path on the preview origin. */
  path: string
  lang: 'de' | 'en'
  title: RegExp
  /** Phrase that must be present in the page copy (in both locales). */
  text: RegExp
  canonical: string
}

export const PAGES: SitePage[] = [
  {
    path: '/',
    lang: 'de',
    title: /Fatlind Azemi.*Software.*Data-Engineer/,
    text: /Data Engineering/,
    canonical: `${SITE}/`,
  },
  {
    path: '/en/',
    lang: 'en',
    title: /Fatlind Azemi.*Software.*Data Engineer/,
    text: /Data Engineering/,
    canonical: `${SITE}/en/`,
  },
]

/** Collect console errors, page errors and failed requests for a page. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  page.on('requestfailed', (req) =>
    errors.push(`requestfailed: ${req.url()} — ${req.failure()?.errorText ?? 'unknown'}`),
  )
  return errors
}
