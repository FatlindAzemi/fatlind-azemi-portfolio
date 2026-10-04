import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'

// Capture full-page screenshots for every viewport so a change can be eyeballed
// on desktop AND mobile. Written to test-results/screens/<project>__<page>.png
for (const p of PAGES) {
  test(`screenshots ${p.path}`, async ({ page }, testInfo) => {
    await page.goto(p.path, { waitUntil: 'load' })
    await expect(page.locator('h1').first()).toContainText('Fatlind')
    await page.waitForTimeout(600) // let the top-of-page entrance settle

    const name = `${testInfo.project.name}__${p.path.replace(/\//g, '_') || 'root'}`
    await page.screenshot({ path: `test-results/screens/${name}.png`, fullPage: true })
    await page.screenshot({ path: `test-results/screens/${name}__viewport.png` })
  })
}
