import { test, expect } from '@playwright/test'
import { collectErrors } from './helpers'

// React surfaces hydration mismatches as console errors (#418/#423/#425 etc.).
const HYDRATION = /hydrat|minified react error #(418|419|422|423|425)/i

test.describe('hydration', () => {
  test('no hydration mismatch and the client takes over', async ({ page }) => {
    const errors = collectErrors(page)
    await page.goto('/', { waitUntil: 'load' })

    const hydrationErrors = errors.filter((e) => HYDRATION.test(e))
    expect(hydrationErrors, hydrationErrors.join('\n')).toEqual([])

    // Proof that JS ran and React hydrated: the cipher animation resolves the
    // name to the real, static text.
    await expect(page.locator('h1').first()).toContainText('Fatlind', { timeout: 15_000 })
  })

  test('language switch navigates to the other locale and back', async ({ page }) => {
    await page.goto('/')

    await page.locator('a[hreflang="en"]').first().click()
    await page.waitForURL((u) => new URL(u).pathname.startsWith('/en'))
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle(/Data Engineer/)

    await page.locator('a[hreflang="de"]').first().click()
    await page.waitForURL((u) => new URL(u).pathname === '/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  })
})
