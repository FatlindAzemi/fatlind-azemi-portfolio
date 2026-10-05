import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'
import { ACCEPTED_SMALL_TARGETS } from './accepted'

for (const p of PAGES) {
  test.describe(`layout ${p.path}`, () => {
    test('page does not scroll horizontally', async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'load' })
      const m = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }))
      expect(m.sw, `scrollWidth ${m.sw} exceeds clientWidth ${m.cw}`).toBeLessThanOrEqual(m.cw + 1)
    })

    test('interactive controls meet the 24px target size (WCAG 2.5.8)', async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'load' })

      const accepted = ACCEPTED_SMALL_TARGETS.map((a) => a.name)
      const tooSmall = await page.evaluate((acceptedNames: string[]) => {
        const out: string[] = []
        const els = Array.from(
          document.querySelectorAll('a[href], button, [role="button"]'),
        ) as HTMLElement[]

        for (const el of els) {
          const cs = getComputedStyle(el)
          if (cs.display === 'none' || cs.visibility === 'hidden') continue

          const r = el.getBoundingClientRect()
          // Visually hidden (sr-only) controls are revealed larger on focus.
          if (r.width <= 1 || r.height <= 1) continue

          // Inline text links, and links inside running text / list items, are
          // exempt (WCAG 2.5.8 "inline").
          if (cs.display === 'inline') continue
          if (el.closest('p, li, address, small')) continue

          const label = (el.textContent ?? '').trim() || el.getAttribute('aria-label') || ''
          if (acceptedNames.some((n) => label === n || label.startsWith(n))) continue

          if (r.height < 24 || r.width < 24) {
            out.push(
              `${el.tagName.toLowerCase()} "${label.slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`,
            )
          }
        }
        return out
      }, accepted)

      expect(tooSmall, tooSmall.join('\n')).toEqual([])
    })
  })
}
