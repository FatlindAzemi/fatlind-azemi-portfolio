import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'

// Crawlability / no-JS: the build prerenders real markup. With JavaScript
// disabled the page must still show its content — and nothing may be left
// invisible by an entrance animation (the <noscript> override handles that).
test.use({ javaScriptEnabled: false })

for (const p of PAGES) {
  test.describe(`prerender ${p.path}`, () => {
    test('content is present and visible without JavaScript', async ({ page }) => {
      const res = await page.goto(p.path, { waitUntil: 'domcontentloaded' })
      expect(res?.status()).toBe(200)

      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()
      await expect(h1).toContainText('Fatlind')

      // Real body copy, not just the shell.
      await expect(page.getByText(p.text).first()).toBeVisible()

      // Nothing still stuck at opacity:0.
      const hiddenCount = await page.evaluate(() => {
        const nodes = Array.from(document.querySelectorAll('#root [style*="opacity:0"]'))
        return nodes.filter((el) => getComputedStyle(el as Element).opacity === '0').length
      })
      expect(hiddenCount, 'elements still invisible without JS').toBe(0)
    })
  })
}
