import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { PAGES } from './helpers'
import { ACCEPTED_VIOLATIONS } from './accepted'

// Accessibility gate. Fail on serious/critical axe violations; report the rest.
//
// The page animates its sections in (opacity 0 -> 1). axe measures contrast
// including opacity, so analysing mid-animation reports phantom contrast
// failures. Emulating reduced motion renders the final state immediately and
// makes the audit deterministic.
for (const p of PAGES) {
  test.describe(`a11y ${p.path}`, () => {
    test('has no serious or critical violations', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(p.path, { waitUntil: 'load' })
      await expect(page.locator('h1').first()).toBeVisible()

      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze()

      const accepted = (v: (typeof violations)[number]) =>
        ACCEPTED_VIOLATIONS.some(
          (a) =>
            a.id === v.id &&
            v.nodes.length > 0 &&
            v.nodes.every((n) => a.target.test(n.target.map(String).join(' '))),
        )

      const blocking = violations.filter(
        (v) => (v.impact === 'serious' || v.impact === 'critical') && !accepted(v),
      )

      const summary = blocking.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
      }))

      expect(blocking, JSON.stringify(summary, null, 2)).toEqual([])
    })
  })
}
