# fatlind-azemi.de

Personal portfolio of Fatlind Azemi, Software & Data Engineer — a one-page site,
German at `/` and English at `/en/`. Static and prerendered: no backend, no
runtime data source.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** for styling, **Framer Motion** for the entrance and
  scroll-driven animations
- **Playwright** (Chromium + WebKit, desktop + mobile) and **axe-core** for the
  test suite

## Build

`bun run build` runs three steps:

1. `tsc -b` — type-check
2. `vite build` — the client bundle
3. `vite build --ssr src/entry-server.tsx` and `node scripts/prerender.mjs` —
   render each route to static HTML (`dist/index.html`, `dist/en/index.html`)

Step 3 is what makes the page indexable: crawlers and social previews get the
real markup, and the same page still hydrates into the animated version for
browsers.

## Layout

```
src/components/   sections — hero, expertise, projects, footer
src/i18n/         UI strings per language (ui.de.ts, ui.en.ts)
src/data/         content per language (portfolio.de.ts, portfolio.en.ts)
scripts/          prerender entry + static file server
tests/            Playwright suite
```

## Development

```bash
bun install
bun run dev            # dev server
bun run build          # type-check + client build + prerender
bun run preview        # serve the built output
bun run test:e2e       # Playwright suite (npx playwright install first)
```

Set `QA_BASE_URL` to run the suite against an already deployed URL instead of a
local server:

```bash
QA_BASE_URL=https://fatlind-azemi.de bun run test:e2e
```

## Tests

The suite covers smoke (no runtime or HTTP errors), prerendering and the no-JS
path, hydration, SEO metadata, axe accessibility, responsive layout (overflow and
24px tap targets), links, the pinned horizontal projects section, and
screenshots in `test-results/`.

Deliberate, documented exceptions — for example inline text links that fall under
the WCAG 2.5.8 inline exception — live in `tests/accepted.ts`. Anything not
listed there has to pass.

## Deploy

GitHub Actions runs the suite on every pull request and deploys on merge to
`main`, using the artifact the test job built. The merge is the approval step.

---

© Fatlind Azemi. The code is published for reference; no license is granted.
