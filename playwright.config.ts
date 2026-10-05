import { defineConfig, devices } from '@playwright/test'

// The suite runs inside the official Playwright image (see ~/work/bin/qa.sh).
// A dependency-free static server (scripts/static-server.mjs) serves the build
// from inside that container, so no host networking is involved.
//
// QA_BASE_URL points the same suite at an already-running deployment (staging or
// production) instead of the local build — used to verify a deploy end-to-end.
const PORT = Number(process.env.QA_PORT ?? 4180)
const EXTERNAL_BASE_URL = process.env.QA_BASE_URL
const BASE_URL = EXTERNAL_BASE_URL ?? `http://127.0.0.1:${PORT}`

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  timeout: 45_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/html', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: EXTERNAL_BASE_URL
    ? undefined
    : {
        command: `node scripts/static-server.mjs dist ${PORT}`,
        url: BASE_URL,
        reuseExistingServer: true,
        timeout: 60_000,
        stdout: 'ignore',
        stderr: 'pipe',
      },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'desktop-webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
  ],
})
