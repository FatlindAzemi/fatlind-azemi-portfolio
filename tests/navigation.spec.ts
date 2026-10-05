import { test, expect, type Page } from '@playwright/test'

// B9: the section nav must be real links (href="#…"), not buttons that call
// scrollIntoView. That gives working deep links, correct semantics for screen
// readers, and a nav that still works without JavaScript.

/**
 * Wait until React has hydrated and the layout has settled. The projects
 * section switches between a stacked (mobile) and a pinned (desktop) layout
 * right after hydration, which moves every section below it — an anchor jump
 * issued in that window lands at a stale offset.
 */
async function settle(page: Page) {
  await page.locator('h1').first().waitFor()
  await page.waitForTimeout(1200)
}

test.describe('section navigation', () => {
  test('nav items are real anchors to the section ids', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    const hrefs = await page
      .locator('nav[aria-label] a')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    expect(hrefs).toEqual(['#expertise', '#projects', '#contact'])

    // and no button-only navigation remains
    expect(await page.locator('nav[aria-label] button').count()).toBe(0)
  })

  test('clicking a nav link updates the URL hash and reaches the section', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'the section nav is desktop-only by design')

    await page.goto('/', { waitUntil: 'load' })
    await settle(page)

    await page.locator('nav[aria-label] a[href="#projects"]').first().click()
    await expect.poll(() => new URL(page.url()).hash).toBe('#projects')
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('a deep link lands on the section', async ({ page }) => {
    await page.goto('/#expertise', { waitUntil: 'load' })
    await settle(page)
    await expect(page.locator('#expertise')).toBeInViewport()
  })

  test('the logo links back to the top', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' })
    await expect(page.locator('header a[href="#hero"]')).toHaveCount(1)
  })
})

test.describe('section navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the anchors are present and usable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const hrefs = await page
      .locator('nav[aria-label] a')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    expect(hrefs).toEqual(['#expertise', '#projects', '#contact'])
  })
})
