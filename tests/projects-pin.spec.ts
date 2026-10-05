import { test, expect, type Page } from '@playwright/test'

// Regression guard for the pinned projects section.
//
// The horizontal track must be driven by the pin container's own position. It
// used to be driven by framer's useScroll with a `target` ref that did not exist
// on the first render (pinned markup renders only after hydration), so the hook
// measured the whole document: at the moment the section pinned, the track was
// already scrolled by ~35% of its travel and the first card was off screen.

interface Geo {
  pinTopAbs: number
  travel: number
  vw: number
  n: number
}

async function geometry(page: Page): Promise<Geo | null> {
  return page.evaluate(() => {
    const section = document.getElementById('projects')
    const sticky = section?.querySelector('.sticky') as HTMLElement | null
    if (!section || !sticky) return null
    const pin = sticky.parentElement as HTMLElement
    const track = sticky.querySelector('.edge-fade > div') as HTMLElement
    return {
      pinTopAbs: Math.round(window.scrollY + pin.getBoundingClientRect().top),
      travel: pin.offsetHeight - window.innerHeight,
      vw: document.documentElement.clientWidth,
      n: track.querySelectorAll('article').length,
    }
  })
}

async function scrollTo(page: Page, y: number) {
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: 'instant' as ScrollBehavior }),
    y,
  )
  await page.waitForTimeout(250)
}

test.describe('pinned projects section', () => {
  test.skip(({ isMobile }) => isMobile, 'the pinned layout is desktop-only by design')

  test('the first card is fully visible the moment the section pins', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('h1').first().waitFor()
    await page.waitForTimeout(1500)
    // the site scrolls smoothly; measuring needs instant positioning
    await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })

    const geo = await geometry(page)
    test.skip(!geo, 'stacked layout (small viewport or reduced motion)')

    await scrollTo(page, geo!.pinTopAbs)

    const first = await page.locator('#projects article').first().boundingBox()
    expect(first).not.toBeNull()
    // card 1 starts at the left gutter — it must not be scrolled off screen
    expect(first!.x).toBeGreaterThanOrEqual(0)
    expect(first!.x).toBeLessThan(geo!.vw * 0.25)
  })

  test('the track ends on the last card and moves monotonically', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    await page.locator('h1').first().waitFor()
    await page.waitForTimeout(1500)
    await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })

    const geo = await geometry(page)
    test.skip(!geo, 'stacked layout (small viewport or reduced motion)')

    const g = geo!
    const samples: { f: number; x: number }[] = []
    for (const f of [0, 0.25, 0.5, 0.75, 1]) {
      await scrollTo(page, g.pinTopAbs + Math.round(g.travel * f))
      const box = await page.locator('#projects article').first().boundingBox()
      samples.push({ f, x: box!.x })
    }

    // monotonic leftward movement, no jump at the start
    for (let i = 1; i < samples.length; i++) {
      expect(samples[i].x).toBeLessThan(samples[i - 1].x)
    }
    expect(samples[0].x).toBeGreaterThan(0)
    // by the end the first card has travelled the full distance
    expect(Math.abs(samples[4].x - (samples[0].x - g.travel))).toBeLessThan(4)

    const last = await page.locator('#projects article').last().boundingBox()
    expect(last!.x + last!.width).toBeLessThanOrEqual(g.vw + 2)
    expect(last!.x + last!.width).toBeGreaterThan(g.vw * 0.7)
  })
})
