import { test, expect } from '@playwright/test'
import { PAGES, collectErrors } from './helpers'

for (const p of PAGES) {
  test.describe(`smoke ${p.path}`, () => {
    test('renders with no runtime or HTTP errors', async ({ page }) => {
      const errors = collectErrors(page)
      const badResponses: string[] = []
      page.on('response', (res) => {
        if (res.status() >= 400) badResponses.push(`${res.status()} ${res.url()}`)
      })

      const res = await page.goto(p.path, { waitUntil: 'load' })
      expect(res?.status()).toBe(200)

      await expect(page.locator('html')).toHaveAttribute('lang', p.lang)
      await expect(page).toHaveTitle(p.title)

      // Landmarks / sections that must exist.
      for (const sel of ['main#main', '#hero', '#expertise', '#projects', '#contact']) {
        await expect(page.locator(sel).first(), `${sel} missing`).toBeAttached()
      }

      await expect(page.locator('h1').first()).toBeVisible()
      await expect(page.locator('h1').first()).not.toBeEmpty()

      expect(badResponses, badResponses.join('\n')).toEqual([])
      expect(errors, errors.join('\n')).toEqual([])
    })
  })
}
