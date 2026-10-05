import { test, expect } from '@playwright/test'

// Internal links must resolve. On the preview origin every on-page link
// resolves against that origin, so we compare against the baseURL, not the
// production domain.
test('internal links resolve (no broken pages)', async ({ page, request, baseURL }) => {
  await page.goto('/', { waitUntil: 'load' })

  const origin = new URL(baseURL as string).origin
  const hrefs = await page.locator('a[href]').evaluateAll((els) =>
    Array.from(new Set(els.map((e) => (e as HTMLAnchorElement).href))).filter((h) =>
      h.startsWith(window.location.origin),
    ),
  )
  expect(hrefs.length, 'no internal links found').toBeGreaterThan(0)

  const broken: string[] = []
  for (const href of hrefs) {
    const path = href.replace(origin, '') || '/'
    const res = await request.get(path)
    if (res.status() >= 400) broken.push(`${res.status()} ${href}`)
  }
  expect(broken, broken.join('\n')).toEqual([])
})

test('legal pages and crawler files resolve', async ({ request }) => {
  for (const path of ['/impressum.html', '/datenschutz.html', '/robots.txt', '/sitemap.xml']) {
    const res = await request.get(path)
    expect(res.status(), path).toBe(200)
  }
})
