import { test, expect } from '@playwright/test'
import { SITE } from './helpers'

// SEO essentials per locale. Values must match the prerender step
// (scripts/prerender.mjs) and public/sitemap.xml.
const CASES = [
  { path: '/', lang: 'de', canonical: `${SITE}/`, ogLocale: 'de_DE', alternate: 'en_US' },
  { path: '/en/', lang: 'en', canonical: `${SITE}/en/`, ogLocale: 'en_US', alternate: 'de_DE' },
]

for (const c of CASES) {
  test.describe(`seo ${c.path}`, () => {
    test('head carries the right metadata', async ({ page }) => {
      await page.goto(c.path)

      await expect(page.locator('html')).toHaveAttribute('lang', c.lang)

      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description ?? '', 'meta description too short').toBeTruthy()
      expect((description ?? '').length).toBeGreaterThan(50)

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', c.canonical)

      const alternates = await page
        .locator('link[rel="alternate"][hreflang]')
        .evaluateAll((els) =>
          els.map((el) => [el.getAttribute('hreflang'), el.getAttribute('href')]),
        )
      expect(alternates).toEqual(
        expect.arrayContaining([
          ['de', `${SITE}/`],
          ['en', `${SITE}/en/`],
          ['x-default', `${SITE}/`],
        ]),
      )

      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Fatlind Azemi/)
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.jpg/)
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', c.ogLocale)
      await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute('content', c.alternate)

      const robots = await page.locator('meta[name="robots"]').getAttribute('content')
      expect(robots ?? '').toContain('index')

      // Structured data parses and describes the person.
      const ldRaw = await page.locator('script[type="application/ld+json"]').first().textContent()
      expect(ldRaw).toBeTruthy()
      const ld = JSON.parse(ldRaw as string)
      expect(ld['@type']).toBe('Person')
      expect(String(ld.name)).toContain('Fatlind')
      expect(Array.isArray(ld.sameAs)).toBe(true)
    })
  })
}
