# Portfolio — Premium Kinetic (Awwwards-Level)

## TL;DR

> **Quick Summary**: Build an Awwwards-level personal portfolio for Fatlind Azemi (Software & Data Engineer). Base aesthetic is "Industrial Minimalism" (dark, bento-grid, 1px borders), but supercharged with premium kinetic motion: cipher-text decode, Canvas 2D neural mesh, magnetic hover physics, clip-path curtain reveals, horizontal project scroll with pinning, animated data visualizations, and ink-drop ripple CTA.
>
> **Deliverables**:
> - React + Vite + Tailwind CSS single-page portfolio with 4 kinetic sections
> - Hero: Cipher-text decode + Canvas 2D neural mesh background with mouse tracking
> - Expertise: SVG stroke-dasharray border animations + terminal micro-interactions
> - Projects: Pinned horizontal scroll with animated data visualizations
> - Footer: Magnetic CTA button with ink-drop ripple → mailto:
> - Lenis heavy momentum scroll + parallax depth layer
> - Global magnetic hover on all interactive elements
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 5 waves, ~21 tasks
> **Critical Path**: Task 1 → Tasks 6-10 → Tasks 11-14 → Tasks 15-17 → Task 18 → F1-F4

---

## Context

### Original Request (V1 — Superseded)
Initial concept was a clean, understated "Industrial Minimalism" portfolio with subtle fade-in animations and a spotlight hover effect. Next.js SSG, 5 static sections.

### Revised Request (V2 — Current)
User pivoted to an Awwwards-level premium kinetic concept. Same visual identity (dark mode, bento-grid, 1px borders, Inter + Geist Mono), but with dramatic motion design throughout:
- **Lenis**: Heavy, deliberate momentum scrolling
- **Magnetic interactions**: All buttons/cards pull toward cursor with spring physics
- **Curtain reveals**: Sections enter via clip-path animations, not fades
- **Parallax depth**: Background elements move at different scroll speeds
- **Hero "Boot Sequence"**: Cipher/scramble text decode + reactive neural mesh
- **Expertise "Interactive Pipeline"**: SVG border draws + terminal hover micro-interactions
- **Projects "Horizontal Momentum"**: Pinned vertical section → horizontal scroll + data viz animations
- **Footer "Shutter CTA"**: Scale-up CTA + magnetic button + ink-drop ripple → mailto

### Interview Summary
**Key Discussions (V2)**:
- **Framework**: Vite + React (auto-resolved — better for complex Framer Motion + Canvas than Next.js)
- **Neural mesh**: Canvas 2D API (chosen over Three.js for lighter bundle)
- **Horizontal scroll**: Framer Motion `useScroll` mapped to `translateX` (chosen over native CSS horizontal scroll)
- **Contact**: `mailto:` link triggered after ink-drop ripple animation
- **Fonts**: Inter (sans-serif) + Geist Mono (monospace) — self-hosted or Google Fonts
- **No tests**: Agent-Executed QA via Playwright only
- **Deployment**: User handles independently

**Auto-Resolved Decisions**:
- **Cipher text duration**: ~3 seconds scramble → resolve
- **Terminal content**: Generic 3-line commands per skill (e.g., `> spark-submit --master yarn`, `> Loading model...`, `> Accuracy: 0.94`)
- **Data visualizations**: Custom SVG line charts / node graphs, no charting library
- **Navigation**: Minimal dot navigation or sticky top bar (TBD during implementation)

### Metis Review (from V1 — partially applicable)
Key guardrails carried forward:
- Dark mode only, no theme toggle
- All CSS colors as custom properties
- `prefers-reduced-motion` must disable ALL animations
- Print stylesheet for recruiter printing
- Zero server dependencies (pure static SPA)
- No extra npm deps beyond essentials
- Content hardcoded, no CMS

**V1 guardrails SUPERSEDED by V2**:
- ~~No stagger animations~~ → Staggered grid reveals are intentional
- ~~No typewriter effects~~ → Cipher decode is intentional
- ~~No mouse-follow effects~~ → Neural mesh + magnetic hover are intentional
- ~~No canvas/WebGL~~ → Canvas 2D neural mesh is intentional
- ~~Subtle only~~ → Premium kinetic is the whole point

---

## Work Objectives

### Core Objective
Build a premium kinetic single-page portfolio that feels like a "high-performance machine" — combining Industrial Minimalism visual identity with Awwwards-level motion design across 4 interactive sections.

### Concrete Deliverables
- `src/App.tsx` — Main app with Lenis provider, section composition
- `src/main.tsx` — React entry point
- `src/index.css` — Tailwind directives + CSS custom properties + print styles
- `src/components/hero/` — Hero section (cipher text + neural mesh)
- `src/components/expertise/` — Expertise section (bento grid + stroke animations + terminal)
- `src/components/projects/` — Projects section (horizontal scroll + data viz)
- `src/components/footer/` — Footer section (magnetic CTA + ink drop)
- `src/components/ui/` — Shared: MagneticWrapper, CurtainReveal, SectionTransition
- `src/hooks/` — useMagnetic, useCipherText, useInkDrop, useParallax, useReducedMotion
- `src/canvas/` — NeuralMesh animation system
- `src/data/` — Content constants
- `src/types/` — TypeScript types
- `public/favicon.ico`, `public/robots.txt`
- `index.html` — Vite entry HTML with SEO meta tags

### Definition of Done
- [ ] `bun run build` completes with zero errors (Vite production build)
- [ ] Hero: cipher text decodes name within ~3s, neural mesh responds to mouse
- [ ] Expertise: SVG borders animate on scroll-into-view, terminal slides up on skill hover
- [ ] Projects: section pins, horizontal scroll works, data viz lines draw
- [ ] Footer: CTA scales on scroll, ripple → mailto on click
- [ ] Magnetic hover works on all buttons and cards
- [ ] `prefers-reduced-motion: reduce` disables ALL motion
- [ ] Lighthouse >= 85 Performance (acceptable for animation-heavy site), >= 95 Accessibility
- [ ] Print stylesheet: white bg, black text, no animations

### Must Have
- Vite + React + TypeScript + Tailwind CSS v4
- All Framer Motion animations respect `prefers-reduced-motion`
- Canvas 2D neural mesh with mouse tracking and spring physics
- Lenis smooth scroll with heavy momentum config
- All CSS colors as `var(--*)` in `index.css`
- `mailto:` contact (no form, no service)
- Inter + Geist Mono fonts
- SEO meta tags, OG tags, Twitter cards in `index.html`
- `robots.txt` and favicon
- Print `@media print` stylesheet

### Must NOT Have (Guardrails — V2)
- **NO theme toggle** — dark mode only
- **NO backend, API routes, or server**
- **NO CMS or content management**
- **NO extra sections** beyond the 4 specified
- **NO Three.js** — Canvas 2D only for neural mesh
- **NO charting library** — custom SVG for data visualizations
- **NO extra npm deps** beyond: react, react-dom, framer-motion, lenis, tailwindcss, vite, typescript
- **NO component library abstraction** — components are page-specific
- **NO i18n / localization**
- **NO analytics unless explicitly requested**
- **NO `@studio-freight/lenis`** (deprecated) — use `lenis` (the maintained fork)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed via Playwright + Bash.

### Test Decision
- **Infrastructure exists**: NO (greenfield)
- **Automated tests**: None (unit/integration)
- **Agent-Executed QA**: ALWAYS — every task verified via Playwright (browser) or Bash (build/CLI)

### QA Policy
- **Playwright** (`playwright` skill): Browser automation — navigate, hover, click, assert DOM/animations, screenshot
- **Bash**: Build verification, file existence, `getComputedStyle` via Playwright console
- Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — project foundation, MAX PARALLEL):
├── Task 1: Vite + React + Tailwind scaffolding [quick]
├── Task 2: CSS design system + tokens [quick]
├── Task 3: TypeScript types [quick]
├── Task 4: Content data constants [quick]
├── Task 5: Lenis scroll setup + provider [quick]

Wave 2 (After Wave 1 — animation primitives, MAX PARALLEL):
├── Task 6: useMagnetic hook (magnetic hover physics) [visual-engineering]
├── Task 7: useCipherText hook (scramble decode) [visual-engineering]
├── Task 8: useInkDrop hook (ripple effect) [visual-engineering]
├── Task 9: NeuralMesh canvas component [visual-engineering]
├── Task 10: SVG animation utilities (stroke-dasharray) [quick]

Wave 3 (After Wave 2 — section components, MAX PARALLEL):
├── Task 11: Hero section (depends: 6, 7, 9) [visual-engineering]
├── Task 12: Expertise section (depends: 6, 10) [visual-engineering]
├── Task 13: MagneticWrapper + CurtainReveal shared components (depends: 6) [visual-engineering]
├── Task 14: Navigation component [quick]

Wave 4 (After Wave 3 — complex interactions):
├── Task 15: Projects horizontal scroll section (depends: 6, 13) [visual-engineering]
├── Task 16: Footer section — magnetic CTA + ink drop (depends: 6, 8, 13) [visual-engineering]
├── Task 17: Parallax background layer (depends: 5) [visual-engineering]

Wave 5 (After Wave 4 — assembly + polish):
├── Task 18: Main App assembly [visual-engineering]
├── Task 19: Responsive adjustments + accessibility pass [quick]
├── Task 20: Performance optimization (bundle size, FCP) [quick]
├── Task 21: SEO meta + favicon + robots.txt [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Real manual QA (Playwright — all sections) [unspecified-high]
├── Task F4: Scope fidelity check [deep]
```

### Dependency Matrix

- **1-5**: — (none) — 6-14, 17, Wave 1
- **6**: 5 — 11, 12, 13, 15, 16, Wave 2
- **7**: — — 11, Wave 2
- **8**: — — 16, Wave 2
- **9**: — — 11, Wave 2
- **10**: — — 12, Wave 2
- **11**: 6, 7, 9 — 18, Wave 3
- **12**: 6, 10 — 18, Wave 3
- **13**: 6 — 15, 16, 18, Wave 3
- **14**: — — 18, Wave 3
- **15**: 6, 13 — 18, Wave 4
- **16**: 6, 8, 13 — 18, Wave 4
- **17**: 5 — 18, Wave 4
- **18**: 11-17 — 19, 20, 21, Wave 5
- **19**: 18 — F1-F4, Wave 5
- **20**: 18 — F1-F4, Wave 5
- **21**: 18 — F1-F4, Wave 5

### Agent Dispatch Summary

- **Wave 1**: 5 tasks — T1-T5 → `quick`
- **Wave 2**: 5 tasks — T6-T9 → `visual-engineering`, T10 → `quick`
- **Wave 3**: 4 tasks — T11-T13 → `visual-engineering`, T14 → `quick`
- **Wave 4**: 3 tasks — T15-T17 → `visual-engineering`
- **Wave 5**: 4 tasks — T18 → `visual-engineering`, T19-T21 → `quick`
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. Vite + React + Tailwind scaffolding

  **What to do**:
  - Run `bun create vite . --template react-ts` to scaffold Vite + React + TypeScript
  - Install dependencies: `bun add react react-dom framer-motion lenis`
  - Install dev dependencies: `bun add -D tailwindcss @tailwindcss/vite`
  - Configure Tailwind CSS v4 via Vite plugin in `vite.config.ts`
  - Add `@import "tailwindcss"` to `src/index.css`
  - Verify `package.json` has scripts: `dev`, `build`, `preview`
  - Remove Vite boilerplate (default counter, App.css, assets)
  - Clean `src/App.tsx` to bare minimum: `export default function App() { return null; }`
  - Run `bun run build` — must succeed with zero errors
  - Verify `/dist` directory is created with static output

  **Must NOT do**:
  - Do NOT install `@studio-freight/lenis` (deprecated) — use `lenis` package
  - Do NOT install any icon library, className utility, or charting library
  - Do NOT install `react-router` or any routing library (single page)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard Vite scaffolding, known configuration
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `rayden-code`: Not applicable (not using Rayden UI)
    - `hono`: Not applicable (no backend)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: All subsequent tasks (foundation)
  - **Blocked By**: None

  **References**:
  - **External References**:
    - Vite scaffold docs: `https://vite.dev/guide/#scaffolding-your-first-vite-project` — CLI commands and template options
    - Tailwind CSS v4 Vite plugin: `https://tailwindcss.com/docs/installation/using-vite` — Plugin config and `@import` syntax
    - Lenis package: `https://www.npmjs.com/package/lenis` — Correct package name (not `@studio-freight/lenis`)

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Project builds successfully after scaffolding
    Tool: Bash
    Preconditions: Clean workspace
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Assert: stdout/stderr contains no errors
    Expected Result: Build completes with zero errors
    Evidence: .sisyphus/evidence/task-1-build.txt

  Scenario: Dev server starts and serves page
    Tool: Bash
    Preconditions: Build succeeded
    Steps:
      1. Run: bun run dev (background) & sleep 3
      2. Curl: curl -s http://localhost:5173 | head -20
      3. Assert: HTTP 200, response contains "<!DOCTYPE html>"
    Expected Result: Dev server serves HTML page
    Evidence: .sisyphus/evidence/task-1-devserver.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-1-build.txt`
  - [ ] `.sisyphus/evidence/task-1-devserver.txt`

  **Commit**: YES
  - Message: `chore(scaffold): init Vite + React + Tailwind project`
  - Files: `vite.config.ts`, `package.json`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `index.html`

- [x] 2. CSS design system + tokens

  **What to do**:
  - In `src/index.css`, define ALL CSS custom properties on `:root`:
    - `--bg`: `#111111`
    - `--surface`: `#1A1A1A`
    - `--surface-hover`: `#222222`
    - `--text-primary`: `#EDEDED`
    - `--text-secondary`: `#A0A0A0`
    - `--text-muted`: `#666666`
    - `--accent`: `#0070F3`
    - `--accent-hover`: `#0051CC`
    - `--border`: `rgba(255, 255, 255, 0.08)`
    - `--border-hover`: `rgba(255, 255, 255, 0.15)`
    - `--radius-sm`: `4px`
    - `--radius-md`: `8px`
    - `--max-width`: `1200px`
  - Add CSS reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
  - Body: `background: var(--bg); color: var(--text-primary); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;`
  - Add utility classes using Tailwind `@layer utilities`:
    - `.bento-card`: `bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)]`
    - `.bento-card-hover`: applies `--surface-hover` on hover
  - Ensure NO hex/rgb colors appear in base styles — ONLY `var(--*)` references
  - Tailwind theme extension: map CSS vars to Tailwind theme if needed for intellisense

  **Must NOT do**:
  - Do NOT define light theme — dark mode only
  - Do NOT use Tailwind `@apply` for complex compositions (keep it simple)
  - Do NOT add component-specific styles (sections handle their own)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure CSS declarations
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: All component tasks (visual foundation)
  - **Blocked By**: Task 1 (for file location)

  **References**:
  - **External References**:
    - Tailwind `@layer`: `https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer` — Syntax for adding custom utilities

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: CSS variables are defined on :root
    Tool: Playwright
    Preconditions: dev server running at localhost:5173
    Steps:
      1. Navigate to localhost:5173
      2. Execute: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
      3. Assert: value === '#111111'
      4. Repeat for --accent: assert === '#0070F3'
      5. Repeat for --text-primary: assert === '#EDEDED'
    Expected Result: All key CSS variables defined correctly
    Evidence: .sisyphus/evidence/task-2-css-vars.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-css-vars.png`

  **Commit**: YES
  - Message: `feat(design): add CSS design system tokens`
  - Files: `src/index.css`, `tailwind.config.ts` (if created)

- [x] 3. TypeScript type definitions

  **What to do**:
  - Create `src/types/index.ts`:
    ```typescript
    export interface Project {
      id: string
      title: string
      subtitle: string
      description: string
      techStack: string[]
      metrics: string[]
      category: 'data' | 'product'
      dataVizType: 'line-chart' | 'node-graph' | 'bar-chart'
    }

    export interface Skill {
      name: string
      category: string
      terminalCommand?: string
      terminalOutput?: string[]
    }

    export interface ExpertiseCategory {
      title: string
      subtitle: string
      skills: Skill[]
    }

    export interface SocialLink {
      platform: string
      url: string
      label: string
      icon: string // SVG path or component name
    }

    export interface PortfolioData {
      name: string
      title: string
      subtitle: string
      bio: string[]
      email: string
      expertise: [ExpertiseCategory, ExpertiseCategory]
      projects: Project[]
      socialLinks: SocialLink[]
    }
    ```
  - Add animation-related types in same file:
    ```typescript
    export interface NeuralNode {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      connections: number[]
    }

    export interface MousePosition {
      x: number
      y: number
    }
    ```
  - Verify `tsc --noEmit` passes

  **Must NOT do**:
  - Do NOT add runtime validation (no Zod)
  - Do NOT use `any` type
  - Do NOT import runtime libraries

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 4, 9, 11-16
  - **Blocked By**: Task 1

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: TypeScript compilation passes
    Tool: Bash
    Steps:
      1. Run: npx tsc --noEmit
      2. Assert: exit code 0, stderr is empty
    Expected Result: Zero TypeScript errors
    Evidence: .sisyphus/evidence/task-3-tsc.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-3-tsc.txt`

  **Commit**: YES
  - Message: `feat(types): add TypeScript type definitions`
  - Files: `src/types/index.ts`

- [x] 4. Content data constants

  **What to do**:
  - Create `src/data/portfolio.ts` with typed `portfolioData: PortfolioData` constant:
    - `name`: `"Fatlind Azemi"`
    - `title`: `"Software & Data Engineer"`
    - `subtitle`: `"Building scalable data infrastructure and modern digital products."`
    - `bio`: Array of 2-3 paragraphs about background/approach
    - `email`: `"YOUR_EMAIL_HERE"` (placeholder)
    - `expertise`: 2 categories:
      - Left "Data Engineering & Architecture": Azure, GCP, Databricks, PySpark, Python, SQL, Lakehouse, ETL — each with 3-line terminal commands
      - Right "Product & App Development": React, Flutter, TypeScript, API Design, AI Automation — each with 3-line terminal commands
    - `projects`: 3 projects with dataVizType:
      - A: "Enterprise Forecasting Engine" — dataVizType: 'line-chart'
      - B: "Media Trend Analysis API" — dataVizType: 'node-graph'
      - C: "SaaS Utility Platform" — dataVizType: 'bar-chart'
    - `socialLinks`: GitHub, LinkedIn, Email (placeholder URLs)
  - Mark all user-fillable fields with `// TODO: Replace with actual value` comments

  **Must NOT do**:
  - Do NOT use real personal data — contact info is placeholder
  - Do NOT add more than 3 projects
  - Do NOT create a CMS or data pipeline

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 11, 12, 15, 16
  - **Blocked By**: Task 3

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Data constant satisfies type
    Tool: Bash
    Steps:
      1. Run: npx tsc --noEmit
      2. Assert: exit code 0 (portfolioData matches PortfolioData)
    Expected Result: Type-check passes
    Evidence: .sisyphus/evidence/task-4-tsc.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-4-tsc.txt`

  **Commit**: YES
  - Message: `feat(data): add portfolio content constants`
  - Files: `src/data/portfolio.ts`

- [x] 5. Lenis scroll setup + provider

  **What to do**:
  - Create `src/components/LenisProvider.tsx`:
    - Import `Lenis` from `'lenis'`
    - Create React context for Lenis instance
    - Initialize Lenis with heavy momentum config:
      ```typescript
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      })
      ```
    - Use `useLayoutEffect` to start/stop animation frame loop:
      ```typescript
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
      ```
    - Cleanup on unmount (destroy lenis, cancel animation frame)
    - Wrap children in context provider
    - Export `useLenis()` hook for child components to access instance
  - Check `prefers-reduced-motion` in the provider — if `reduce`, don't initialize Lenis (let native scroll handle it)
  - Wrap `<App />` in `<LenisProvider>` in `src/main.tsx`

  **Must NOT do**:
  - Do NOT import from `@studio-freight/lenis` (deprecated)
  - Do NOT use `useEffect` — must be `useLayoutEffect` for Lenis (timing critical)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Known Lenis API, straightforward React integration
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `tmux`: Not applicable (no TUI)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Tasks 17 (parallax), 18 (assembly)
  - **Blocked By**: Task 1

  **References**:
  - **External References**:
    - Lenis React guide: `https://github.com/darkroomengineering/lenis?tab=readme-ov-file#use-lenis-with-react` — Official React integration pattern with `useLayoutEffect` and `requestAnimationFrame`
    - Lenis instance options: `https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-options` — `duration`, `easing`, `smoothWheel`, `smoothTouch`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Lenis smooth scroll is active
    Tool: Playwright
    Preconditions: dev server running, page has enough content to scroll
    Steps:
      1. Add temporary tall div (height: 300vh) to page
      2. Navigate to localhost:5173
      3. Execute: document.querySelector('[data-lenis-prevent]') existence check (Lenis adds data attributes)
      4. Scroll by 500px via window.scrollBy(0, 500)
      5. Assert: window.scrollY > 0 (scroll happened)
    Expected Result: Page scrolls smoothly via Lenis
    Evidence: .sisyphus/evidence/task-5-scroll.png

  Scenario: prefers-reduced-motion disables Lenis
    Tool: Playwright
    Preconditions: Emulate prefers-reduced-motion: reduce
    Steps:
      1. Launch browser with reduced motion preference
      2. Navigate to localhost:5173
      3. Assert: Lenis instance is not created (or is destroyed)
    Expected Result: Native scroll used instead
    Evidence: .sisyphus/evidence/task-5-reduced-motion.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-5-scroll.png`
  - [ ] `.sisyphus/evidence/task-5-reduced-motion.png`

  **Commit**: YES
  - Message: `feat(scroll): add Lenis smooth scroll provider`
  - Files: `src/components/LenisProvider.tsx`, `src/main.tsx`

- [x] 6. useMagnetic hook (magnetic hover physics)

  **What to do**:
  - Create `src/hooks/useMagnetic.ts`:
    - Accept a `ref` (element to make magnetic) and options: `{ strength?: number, radius?: number }`
    - Use Framer Motion's `useMotionValue` for x/y offset
    - On `mousemove`: calculate cursor position relative to element center, apply spring force proportional to distance
    - On `mouseleave`: spring back to `{ x: 0, y: 0 }` (original position)
    - Use `useSpring` with config: `{ stiffness: 150, damping: 15, mass: 0.1 }` for snappy but smooth feel
    - Return `MotionStyle` object (`{ x, y }`) to spread onto the element
    - Respect `prefers-reduced-motion`: if reduced, return `{ x: 0, y: 0 }` (no effect)
  - The effect should be subtle — max pull distance ~15-20px
  - Element should use `display: inline-block` or wrapper to prevent layout shift

  **Must NOT do**:
  - Do NOT use `onMouseMove` on `window` — only on the ref element
  - Do NOT cause layout shift when element moves (use `transform`, not `left`/`top`)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Physics-based animation requiring Framer Motion spring math
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `rayden-code`: Not applicable (custom hook, not Rayden components)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: Tasks 11, 12, 13, 15, 16 (all sections + shared components)
  - **Blocked By**: Task 5 (framer-motion available from scaffold)

  **References**:
  - **External References**:
    - Framer Motion `useMotionValue`: `https://www.framer.com/motion/use-motion-value/` — API for raw motion values
    - Framer Motion `useSpring`: `https://www.framer.com/motion/use-spring/` — Spring physics configuration
    - Framer Motion `useTransform`: `https://www.framer.com/motion/use-transform/` — Mapping mouse position to offset

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Magnetic hover pulls element toward cursor
    Tool: Playwright
    Preconditions: Test component using useMagnetic rendered
    Steps:
      1. Navigate to test page
      2. Locate magnetic element
      3. Move mouse to element center, note transform
      4. Move mouse to element edge (still within element bounds)
      5. Assert: transform changed (element moved toward cursor)
      6. Move mouse completely outside element
      7. Assert: transform reset to translate(0px, 0px)
    Expected Result: Element moves toward cursor, springs back on leave
    Evidence: .sisyphus/evidence/task-6-magnetic.mp4 (screen recording)

  Scenario: Reduced motion disables magnetic effect
    Tool: Playwright
    Preconditions: Emulate prefers-reduced-motion: reduce
    Steps:
      1. Navigate to test page
      2. Hover over magnetic element
      3. Assert: no transform applied (stays at origin)
    Expected Result: No magnetic effect when reduced motion preferred
    Evidence: .sisyphus/evidence/task-6-reduced.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-6-magnetic.mp4`
  - [ ] `.sisyphus/evidence/task-6-reduced.png`

  **Commit**: YES
  - Message: `feat(hooks): add useMagnetic hook with spring physics`
  - Files: `src/hooks/useMagnetic.ts`

- [x] 7. useCipherText hook (scramble decode effect)

  **What to do**:
  - Create `src/hooks/useCipherText.ts`:
    - Accept `targetText: string` and options: `{ duration?: number, charset?: string }`
    - Default charset: uppercase letters + numbers + special chars (`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*`)
    - On mount, start scrambling: every ~50ms, randomize all characters
    - After `duration` ms (default 3000), begin "resolving" characters one by one (left to right or random)
    - Use `useState` for current display text
    - Use `useEffect` with `setInterval` for the animation loop
    - Return the current scrambled/decoded text string
    - Clean up interval on unmount
    - If `prefers-reduced-motion`: immediately return `targetText` (no animation)

  **Must NOT do**:
  - Do NOT use `requestAnimationFrame` for text updates (unnecessary — 50ms intervals are fine)
  - Do NOT block rendering during scramble (use async intervals)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timed text animation with character-level manipulation
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 11 (Hero section)
  - **Blocked By**: None (pure React hook)

  **References**:
  - **External References**:
    - React `setInterval` pattern: `https://overreacted.io/making-setinterval-declarative-with-react-hooks/` — Dan Abramov's pattern for declarative intervals in hooks

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Text scrambles then resolves to target
    Tool: Playwright
    Preconditions: Test component renders useCipherText("HELLO")
    Steps:
      1. Navigate to test page
      2. Wait 500ms, capture displayed text — should be scrambled (not "HELLO")
      3. Wait 3500ms total (beyond decode time), capture text
      4. Assert: displayed text === "HELLO"
    Expected Result: Text scrambles initially, then resolves to target
    Evidence: .sisyphus/evidence/task-7-cipher.mp4

  Scenario: Reduced motion returns target immediately
    Tool: Playwright  
    Preconditions: prefers-reduced-motion: reduce
    Steps:
      1. Navigate to test page
      2. Immediately capture displayed text
      3. Assert: displayed text === "HELLO" (no scramble)
    Expected Result: No animation, text appears immediately
    Evidence: .sisyphus/evidence/task-7-reduced.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-7-cipher.mp4`
  - [ ] `.sisyphus/evidence/task-7-reduced.png`

  **Commit**: YES
  - Message: `feat(hooks): add useCipherText scramble-decode hook`
  - Files: `src/hooks/useCipherText.ts`

- [x] 8. useInkDrop hook (ripple effect)

  **What to do**:
  - Create `src/hooks/useInkDrop.ts`:
    - Return `{ trigger, InkDropOverlay }` — trigger function + overlay component
    - When `trigger()` is called: create expanding circle from click point
    - Circle expands from center to fill entire viewport (scale from 0 to ~50)
    - Use Framer Motion `motion.div` with `animate={{ scale }}` and easing
    - After expansion completes (~600ms), call the provided callback (e.g., `window.location.href = 'mailto:...'`)
    - Circle color: `var(--accent)` (#0070F3) or `var(--surface)` (#1A1A1A)
    - Overlay is absolutely positioned, centered on trigger point, `border-radius: 50%`
    - Respect `prefers-reduced-motion`: skip animation, call callback immediately

  **Must NOT do**:
  - Do NOT use CSS `clip-path` for the circle (use `border-radius: 50%` + `overflow: hidden`)
  - Do NOT forget `pointer-events: none` until triggered (so it doesn't block clicks)
  - Do NOT animate `width`/`height` — use `scale` transform (GPU-accelerated)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex Framer Motion animation with callback timing
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 16 (Footer CTA)
  - **Blocked By**: None

  **References**:
  - **External References**:
    - Framer Motion `animate` with scale: `https://www.framer.com/motion/animation/##scale` — Scale animation syntax

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Ripple expands from click point and calls callback
    Tool: Playwright
    Preconditions: Test component with useInkDrop and a mock callback
    Steps:
      1. Navigate to test page
      2. Click the trigger button at coordinates (200, 300)
      3. Assert: circular overlay appears at click position
      4. Wait 700ms
      5. Assert: callback was called
      6. Assert: circle scaled to cover viewport
    Expected Result: Ripple expands and callback fires
    Evidence: .sisyphus/evidence/task-8-ripple.mp4
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-8-ripple.mp4`

  **Commit**: YES
  - Message: `feat(hooks): add useInkDrop ripple effect hook`
  - Files: `src/hooks/useInkDrop.ts`

- [x] 9. NeuralMesh canvas component

  **What to do**:
  - Create `src/canvas/NeuralMesh.tsx`:
    - Canvas element filling the Hero section background (position: absolute, inset: 0)
    - Generate ~50-80 nodes at random positions within canvas bounds
    - On `mousemove` (tracked on canvas or parent): apply attractive force to nearby nodes
    - Each node has: `{ x, y, vx, vy, radius }` — simple velocity-based physics
    - Animation loop via `requestAnimationFrame`:
      1. Clear canvas
      2. For each node: apply mouse force (inverse square law), update position, apply damping
      3. Draw connections (lines) between nodes within ~150px distance — line opacity proportional to proximity
      4. Draw nodes as small circles (radius 2-3px) with subtle glow
    - Mouse force: nodes within ~200px radius of cursor are gently pulled toward it
    - Node color: `rgba(0, 112, 243, 0.15)` for connections, `rgba(0, 112, 243, 0.4)` for nodes
    - Use `useRef` for canvas, `useEffect` for animation lifecycle
    - Handle resize: regenerate node positions on window resize (debounced)
    - Respect `prefers-reduced-motion`: render static nodes, no animation loop

  **Must NOT do**:
  - Do NOT use Three.js or any 3D library — pure Canvas 2D API
  - Do NOT block main thread — animation loop should be efficient (< 5ms per frame)
  - Do NOT use `getContext('webgl')` — 2D context only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Canvas 2D animation with physics simulation, requires performance awareness
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `rayden-code`: Not applicable (canvas, not React components)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 11 (Hero section)
  - **Blocked By**: None

  **References**:
  - **External References**:
    - Canvas 2D API: `https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D` — Drawing methods (`beginPath`, `arc`, `moveTo`, `lineTo`, `stroke`)
    - `requestAnimationFrame`: `https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame` — Animation loop pattern
    - Debounce example: `https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#debounce` — Simple debounce for resize handler

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Neural mesh renders and responds to mouse
    Tool: Playwright
    Preconditions: NeuralMesh mounted in test page
    Steps:
      1. Navigate to test page
      2. Wait 500ms for initial render
      3. Screenshot canvas — verify nodes and connections visible
      4. Move mouse to different positions on canvas
      5. Screenshot again — verify nodes shifted toward new cursor position
    Expected Result: Nodes render and move toward mouse
    Evidence: .sisyphus/evidence/task-9-mesh.png, .sisyphus/evidence/task-9-mesh-moved.png

  Scenario: Canvas resizes with window
    Tool: Playwright
    Steps:
      1. Navigate at 1280x720 viewport
      2. Resize to 1920x1080
      3. Wait 300ms (debounce)
      4. Assert: canvas.width === 1920 (or close, accounting for devicePixelRatio)
    Expected Result: Canvas adapts to new viewport size
    Evidence: .sisyphus/evidence/task-9-resize.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-9-mesh.png`
  - [ ] `.sisyphus/evidence/task-9-mesh-moved.png`
  - [ ] `.sisyphus/evidence/task-9-resize.png`

  **Commit**: YES
  - Message: `feat(canvas): add NeuralMesh interactive background`
  - Files: `src/canvas/NeuralMesh.tsx`

- [x] 10. SVG animation utilities (stroke-dasharray)

  **What to do**:
  - Create `src/components/ui/SvgBorder.tsx`:
    - Renders an SVG `<rect>` that draws its border via `stroke-dasharray` animation
    - Props: `width`, `height`, `duration`, `color`, `trigger` (boolean to start animation)
    - On `trigger=true`: animate `strokeDashoffset` from total length to 0 over `duration` ms
    - Use CSS `@keyframes` for the dash animation (or Framer Motion `animate`)
    - SVG positioned absolutely to fill parent element
    - Border: 1px stroke, `var(--border)` color, `fill: none`
  - Create helper function in `src/utils/svg.ts`:
    - `getPathLength(pathElement)` — utility for calculating SVG path length
    - `createDashAnimation(length, duration)` — generates CSS keyframes string

  **Must NOT do**:
  - Do NOT use inline styles for animation timing (use CSS custom properties)
  - Do NOT animate more than one `rect` per component instance

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard SVG `stroke-dasharray` technique, well-documented
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 12 (Expertise section)
  - **Blocked By**: None

  **References**:
  - **External References**:
    - SVG `stroke-dasharray` animation: `https://css-tricks.com/svg-line-animation-works/` — Classic technique for line drawing
    - `getTotalLength()`: `https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength` — Calculate path length for offset animation

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: SVG border draws on trigger
    Tool: Playwright
    Preconditions: SvgBorder mounted with trigger=false
    Steps:
      1. Navigate to test page
      2. Screenshot — border should be invisible (dashoffset = full length)
      3. Set trigger=true via React state change
      4. Wait for animation duration + 200ms
      5. Screenshot — border should be fully drawn
    Expected Result: Border animates from invisible to fully drawn
    Evidence: .sisyphus/evidence/task-10-border-before.png, .sisyphus/evidence/task-10-border-after.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-10-border-before.png`
  - [ ] `.sisyphus/evidence/task-10-border-after.png`

  **Commit**: YES
  - Message: `feat(ui): add SVG stroke-dasharray border animation`
  - Files: `src/components/ui/SvgBorder.tsx`, `src/utils/svg.ts`

- [x] 11. Hero section ("The Boot Sequence")

  **What to do**:
  - Create `src/components/hero/Hero.tsx`:
    - Full viewport height section (`h-screen`), relative positioning
    - Layer 1 (background): `<NeuralMesh />` component (Task 9) — absolutely positioned, covers entire section
    - Layer 2 (foreground, centered):
      - Name: `<h1>` using `useCipherText("Fatlind Azemi")` — monospace font, large size (~clamp(3rem, 8vw, 7rem))
      - Subtitle: `<p>` using `useCipherText("Software & Data Engineer")` — starts after name resolves (~500ms delay)
      - Bio: Short static text below — fades in after subtitle completes
    - On mount: page is black (#111111), cipher starts immediately
    - Add a subtle vignette overlay (radial gradient from transparent to black at edges)
    - Scroll indicator: small animated chevron or line at bottom, fades out on scroll
  - Use Framer Motion `AnimatePresence` for the sequence timing between name → subtitle → bio

  **Must NOT do**:
  - Do NOT use a video or GIF for background — pure Canvas 2D
  - Do NOT make the cipher text interactive (no user input needed)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex composition with layered animations, sequencing, and canvas integration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (unique section with dependencies)
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)
  - **Blocks**: Task 18 (main assembly)
  - **Blocked By**: Tasks 6, 7, 9

  **References**:
  - **Pattern References**:
    - `src/hooks/useCipherText.ts` — Import and use: `const displayText = useCipherText("Fatlind Azemi")`
    - `src/canvas/NeuralMesh.tsx` — Import as `<NeuralMesh />`, placed as background layer
    - `src/hooks/useMagnetic.ts` — May be applied to scroll indicator

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Hero loads with black screen, cipher decodes name
    Tool: Playwright
    Preconditions: Clean page load
    Steps:
      1. Navigate to localhost:5173
      2. Immediately after load: assert background is dark (near black)
      3. Wait 500ms: capture h1 text — should be scrambled (not "Fatlind Azemi")
      4. Wait 4000ms total: capture h1 text — assert === "Fatlind Azemi"
      5. Wait additional 1000ms: capture subtitle — assert === "Software & Data Engineer"
    Expected Result: Name decodes, subtitle follows, bio fades in
    Evidence: .sisyphus/evidence/task-11-hero-sequence.mp4

  Scenario: Neural mesh responds to mouse movement
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173
      2. Wait for cipher to complete
      3. Move mouse to (100, 100), screenshot
      4. Move mouse to (500, 300), screenshot
      5. Compare: node positions should differ
    Expected Result: Mesh nodes shift with cursor
    Evidence: .sisyphus/evidence/task-11-mesh-mouse-1.png, .sisyphus/evidence/task-11-mesh-mouse-2.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-11-hero-sequence.mp4`
  - [ ] `.sisyphus/evidence/task-11-mesh-mouse-1.png`
  - [ ] `.sisyphus/evidence/task-11-mesh-mouse-2.png`

  **Commit**: YES
  - Message: `feat(hero): add boot sequence with cipher text and neural mesh`
  - Files: `src/components/hero/Hero.tsx`

- [x] 12. Expertise section ("The Interactive Pipeline")

  **What to do**:
  - Create `src/components/expertise/Expertise.tsx`:
    - Section with Bento-Box grid (2 columns at >= 768px, 1 column below)
    - Left column: "Data Engineering & Architecture" — title, subtitle, skills grid
    - Right column: "Product & App Development" — same structure
    - Each skill item (e.g., "PySpark", "React"):
      - `<SvgBorder />` wraps the card — border draws on scroll-into-view
      - Text drops in with staggered Framer Motion animation (50ms stagger between items)
      - On hover: a small "terminal" window slides up from below the skill name:
        - Shows 3 lines: `> command`, `> Loading...`, `> 0.94 accuracy` (content from `portfolioData`)
        - Terminal styled with monospace font, `var(--surface)` background, 1px `var(--border)` border
        - Slide animation: `translateY(20px) → 0, opacity 0 → 1`
  - Scroll-into-view detection: Use Framer Motion's `useInView` with `once: true`
  - Use `useMagnetic` on the entire card container for subtle pull effect

  **Must NOT do**:
  - Do NOT animate all cards at once — stagger is mandatory (50ms per card)
  - Do NOT use `window.innerHeight` calculations — use `useInView` from Framer Motion

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Complex staggered animations, SVG border coordination, terminal hover interactions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 11, 13, 14)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 18
  - **Blocked By**: Tasks 2 (CSS tokens), 4 (data), 6 (magnetic), 10 (SVG border)

  **References**:
  - **Pattern References**:
    - `src/data/portfolio.ts:expertise` — Array of 2 expertise categories with skills and terminal commands
    - `src/hooks/useMagnetic.ts` — Apply to card containers: `const magneticStyle = useMagnetic(ref)`
    - `src/components/ui/SvgBorder.tsx` — Wrap each card: `<SvgBorder trigger={inView}>`
  - **External References**:
    - Framer Motion `useInView`: `https://www.framer.com/motion/use-in-view/` — Scroll-into-view detection

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Expertise grid renders with staggered animation
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173, scroll to expertise section
      2. Wait for scroll-into-view trigger
      3. Screenshot at 300ms: some cards visible, some not yet
      4. Screenshot at 1000ms: all cards visible
    Expected Result: Cards appear with stagger, not all at once
    Evidence: .sisyphus/evidence/task-12-stagger-300ms.png, .sisyphus/evidence/task-12-stagger-1000ms.png

  Scenario: Terminal slides up on skill hover
    Tool: Playwright
    Steps:
      1. Scroll expertise into view, wait for animation
      2. Hover over "PySpark" skill card
      3. Wait 300ms
      4. Assert: terminal window visible with command text
      5. Assert: terminal contains ">" prompt
    Expected Result: Terminal appears with command output on hover
    Evidence: .sisyphus/evidence/task-12-terminal.png

  Scenario: SVG borders draw on scroll-into-view
    Tool: Playwright
    Steps:
      1. Navigate, scroll expertise into view
      2. Wait for border animation (500ms)
      3. Assert: card borders are fully visible (not dashed/gapped)
    Expected Result: Borders animate from hidden to visible
    Evidence: .sisyphus/evidence/task-12-borders.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-12-stagger-300ms.png`
  - [ ] `.sisyphus/evidence/task-12-stagger-1000ms.png`
  - [ ] `.sisyphus/evidence/task-12-terminal.png`
  - [ ] `.sisyphus/evidence/task-12-borders.png`

  **Commit**: YES
  - Message: `feat(expertise): add interactive pipeline bento grid section`
  - Files: `src/components/expertise/Expertise.tsx`

- [x] 13. MagneticWrapper + CurtainReveal shared components

  **What to do**:
  - Create `src/components/ui/MagneticWrapper.tsx`:
    - Generic wrapper that applies `useMagnetic` hook to any child
    - Props: `children`, `strength?`, `radius?`
    - Uses `cloneElement` or renders a `<motion.div>` wrapping `children`
    - The `motion.div` uses `style={{ x, y }}` from `useMagnetic` return value
    - `display: inline-block` to prevent full-width stretching
  - Create `src/components/ui/CurtainReveal.tsx`:
    - Props: `children`, `isVisible: boolean`
    - Uses Framer Motion `motion.div` with `clipPath` animation:
      - Hidden: `clipPath: 'inset(0 0 100% 0)'` (fully clipped from bottom)
      - Visible: `clipPath: 'inset(0 0 0% 0)'` (fully revealed)
    - Transition: `{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }` (custom cubic-bezier for smooth curtain feel)
    - Respect `prefers-reduced-motion`: if reduced, toggle visibility instantly (no clip-path animation)
  - Create `src/components/ui/SectionTransition.tsx`:
    - Composes `CurtainReveal` with scroll-into-view detection
    - Uses `useInView` with `margin: '-20%'` (trigger slightly before element enters viewport)
    - Wraps section content

  **Must NOT do**:
  - Do NOT use `AnimatePresence` for CurtainReveal (it unmounts children — we want them mounted but clipped)
  - Do NOT use `overflow: hidden` on the motion.div (the clip-path handles visibility)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Framer Motion clip-path animations with scroll coordination
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 11, 12, 14)
  - **Parallel Group**: Wave 3
  - **Blocks**: Tasks 15, 16, 18 (all sections use these)
  - **Blocked By**: Task 6 (useMagnetic)

  **References**:
  - **Pattern References**:
    - `src/hooks/useMagnetic.ts` — Imported by MagneticWrapper
  - **External References**:
    - Framer Motion `clipPath`: `https://www.framer.com/motion/examples/##clip-path` — Clip-path animation patterns
    - Custom easing curves: `https://easings.net/` — Reference for cubic-bezier values

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: CurtainReveal animates from hidden to visible
    Tool: Playwright
    Steps:
      1. Render CurtainReveal with isVisible=false initially
      2. Screenshot: content should be invisible (clipped)
      3. Set isVisible=true
      4. Wait 900ms (animation duration + buffer)
      5. Screenshot: content fully visible
    Expected Result: Content reveals via clip-path animation
    Evidence: .sisyphus/evidence/task-13-curtain-before.png, .sisyphus/evidence/task-13-curtain-after.png

  Scenario: MagneticWrapper applies magnetic effect
    Tool: Playwright
    Steps:
      1. Render <MagneticWrapper><button>Test</button></MagneticWrapper>
      2. Move mouse near button edge
      3. Assert: button transform changes (moves toward cursor)
    Expected Result: Wrapped element has magnetic behavior
    Evidence: .sisyphus/evidence/task-13-magnetic.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-13-curtain-before.png`
  - [ ] `.sisyphus/evidence/task-13-curtain-after.png`
  - [ ] `.sisyphus/evidence/task-13-magnetic.png`

  **Commit**: YES
  - Message: `feat(ui): add MagneticWrapper and CurtainReveal shared components`
  - Files: `src/components/ui/MagneticWrapper.tsx`, `src/components/ui/CurtainReveal.tsx`, `src/components/ui/SectionTransition.tsx`

- [x] 14. Navigation component

  **What to do**:
  - Create `src/components/Navigation.tsx`:
    - Fixed/sticky navigation at top or as floating dot-nav on the right side
    - Navigation items: [Hero ▪] [Expertise ▪] [Projects ▪] [Contact]
    - Clicking scrolls to corresponding section via Lenis: `lenis.scrollTo('#expertise')`
    - Active section detection: use `useScroll` or intersection observer to highlight current section
    - Style: minimal — small dots or thin text, `var(--text-muted)` for inactive, `var(--text-primary)` for active
    - Use `useMagnetic` on each nav item for subtle pull
    - On mobile: simplified (maybe bottom bar or hamburger if many items)
  - Use the `useLenis()` hook from Task 5 to access the Lenis instance

  **Must NOT do**:
  - Do NOT use `window.scrollTo` — must use `lenis.scrollTo()` for smooth scroll
  - Do NOT use `react-router` or URL-based routing (single page)
  - Do NOT make it visually prominent — minimal, engineering-focused

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard navigation with Lenis integration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 11, 12, 13)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 18 (assembly)
  - **Blocked By**: Task 5 (Lenis provider)

  **References**:
  - **Pattern References**:
    - `src/components/LenisProvider.tsx:useLenis()` — Hook to access Lenis instance: `const lenis = useLenis()`
  - **External References**:
    - Lenis `scrollTo`: `https://github.com/darkroomengineering/lenis?tab=readme-ov-file#scrollto` — API for programmatic scrolling

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Nav click scrolls to correct section
    Tool: Playwright
    Preconditions: Page has sections with matching IDs
    Steps:
      1. Navigate to localhost:5173
      2. Click nav item for "Expertise"
      3. Wait 1000ms for scroll animation
      4. Assert: expertise section is in viewport (element is visible)
    Expected Result: Smooth scroll to target section
    Evidence: .sisyphus/evidence/task-14-nav-scroll.mp4

  Scenario: Active section is highlighted
    Tool: Playwright
    Steps:
      1. Navigate, scroll to projects section
      2. Wait 500ms for active state update
      3. Assert: projects nav item has active styling (different color/opacity)
    Expected Result: Current section highlighted in nav
    Evidence: .sisyphus/evidence/task-14-active-nav.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-14-nav-scroll.mp4`
  - [ ] `.sisyphus/evidence/task-14-active-nav.png`

  **Commit**: YES
  - Message: `feat(nav): add minimal dot navigation with Lenis scroll`
  - Files: `src/components/Navigation.tsx`

- [x] 15. Projects horizontal scroll section ("The Horizontal Momentum")

  **What to do**:
  - Create `src/components/projects/Projects.tsx`:
    - Section with `height: 300vh` (or dynamic based on project count) — provides scroll room
    - Inner container: `position: sticky; top: 0; height: 100vh; overflow: hidden` — pins section vertically
    - Projects wrapper: `display: flex; width: max-content` — holds all project cards horizontally
    - Use Framer Motion `useScroll` with `target` ref on the outer section container:
      ```typescript
      const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
      })
      ```
    - Map `scrollYProgress` (0-1) to `translateX` via `useTransform`:
      - `x = useTransform(scrollYProgress, [0, 1], ['0%', '-${(projectCount - 1) * 100 / projectCount}%'])`
    - Project cards (3 total):
      - Each card: `min-width: 80vw` (responsive), `height: 80vh`, centered vertically
      - Card content: title, subtitle, description, tech stack tags, metrics
      - **Data visualization per card**:
        - Card 1 ("Enterprise Forecasting Engine"): Animated line chart SVG — line draws from left to right, points appear sequentially
        - Card 2 ("Media Trend Analysis API"): Animated node graph SVG — nodes appear and connections draw between them
        - Card 3 ("SaaS Utility Platform"): Animated bar chart SVG — bars grow from bottom to top
      - Each viz animates when card enters viewport (use `useInView` with horizontal offset consideration)
    - Progress indicator: horizontal dots at bottom showing which project is currently visible
    - Use `useMagnetic` on each card for subtle pull

  **Must NOT do**:
  - Do NOT use `overflow-x: scroll` on a container (native scroll) — must be translateX via Framer Motion
  - Do NOT use a charting library (Recharts, D3, etc.) — custom SVG drawings only
  - Do NOT forget `will-change: transform` on the scrolling wrapper for GPU acceleration

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Most complex task — horizontal scroll with pinning, multiple data visualizations, scroll progress mapping
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on Wave 3 shared components)
  - **Parallel Group**: Wave 4 (with Tasks 16, 17)
  - **Blocks**: Task 18
  - **Blocked By**: Tasks 4 (data), 6 (useMagnetic), 13 (MagneticWrapper, CurtainReveal)

  **References**:
  - **External References**:
    - Framer Motion `useScroll`: `https://www.framer.com/motion/use-scroll/` — Scroll progress tracking with `offset` option
    - Framer Motion `useTransform`: `https://www.framer.com/motion/use-transform/` — Map scroll progress to translateX
    - Framer Motion `useSpring`: `https://www.framer.com/motion/use-spring/` — Optional: smooth the horizontal scroll with spring
    - SVG line chart: `https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline` — Polyline element for line charts
    - SVG bar chart: `https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect` — Rect elements with animated height

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Horizontal scroll advances as user scrolls down
    Tool: Playwright
    Steps:
      1. Navigate, scroll to projects section top
      2. Screenshot: first project card should be centered
      3. Scroll down by 500px (within the 300vh section)
      4. Screenshot: horizontal position should have shifted (second card becoming visible)
      5. Scroll to end of section
      6. Assert: last project card is visible
    Expected Result: Vertical scroll translates to horizontal card movement
    Evidence: .sisyphus/evidence/task-15-horizontal-1.png, .sisyphus/evidence/task-15-horizontal-2.png, .sisyphus/evidence/task-15-horizontal-3.png

  Scenario: Data visualization animates on card entry
    Tool: Playwright
    Steps:
      1. Scroll until project card 1 is fully in viewport
      2. Screenshot immediately: line chart should be partially drawn
      3. Wait 2000ms
      4. Screenshot: line chart should be fully drawn
    Expected Result: SVG line chart animates its drawing
    Evidence: .sisyphus/evidence/task-15-viz-start.png, .sisyphus/evidence/task-15-viz-end.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-15-horizontal-1.png`
  - [ ] `.sisyphus/evidence/task-15-horizontal-2.png`
  - [ ] `.sisyphus/evidence/task-15-horizontal-3.png`
  - [ ] `.sisyphus/evidence/task-15-viz-start.png`
  - [ ] `.sisyphus/evidence/task-15-viz-end.png`

  **Commit**: YES
  - Message: `feat(projects): add horizontal momentum scroll with data viz`
  - Files: `src/components/projects/Projects.tsx`, `src/components/projects/DataViz.tsx` (or inline)

- [x] 16. Footer section ("The Shutter CTA")

  **What to do**:
  - Create `src/components/footer/Footer.tsx`:
    - Section: `height: 100vh`, centered content
    - CTA text: "Initiate Connection" — large, monospace, centered
    - Use Framer Motion `useScroll` with section ref:
      - Map `scrollYProgress` (0-1 within this section) to `scale` via `useTransform`:
      - Text starts at `scale: 0.98` and scales to `scale: 1.05` at section end
    - CTA button below text:
      - Text: "Open Channel" or similar
      - Wrapped in `<MagneticWrapper>` from Task 13
      - Uses `useInkDrop` from Task 8:
        - On click: trigger ink drop animation
        - After ripple fills screen (~600ms): execute `window.location.href = 'mailto:EMAIL_PLACEHOLDER'`
      - Button style: outlined, 1px `var(--border)`, `var(--surface)` bg, hover: `var(--accent)` bg transition
    - Background: subtle grid lines or a dark gradient fading to pure black at bottom
    - Respect `prefers-reduced-motion`: skip scale animation, skip ripple (direct mailto)

  **Must NOT do**:
  - Do NOT use `<a href="mailto:...">` directly — must go through ink drop → mailto sequence
  - Do NOT block the thread during ripple animation (use async callback)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Scroll-based scale animation + ink drop integration + magnetic button
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 15)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 18
  - **Blocked By**: Tasks 6 (useMagnetic), 8 (useInkDrop), 13 (MagneticWrapper)

  **References**:
  - **Pattern References**:
    - `src/hooks/useInkDrop.ts` — Import as: `const { trigger, InkDropOverlay } = useInkDrop(callback)`
    - `src/components/ui/MagneticWrapper.tsx` — Wrap button: `<MagneticWrapper><button>...</button></MagneticWrapper>`
    - `src/data/portfolio.ts:email` — Email address for mailto link

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: CTA scales up on scroll
    Tool: Playwright
    Steps:
      1. Scroll footer section into view (top of section)
      2. Screenshot: measure CTA text size
      3. Scroll to bottom of section
      4. Screenshot: CTA text should be slightly larger
    Expected Result: Text scales from ~0.98 to ~1.05
    Evidence: .sisyphus/evidence/task-16-scale-start.png, .sisyphus/evidence/task-16-scale-end.png

  Scenario: Ink drop ripple → mailto on button click
    Tool: Playwright
    Steps:
      1. Scroll to footer, ensure CTA button visible
      2. Intercept navigation: mock window.location.href setter
      3. Click CTA button
      4. Wait 200ms: assert ripple circle appears at click position
      5. Wait 800ms: assert ripple expanded to cover screen
      6. Assert: window.location.href was set to mailto:... (or attempted)
    Expected Result: Ripple animation plays, then mailto triggers
    Evidence: .sisyphus/evidence/task-16-ripple.mp4

  Scenario: Magnetic hover on CTA button
    Tool: Playwright
    Steps:
      1. Hover near CTA button edge
      2. Assert: button shifts slightly toward cursor
    Expected Result: Button has magnetic hover behavior
    Evidence: .sisyphus/evidence/task-16-magnetic.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-16-scale-start.png`
  - [ ] `.sisyphus/evidence/task-16-scale-end.png`
  - [ ] `.sisyphus/evidence/task-16-ripple.mp4`
  - [ ] `.sisyphus/evidence/task-16-magnetic.png`

  **Commit**: YES
  - Message: `feat(footer): add shutter CTA with magnetic button and ink drop`
  - Files: `src/components/footer/Footer.tsx`

- [x] 17. Parallax background layer

  **What to do**:
  - Create `src/components/ParallaxBackground.tsx`:
    - Fixed-position background layer that spans full page height
    - Contains subtle grid lines or code snippets rendered as low-opacity text
    - Uses Framer Motion `useScroll` on the page-level scroll:
      - Grid lines: `translateY` mapped to `scrollYProgress` — moves at 0.3x speed (slower than foreground)
      - Code snippets: `translateY` at 0.15x speed (even slower, deeper parallax)
    - Grid: thin horizontal and vertical lines, `var(--border)` color, very low opacity (0.03-0.05)
    - Code snippets: random lines of monospace text (e.g., `SELECT * FROM`, `def process_data`, `await fetch`) scattered in background
    - `pointer-events: none` on entire layer (don't block interactions)
    - `z-index: 0` (behind all content)
    - Respect `prefers-reduced-motion`: render static, no parallax movement

  **Must NOT do**:
  - Do NOT use Canvas for the grid (simple CSS or SVG is sufficient and lighter)
  - Do NOT animate opacity or color — only `translateY` for parallax
  - Do NOT use more than 2 parallax layers (keep it performant)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Framer Motion parallax transformations coordinated with scroll
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Tasks 15, 16)
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 18
  - **Blocked By**: Task 5 (Lenis — but parallax uses Framer Motion's useScroll, not Lenis directly)

  **References**:
  - **External References**:
    - Framer Motion `useScroll` on container: `https://www.framer.com/motion/use-scroll/##container-scroll` — Scroll progress relative to container
    - Framer Motion `useTransform` for parallax: `https://www.framer.com/motion/use-transform/` — `y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])` for slow movement

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Parallax layers move at different speeds
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173
      2. Scroll to middle of page
      3. Capture transform of grid layer element
      4. Capture transform of code snippet layer element
      5. Assert: both have translateY values, but different magnitudes (code layer moves less)
    Expected Result: Background elements move slower than foreground during scroll
    Evidence: .sisyphus/evidence/task-17-parallax.png

  Scenario: Background does not block interactions
    Tool: Playwright
    Steps:
      1. Navigate, locate the parallax background container
      2. Assert: pointer-events is 'none' on the background layer
      3. Click a visible button through the background
      4. Assert: button click registered
    Expected Result: Background is purely visual, doesn't interfere
    Evidence: .sisyphus/evidence/task-17-pointer-events.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-17-parallax.png`
  - [ ] `.sisyphus/evidence/task-17-pointer-events.txt`

  **Commit**: YES
  - Message: `feat(background): add parallax grid and code snippet layer`
  - Files: `src/components/ParallaxBackground.tsx`

- [x] 18. Main App assembly

  **What to do**:
  - In `src/App.tsx`:
    - Import all sections: Hero, Expertise, Projects, Footer
    - Import shared components: Navigation, ParallaxBackground, SectionTransition
    - Compose the page:
      ```tsx
      <LenisProvider>
        <ParallaxBackground />
        <Navigation />
        <main>
          <SectionTransition><Hero /></SectionTransition>
          <SectionTransition><Expertise /></SectionTransition>
          <SectionTransition><Projects /></SectionTransition>
          <SectionTransition><Footer /></SectionTransition>
        </main>
      </LenisProvider>
      ```
    - Each section gets an `id` attribute matching navigation targets: `#hero`, `#expertise`, `#projects`, `#contact`
    - Ensure `SectionTransition` wraps each section for curtain reveal effect
    - Add `data-lenis-prevent` to any elements that should NOT be controlled by Lenis (if needed)

  **Must NOT do**:
  - Do NOT add any extra sections beyond the 4 specified
  - Do NOT use React Router or any routing

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Compositing all animated sections requires awareness of animation contexts and z-index layering
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (final assembly, depends on ALL sections)
  - **Parallel Group**: Wave 5 (sequential — depends on all Wave 3 + 4)
  - **Blocks**: Tasks 19, 20, 21
  - **Blocked By**: Tasks 11, 12, 13, 14, 15, 16, 17

  **References**:
  - **Pattern References**:
    - `src/components/hero/Hero.tsx` — `export default function Hero()`
    - `src/components/expertise/Expertise.tsx` — Import and render
    - `src/components/projects/Projects.tsx` — Import and render
    - `src/components/footer/Footer.tsx` — Import and render
    - `src/components/Navigation.tsx` — Import and render
    - `src/components/ParallaxBackground.tsx` — Import and render
    - `src/components/ui/SectionTransition.tsx` — Wrap each section

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All 4 sections render on page
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173
      2. Assert: Hero section visible (cipher text)
      3. Scroll down: assert Expertise section visible
      4. Scroll down: assert Projects section visible
      5. Scroll down: assert Footer section visible
    Expected Result: Complete page with all sections present and functional
    Evidence: .sisyphus/evidence/task-18-full-page.mp4

  Scenario: Navigation links scroll to correct sections
    Tool: Playwright
    Steps:
      1. Click nav item "Projects"
      2. Assert: projects section is in viewport
      3. Click nav item "Contact"
      4. Assert: footer section is in viewport
    Expected Result: Navigation works correctly across all sections
    Evidence: .sisyphus/evidence/task-18-nav.mp4
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-18-full-page.mp4`
  - [ ] `.sisyphus/evidence/task-18-nav.mp4`

  **Commit**: YES
  - Message: `feat(page): assemble main page with all kinetic sections`
  - Files: `src/App.tsx`

- [x] 19. Responsive adjustments + accessibility pass

  **What to do**:
  - Test and fix at viewports: 375px (mobile), 768px (tablet), 1024px (small laptop), 1440px+ (desktop)
  - **Mobile (375px)**:
    - Hero: cipher text must fit without wrapping or reduce font size
    - Expertise: collapse 2-column → 1-column at < 640px
    - Projects: horizontal scroll must degrade gracefully (consider switching to vertical stack on mobile if horizontal is broken)
    - Navigation: switch to compact bottom bar or top bar (dot nav impractical on small screens)
    - Footer: CTA text scales down, button still tappable (min 44px touch target)
  - **Tablet (768px)**:
    - Expertise: 2 columns work, but card sizes may need adjustment
    - Projects: horizontal scroll still works with narrower cards
  - **Accessibility**:
    - Tab navigation: all interactive elements focusable in logical order
    - Focus indicators: `:focus-visible` outline on all buttons, links, interactive cards
    - Heading hierarchy: one `<h1>` (hero name) → `<h2>` for section titles → `<h3>` for card titles
    - `aria-label` on icon-only elements and navigation items
    - `role="navigation"` on nav component
    - Canvas: add `role="img"` and `aria-label="Neural network background visualization"`
  - **200% zoom**: verify layout doesn't break at 200% zoom on 1280px viewport
  - **prefers-reduced-motion**: verify ALL animations disable (cipher, magnetic, ink drop, curtain reveal, parallax, horizontal scroll, scale CTA)

  **Must NOT do**:
  - Do NOT use separate mobile/desktop components (responsive via CSS/Tailwind)
  - Do NOT hide the neural mesh on mobile (can reduce node count for performance)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Responsive bug fixes + accessibility attributes, no new features
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 20, 21)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1-F4
  - **Blocked By**: Task 18

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Mobile layout is usable at 375px
    Tool: Playwright
    Steps:
      1. Set viewport to 375x812 (iPhone)
      2. Navigate, verify: no horizontal overflow, text readable
      3. Scroll through all sections
      4. Assert: all content is visible without horizontal scrolling
    Expected Result: Site is fully usable on mobile
    Evidence: .sisyphus/evidence/task-19-mobile.png

  Scenario: Keyboard navigation works
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173
      2. Press Tab repeatedly (20+ times)
      3. Assert: focus moves through all interactive elements (nav items, cards, buttons)
      4. Assert: each focused element has visible outline
      5. Press Enter on focused nav item
      6. Assert: page scrolls to corresponding section
    Expected Result: Full keyboard accessibility
    Evidence: .sisyphus/evidence/task-19-keyboard.mp4

  Scenario: Reduced motion disables all animations
    Tool: Playwright
    Preconditions: Emulate prefers-reduced-motion: reduce
    Steps:
      1. Navigate to localhost:5173
      2. Assert: cipher text shows immediately (no scramble)
      3. Scroll through all sections
      4. Assert: no magnetic effects, no curtain reveals, no parallax movement
    Expected Result: All animations disabled, content still accessible
    Evidence: .sisyphus/evidence/task-19-reduced-motion.png
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-19-mobile.png`
  - [ ] `.sisyphus/evidence/task-19-keyboard.mp4`
  - [ ] `.sisyphus/evidence/task-19-reduced-motion.png`

  **Commit**: YES
  - Message: `fix(a11y): responsive adjustments and accessibility pass`
  - Files: Multiple component files

- [x] 20. Performance optimization

  **What to do**:
  - Run `bun run build` and analyze bundle size:
    - Check: Framer Motion tree-shaking (only used imports should be bundled)
    - Check: no accidental import of entire libraries
  - Lazy load non-critical sections via `React.lazy` + `Suspense`:
    - Expertise, Projects, Footer can be lazy loaded (below fold)
    - Hero must be eager (above fold)
  - Canvas optimization:
    - Reduce node count on mobile (30-40 instead of 60-80)
    - Use `will-change: transform` on canvas
    - Throttle mousemove handler to 60fps max
  - Lenis optimization:
    - Disable `smoothTouch` (already done in Task 5) — mobile uses native scroll
  - Image/font optimization:
    - Inter + Geist Mono: verify they're loaded with `font-display: swap`
    - Preload fonts in `index.html` if self-hosted
  - Measure: Lighthouse Performance on desktop (throttled) should be >= 85
  - Add `<link rel="preload">` for critical font files in `index.html`
  - Verify no console errors or warnings

  **Must NOT do**:
  - Do NOT remove Lenis or Framer Motion to chase 100 Lighthouse score
  - Do NOT lazy-load the Hero section (above fold, critical first impression)
  - Do NOT use `React.memo` everywhere — only where profiling shows re-renders

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Performance measurement and optimization, no new features
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `performance-optimizer`: Available but task is focused enough without it

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 19, 21)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1-F4
  - **Blocked By**: Task 18

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Lighthouse Performance >= 85
    Tool: Playwright (Lighthouse integration)
    Steps:
      1. Run Lighthouse audit on localhost:5173 (desktop, throttled)
      2. Assert: Performance score >= 85
      3. Assert: Accessibility score >= 95
      4. Assert: No console errors
    Expected Result: Acceptable performance for animation-heavy site
    Evidence: .sisyphus/evidence/task-20-lighthouse.json

  Scenario: First Contentful Paint < 2.5s
    Tool: Playwright
    Steps:
      1. Measure FCP on throttled 4G connection
      2. Assert: FCP < 2500ms
    Expected Result: Page renders quickly
    Evidence: .sisyphus/evidence/task-20-fcp.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-20-lighthouse.json`
  - [ ] `.sisyphus/evidence/task-20-fcp.txt`

  **Commit**: YES
  - Message: `perf: optimize bundle size and lazy load below-fold sections`
  - Files: `src/App.tsx`, `vite.config.ts`, `index.html`

- [x] 21. SEO meta + favicon + robots.txt

  **What to do**:
  - Update `index.html`:
    - `<title>Fatlind Azemi — Software & Data Engineer</title>`
    - `<meta name="description" content="Portfolio of Fatlind Azemi, Software & Data Engineer specializing in enterprise data infrastructure and modern application development.">`
    - Open Graph tags:
      - `og:title`: Same as title
      - `og:description`: Same as description
      - `og:type`: `website`
      - `og:url`: `https://fatlindazemi.com` (placeholder — user updates)
      - `og:image`: `https://fatlindazemi.com/og-image.png` (placeholder — user adds image)
    - Twitter Card tags:
      - `twitter:card`: `summary_large_image`
      - `twitter:title`, `twitter:description`: Same as OG
    - Canonical URL: `<link rel="canonical" href="https://fatlindazemi.com">` (placeholder)
    - `<meta name="robots" content="index, follow">`
  - Create `public/robots.txt`:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://fatlindazemi.com/sitemap.xml
    ```
  - Add favicon:
    - Create or use a simple SVG favicon (monogram "FA" or geometric icon) and save as `public/favicon.ico`
    - Or use `public/favicon.svg` with `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
  - Add print stylesheet if not already in `index.css`:
    ```css
    @media print {
      * { background: white !important; color: black !important; }
      canvas, [data-animation] { display: none !important; }
    }
    ```

  **Must NOT do**:
  - Do NOT use real domain unless user provides it (use placeholders)
  - Do NOT generate a complex favicon (simple geometric shape or monogram)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Standard SEO metadata setup
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 19, 20)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1-F4
  - **Blocked By**: Task 18

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: All meta tags present
    Tool: Playwright
    Steps:
      1. Navigate to localhost:5173
      2. Assert: document.title is not empty
      3. Assert: meta[name="description"] exists with content
      4. Assert: meta[property="og:title"] exists
      5. Assert: meta[property="og:description"] exists
      6. Assert: meta[name="twitter:card"] exists
    Expected Result: Complete SEO metadata
    Evidence: .sisyphus/evidence/task-21-meta.txt

  Scenario: robots.txt and favicon accessible
    Tool: Bash
    Steps:
      1. curl localhost:5173/robots.txt → assert HTTP 200
      2. curl localhost:5173/favicon.ico (or .svg) → assert HTTP 200
    Expected Result: Both files served correctly
    Evidence: .sisyphus/evidence/task-21-robots.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-21-meta.txt`
  - [ ] `.sisyphus/evidence/task-21-robots.txt`

  **Commit**: YES
  - Message: `feat(seo): add meta tags, favicon, and robots.txt`
  - Files: `index.html`, `public/robots.txt`, `public/favicon.svg`, `src/index.css`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + `bun run build`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, `console.log` in production code, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (`data`/`result`/`item`/`temp`). Verify all animation code respects `prefers-reduced-motion`.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state (`bun run dev`). Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration:
  - Full scroll journey: Hero → Expertise → Projects → Footer
  - Cipher text decode timing
  - Magnetic hover on all interactive elements
  - Terminal hover micro-interactions
  - Horizontal scroll smoothness
  - Ink drop ripple → mailto attempt
  - Keyboard navigation full cycle
  - prefers-reduced-motion: reduce — all animations disabled
  - Mobile viewport (375px): full scroll, no horizontal overflow
  - 200% zoom: layout integrity
  Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes. Critical checks:
  - Exactly 4 sections (no extra)
  - Exactly 3 project cards (no more, no less)
  - Canvas 2D only (no Three.js import)
  - No charting library (no Recharts/D3 imports)
  - No extra npm packages
  - No server/API code
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT

---

## Commit Strategy

(Single commit per task — see individual task entries for message + files)

---

## Success Criteria

### Verification Commands
```bash
bun run build          # Expected: zero errors, /dist directory created
bun run dev            # Expected: localhost:5173 renders page
```

### Final Checklist
- [ ] All 4 sections present and interactive
- [ ] Cipher text decodes within ~3s
- [ ] Neural mesh responds to mouse movement
- [ ] SVG borders animate on scroll into expertise section
- [ ] Terminal micro-interactions trigger on skill hover
- [ ] Projects section pins and scrolls horizontally
- [ ] Data viz lines draw in project cards
- [ ] Magnetic hover works on interactive elements
- [ ] CTA ripple fills screen, then opens mailto
- [ ] prefers-reduced-motion disables all animations
- [ ] Print stylesheet functional
- [ ] All guardrails satisfied
- [ ] Zero console errors
