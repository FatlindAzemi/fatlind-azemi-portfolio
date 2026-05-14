# Learnings

## T2 — CSS Design Tokens

- Tailwind v4 uses `@import "tailwindcss"` at the top of `src/index.css`
- Custom utility classes go inside `@layer utilities { ... }` block
- CSS custom properties on `:root` work seamlessly with Tailwind v4
- Body font-family set to `"Inter", sans-serif` (Inter needs to be loaded separately, e.g., via Google Fonts in `index.html`)
- All surface/background colors use `var(--*)` references exclusively after the `:root` block — no hardcoded colors
- Build passes with `bun run build` (tsc + vite)

## T3 — TypeScript Type Definitions

- `src/types/index.ts` created with all 7 interfaces: `Project`, `Skill`, `ExpertiseCategory`, `SocialLink`, `PortfolioData`, `NeuralNode`, `MousePosition`
- `expertise` typed as tuple `[ExpertiseCategory, ExpertiseCategory]`
- `category` uses union `'data' | 'product'`
- `dataVizType` uses union `'line-chart' | 'node-graph' | 'bar-chart'`
- `npx tsc --noEmit` passes cleanly (exit 0)

## T17 — Lenis Smooth Scroll Provider

- Lenis v1.3.23 installed from `lenis` package (NOT `@studio-freight/lenis`)
- Lenis v1.3.x API uses `syncTouch` instead of `smoothTouch` to control native touch behavior
- Default export: `import Lenis from 'lenis'`
- Options type is `LenisOptions` — no `smoothTouch` property exists
- `LenisProvider.tsx` created at `src/components/LenisProvider.tsx` with React context
- Must use `useLayoutEffect` (not `useEffect`) for Lenis init — timing critical before browser paint
- `useState<Lenis | null>` ensures context value is properly propagated to children after init
- Build command `bun run build` runs both `tsc -b` and `vite build` — passed cleanly

## T4 — Data Layer (portfolio.ts)

- Created `src/data/portfolio.ts` with `portfolioData: PortfolioData`
- Content covers all fields: name, title, subtitle, bio (3 paragraphs), email (placeholder), expertise (2 categories × 6 skills each with terminal commands+output), projects (3 with distinct dataVizTypes), socialLinks (3 with placeholder URLs)
- All user-fillable fields marked with `// TODO: Replace with actual value` comments
- `npx tsc --noEmit` passes clean — all types align with `src/types/index.ts`
- Expertise tuple order: [Data Engineering & Architecture, Product & App Development]
- Project dataVizTypes: line-chart (forecast), node-graph (media), bar-chart (saas)
- Each skill has both `terminalCommand` and `terminalOutput` (exactly 3 lines per output)

## T6 — useInkDrop Hook

- Created `src/hooks/useInkDrop.tsx` (must be `.tsx` — TypeScript rejects JSX in `.ts` files with default tsconfig)
- Uses `useState` lazy initializer for `prefers-reduced-motion` check — runs once, SSR-safe, survives Strict Mode double-invoke
- Ripple uses `scale` transform (0 → 50) on a 20×20px circle — GPU-accelerated, no width/height jank
- Positioned at `(x - 10, y - 10)` to center the 20px circle on the click point
- `AnimatePresence` unmounts on exit rather than hiding with `opacity: 0`
- `ease: [0.4, 0, 0.2, 1]` cubic bezier = standard Material ease-out
- `willChange: "transform"` hints the browser to pre-optimize
- Build passes: `tsc -b && vite build` — 18 modules, 208KB JS (64KB gzip)

## T8 — useMagnetic Hook

- Created `src/hooks/useMagnetic.ts` — pure React hook with framer-motion spring physics
- Uses `useMotionValue` (not `useState`) for imperative updates — avoids render storms on every mousemove pixel
- Spring config `{ stiffness: 150, damping: 15, mass: 0.1 }` produces snappy but smooth magnetic feel
- Max pull distance clamped at 20px for subtlety; effect deactivates entirely when cursor > radius px from element center
- `prefers-reduced-motion` checked via `useMemo` (SSR-safe `typeof window` guard) — returns `{ x: 0, y: 0 }` static values when reduced
- All hooks called unconditionally (reduced motion check at end, not mid-hook) to comply with React hook rules
- Listeners attached to `ref.current` element only (not document/window) — self-contained, no layout pollution
- Return values `x` and `y` are `MotionValue<number>` that framer-motion applies as `translateX`/`translateY` under the hood — no layout shift
- `useCallback` wraps both handlers to keep deps stable and avoid excessive re-registrations
- Build passes: `tsc -b && vite build` — 18 modules, 208KB JS (64KB gzip)

## SvgBorder Component (T6)

- Created `src/components/ui/SvgBorder.tsx` — renders an SVG `<rect>` overlay that draws its border via `strokeDashoffset` CSS transition
- Created `src/utils/svg.ts` with `getRectPerimeter(width, height)` helper
- Component uses `ResizeObserver` to measure parent dimensions and compute stroke perimeter
- Renders rect conditionally after measurement (`ready` state) to avoid animation glitches on mount
- Animates `strokeDashoffset` from `perimeter` → `0` when `trigger` becomes `true`
- Default: `color = 'var(--border)'`, `duration = 800ms`
- SVG is absolutely positioned with `pointer-events: none` to layer over parent content
- Uses `vector-effect="non-scaling-stroke"` and `x="0.5"` for crisp 1px rendering
- `bun run build` passes cleanly (tsc + vite)
- Pattern: measure parent → set perimeter → conditional rect render → CSS transition on offset

## T5 — useCipherText Hook

- Created `src/hooks/useCipherText.ts` — pure TS (no JSX needed, `.ts` suffices)
- Two-phase interval-driven animation:
  - Phase 1 (0 to `duration` ms): full random scramble, all characters change every 50ms
  - Phase 2 (after `duration` ms): resolve characters left-to-right at ~100ms per character
- Resolution is math-driven: `resolvedCount = Math.min(Math.floor((elapsed - duration) / 100) + 1, len)` — no mutable ref tracking needed for resolved positions
- `useRef` for interval ID (`ReturnType<typeof setInterval>`) and start timestamp — avoids stale closures in `setInterval` callback
- `prefers-reduced-motion` checked inside `useEffect` — hooks called unconditionally, early return skips animation
- Empty target text (len=0) handled as early return with empty string display
- Cleanup: `clearInterval` in useEffect return — prevents leaked timers on unmount or targetText change
- `bun run build` passes cleanly (tsc -b && vite build) — 18 modules, 208KB JS (64KB gzip)

## NeuralMesh Canvas Component

- Created `src/canvas/NeuralMesh.tsx` — pure Canvas 2D background component (no Three.js, no WebGL)
- 65 nodes generated randomly within canvas bounds at mount and on resize (debounced 300ms)
- Animation loop via `requestAnimationFrame`: mouse force → velocity damping (0.95) → position update → toroidal boundary wrap → connection/edge drawing → node rendering
- Mouse attraction: nodes within 200px pulled with inverse-distance force `((200 - dist) / 200) * 0.03`
- Connection lines: drawn between nodes within 150px, opacity `(1 - dist/150) * 0.15` — fades with distance
- Node colors: `rgba(0, 112, 243, 0.4)` for nodes, `rgba(0, 112, 243, ${opacity})` for connections — matches `--accent: #0070f3`
- HiDPI support: `canvas.width = offsetWidth * dpr`, `canvas.height = offsetHeight * dpr`, then `ctx.scale(dpr, dpr)` — all drawing in CSS pixel coordinates
- `prefers-reduced-motion`: skips RAF loop, draws static frame once, no mousemove listener — resize still regenerates nodes and redraws statically
- `useRef` over `useState` for nodes, mouse, animation frame ID — prevents render loops on every frame
- Extracted `generateNodes()` and `drawFrame()` as pure functions — reused for static render and animation loop
- Component renders `<canvas className="absolute inset-0 w-full h-full" aria-hidden="true" />` — transparent, fills parent
- TypeScript strict mode: `canvas` from `canvasRef.current` must be re-guarded inside `animate()` (hoisted function declaration doesn't inherit outer narrowing)
- `useCallback` used for `handleMouseMove` (stable reference, only depends on refs) and `setupCanvas` (canvas sizing + node generation)
- No unused imports/variables — `noUnusedLocals: true` and `noUnusedParameters: true` satisfied
- Build: `tsc -b && vite build` passes — 19 modules (was 18 before NeuralMesh)

## Expertise Section Component

- Created `src/components/expertise/Expertise.tsx` — default export, bento-grid layout
- Uses `useInView` from framer-motion with `once: true` for scroll-into-view detection (no manual `window.innerHeight` math)
- `SkillCard` inner component: wraps each skill in `motion.div` with staggered entry (`index * 0.05` delay), SvgBorder animation, useMagnetic hover effect, and AnimatePresence terminal output reveal
- Terminal hover: small `<div>` with `font-mono`, dark surface bg, 1px border, `&gt;` prefix in accent color — 3 command output lines per skill from `portfolioData`
- Section: `id="expertise"`, `px-6 py-24 md:py-32`, `bg-[var(--bg)]`, max-width constrained to `var(--max-width)`
- Bento grid: `md:grid-cols-2` for 2-column layout at ≥768px, single column below
- Each column: heading + subtitle + `grid grid-cols-1 sm:grid-cols-2 gap-3` for skill cards
- Section title "Expertise" uses `motion.h2` with fade-in on scroll
- `bun run build` passes — `tsc -b && vite build` with 0 errors

## T19 — Navigation Component

- Created `src/components/Navigation.tsx` — fixed right-side dot navigation
- Uses `useLenis()` from `LenisProvider` (returns `Lenis | null`) for smooth scroll via `lenis.scrollTo('#sectionId')`
- Active section detection via scroll listener + `getBoundingClientRect()` — checks if section center is at viewport center
- Sections: Hero, Expertise, Projects, Contact
- Inactive labels: `var(--text-muted)`, hover: `var(--text-primary)`, active: `var(--accent)`
- Dots: `var(--border)` default → `var(--accent)` + `scale-125` when active
- `RefObject<HTMLElement | null>` needed for `useMagnetic` hook — React 19 strict types produce `RefObject<T | null>` from `useRef<T>(null)`

## T9 — Shared UI Components (MagneticWrapper, CurtainReveal, SectionTransition)

- **MagneticWrapper.tsx**: Thin wrapper around `useMagnetic` hook. Uses `useRef<HTMLDivElement>`, passes it to `useMagnetic(ref, options)`, renders `<motion.div>` with `style={magneticStyle}` (x/y MotionValues auto-applied as transforms). `className="inline-block"` prevents full-width stretching.
- **CurtainReveal.tsx**: `clipPath` animation via framer-motion — hidden = `inset(0 0 100% 0)`, visible = `inset(0 0 0% 0)`. Uses `initial={false}` to prevent mount animation. Easing: `[0.76, 0, 0.24, 1]` (expo-ish curve). Listens to `prefers-reduced-motion` changes via `matchMedia` event listener — falls back to opacity toggle when reduced.
- **SectionTransition.tsx**: Combines `useInView` (margin: '-20%', once: true) with `CurtainReveal`. Wraps in `<section>` with optional `id` prop. Triggers curtain reveal when section enters viewport (20% before it crosses the bottom edge).
- Build: `bun run build` passes — 18 modules, 208KB JS (64KB gzip), 10KB CSS.

## T10 — Hero Section ("The Boot Sequence")

- Created `src/components/hero/Hero.tsx` — default export, full-viewport landing section
- Three visual layers: NeuralMesh canvas → vignette gradient overlay → centered foreground
- Sequence: name (useCipherText, 3s) → subtitle (useCipherText, 3s after 3.5s delay) → bio (fade in, 0.8s after 7s delay)
- Subtitle uses conditional text: passes `""` to `useCipherText` initially, swaps to real text via `useState` toggle at 3500ms. Hook re-runs its effect when `targetText` changes from empty → populated
- Scroll indicator: animated chevron SVG with `motion.div` y-loop (`[0, 8, 0]`, infinite), fades out via Lenis `lenis.on('scroll')` event when scroll > 60px
- Vignette: `radial-gradient(ellipse at center, transparent 30%, var(--bg) 85%)` in absolutely positioned overlay div, `pointer-events-none`
- All colors via CSS variables: `var(--bg)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
- Text shadow on name: `0 0 80px rgba(0, 112, 243, 0.15)` — subtle accent glow referencing `--accent` hex without hardcoding variable in textShadow
- Build: `bun run build` (tsc -b && vite build) passes — 18 modules, 208KB JS (64KB gzip)
- Key pattern: always-render subtitle paragraph with `minHeight: '2rem'` to prevent layout jump when cipher text changes length
- `useLenis()` returns `Lenis | null` — must guard with `if (!lenis) return` before subscribing to events
- Lenis v1.3 `on('scroll', callback)` passes `{ scroll: number }` — TypeScript can't infer from string event name, requires inline type annotation

## ParallaxBackground Component

- Created `src/components/ParallaxBackground.tsx` — fixed-position background with grid lines and code snippet parallax layers
- Uses `useScroll` from framer-motion with `target: containerRef` — fixed-position container tracks its viewport intersection
- Two parallax layers: grid lines at 0.3x speed (`['0%', '20%']`), code snippets at 0.15x speed (`['0%', '10%']`)
- Grid: CSS `backgroundImage` with `linear-gradient` for horizontal/vertical lines, `rgba(255,255,255,0.03)` opacity, 80px grid spacing
- Code snippets: 7 scattered monospace strings (`font-mono` → Geist Mono), positioned absolutely at varied `top`/`left` percentages, `opacity: 0.12`, `color: var(--text-muted)`
- `prefers-reduced-motion`: renders static — passes `0` instead of `useTransform` MotionValue to disable parallax movement
- Container: `position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden` — full-viewport backdrop, no interaction blocking
- Cannot use two `style` props on one `motion.div` — grid pattern extracted into child `<div>` with static styles
- Export as default — consumed by parent page layout
- Build: `bun run build` passes — 18 modules, 208KB JS (64KB gzip), same count since component not yet imported in App.tsx

## Footer Component ("The Shutter CTA")

- Created `src/components/footer/Footer.tsx` — full-viewport contact section with scroll-scaled CTA and ink-drop mailto button
- Uses `useScroll` with `target: sectionRef` and `offset: ['start start', 'end end']` for full-section scroll tracking — scale ranges from 0.98 (top) to 1.05 (bottom)
- `useTransform(scrollYProgress, [0, 1], [0.98, 1.05])` → applied conditionally with `reducedMotion ? 1 : scale` for prefers-reduced-motion compliance
- `useInkDrop(handleMailto)` returns `{ trigger, InkDropOverlay }` — `trigger(e)` starts 600ms ripple animation, hook's `onAnimationComplete` calls `handleMailto` which sets `window.location.href = mailto:...`
- `InkDropOverlay` rendered as first child of section for proper fixed-position z-index layering (z-9999 via hook)
- `handleMailto` is the onComplete callback — NOT called directly from onClick; onClick only calls `trigger(e)` to keep the ink-drop sequence intact
- Button wrapped in `MagneticWrapper` from `../ui/MagneticWrapper` (default export) — provides magnetic hover via `useMagnetic` hook
- Button styling: `bg-[var(--surface)]` default, `hover:bg-[var(--accent)]` accent — `border-[var(--border)]` outlined, `rounded-[var(--radius-md)]`, `transition-colors duration-300`
- Background: `linear-gradient(to bottom, var(--bg) 0%, #000000 100%)` fading to pure black + subtle grid at `opacity: 0.03` with 80px spacing
- `prefers-reduced-motion`: `useMemo` with SSR-safe `typeof window` guard (matching `useMagnetic` pattern) — static scale (1), ripple skipped internally by `useInkDrop` (calls `onComplete` directly)
- CTA text: `font-mono font-bold` with `fontSize: 'clamp(2.5rem, 6vw, 5rem)'` for fluid scaling, `select-none` prevents text selection during scroll
- All colors via CSS variables: `var(--text-primary)`, `var(--surface)`, `var(--border)`, `var(--accent)`, `var(--radius-md)`, `var(--bg)`
- Email sourced from `portfolioData.email` — placeholder `'YOUR_EMAIL_HERE'` until user replaces
- Build: `tsc -b && vite build` passes — 18 modules, 208KB JS (64KB gzip)
- Key pattern: background gradient uses inline style for non-variable `#000000` (pure black is intentionally hardcoded as the terminal color), all other colors via CSS variables

## Projects Section — Horizontal Scroll ("The Horizontal Momentum")

- Created `src/components/projects/Projects.tsx` — default export, pinned horizontal scroll section
- Outer section: `height: 300vh`, `position: relative` — provides 200vh of scroll room (300vh - 100vh pinned)
- Sticky container: `position: sticky; top: 0; height: 100vh; overflow: hidden` — pins during horizontal scroll
- `useScroll({ target: containerRef, offset: ['start start', 'end end'] })` — maps scroll over full section
- `useTransform(scrollYProgress, [0, 1], ['0%', '-66.67%'])` — for 3 projects, translates -66.67% of container width
- `willChange: 'transform'` on the motion.div wrapper for GPU acceleration — no native overflow-x scroll used
- Three data viz sub-components (all inline SVG, no charting libraries):
  - **LineChartViz**: `<motion.path>` with `pathLength` animation (0→1), staggered circle data points, subtle area fill fading to 6% opacity
  - **NodeGraphViz**: 6 nodes + 8 edges — edges draw with `pathLength`, nodes scale in with staggered delay, inner accent dots fade in last
  - **BarChartViz**: 5 bars with `height` + `y` dual animation growing from baseline, spring-like ease `[0.34, 1.56, 0.64, 1]`, horizontal guide lines fade in staggered
- All viz colors use `var(--accent)` and `var(--border)` CSS variables — zero hardcoded hex values
- Each ProjectCard: `minWidth: 80vw`, `height: 80vh`, `useMagnetic` on cardRef (strength 0.08, radius 200), `useInView` for entrance animation
- Card content: category overline, title (h3), subtitle, description, tech stack tags (`.bento-card` style chips), metrics with accent dots, data viz at bottom-right
- Progress dots: 3 dots with `useSpring`-smoothed scroll progress → per-dot opacity via `useTransform` with 3-point bezier-like mapping
- Build: `bun run build` (tsc -b && vite build) passes — 18 modules, 208KB JS (64KB gzip)
- Key pattern: Framer Motion `pathLength` on SVG `<motion.path>` auto-handles `stroke-dasharray`/`stroke-dashoffset` — no manual path length calculation needed
- Bar chart grow-up trick: animate both `height` (0→target) and `y` (base→base-target) simultaneously so bars appear to rise from baseline

## T18 — App.tsx Assembly

- Replaced null-returning `App` with full page composition
- 6 default imports: Hero, Expertise, Projects, Footer, Navigation, ParallaxBackground
- Render order: ParallaxBackground (z-index: 0) → Navigation (z-50) → main > sections (Hero#hero, Expertise#expertise, Projects#projects, Footer#contact)
- No additional LenisProvider — already wraps App in main.tsx
- No SectionTransition wrapper — each section has its own scroll-based animation triggers
- No extra sections, no routing, no inline styles
- `bun run build` passes: tsc -b && vite build — 431 modules, 372KB JS (118KB gzip), 16KB CSS (4KB gzip)

## T19 - Performance Optimization (Lazy Loading + Canvas + Fonts)

### What was done
1. **Lazy loaded below-fold sections** (Expertise, Projects, Footer) via `React.lazy` + `Suspense` with `fallback={null}`
   - Hero stays eager-loaded (critical above-fold)
   - Navigation and ParallaxBackground stay eager (always visible/interactive)
   - Build output confirms separate chunks: `Footer-*.js` (2.5kB), `Expertise-*.js` (3.6kB), `Projects-*.js` (6.1kB)
   
2. **Canvas optimization** in `NeuralMesh.tsx`:
   - Node count is now dynamic: 35 on mobile (< 768px), 65 on desktop
   - Added `willChange: 'transform'` style on canvas element for GPU layer promotion
   - Mousemove is already using RAF-based throttle via animate loop — no change needed

3. **Font loading** in `index.html`:
   - Added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`
   - Added Google Fonts stylesheet for Inter (400,500,600,700) + Geist Mono (400,500,700) with `display=swap`
   - Font preconnect is a critical render optimization

4. **Lenis**: `syncTouch: false` already configured in `LenisProvider.tsx`

### Build verification
- `bun run build` passes cleanly (tsc + vite)
- No broken imports, no type errors
- Lazy chunks are generated correctly

## T20 — SEO Meta Tags, Favicon & Robots.txt

- `index.html` updated with comprehensive `<head>` meta tags: title, description, OG (title/description/type/url/image), Twitter Card (card/title/description), canonical URL, robots meta, favicon link
- Existing T19 font preconnect/preload links preserved — no duplication
- `public/robots.txt` created — allows all crawlers, references `sitemap.xml` (placeholder)
- `public/favicon.svg` created — dark rounded rect bg (`#111111`) with accent `#0070F3` "FA" monogram text
- Placeholder URLs (`fatlindazemi.com`) and OG image path marked as TODOs in source
- Print stylesheet already existed in `src/index.css` (from a previous task) — no changes needed
- `bun run build` passes — 432 modules, 395KB JS (124KB gzip), 17KB CSS (4KB gzip)
- Vite auto-copies `public/` files to `dist/` root on build — verified `public/robots.txt` and `public/favicon.svg` are served at `/robots.txt` and `/favicon.svg`

## T21 — Responsive & Accessibility Pass

### Global CSS (`src/index.css`)
- Added `:focus-visible` global styles: 2px solid `var(--accent)` outline, 3px offset, `var(--radius-sm)` rounding
- Added `@media (prefers-reduced-motion: reduce)` global override: all animations/transitions forced to 0.01ms, iteration count = 1
- Added `@media print` stylesheet: white background, black text, hides canvas/aria-hidden/fixed/nav elements, section break-inside avoid

### Navigation (`src/components/Navigation.tsx`)
- Made responsive: mobile = horizontal bottom bar (`fixed bottom-6 left-1/2 -translate-x-1/2 flex-row`), desktop = vertical right side (`sm:right-6 sm:top-1/2 sm:flex-col`)
- Labels hidden on mobile (`hidden sm:inline`), only dots visible for compact nav
- Added `focus-visible:outline-2 focus-visible:outline-[var(--accent)]` to nav buttons
- Already had `role="navigation"` and `aria-label="Section navigation"` and `aria-current` — verified correct
- Dots slightly larger on mobile (`w-2.5 h-2.5` vs previous `w-2 h-2`) for better touch targets

### Expertise (`src/components/expertise/Expertise.tsx`)
- Fixed heading hierarchy: subsection titles changed from `<h2>` to `<h3>` (section title remains `<h2>`)
- Added `role="list"` to skill grid containers
- Added `role="listitem"` to SkillCard motion.div elements
- Made SkillCard keyboard-accessible: `tabIndex={0}`, `onFocus`/`onBlur` handlers reveal terminal output same as hover, `focus-visible:outline-*` classes

### Projects (`src/components/projects/Projects.tsx`)
- Added visually hidden `<h2 id="projects-heading">Projects</h2>` with `aria-labelledby="projects-heading"` on section
- Made project cards keyboard-focusable: `tabIndex={0}`, `role="region"`, `aria-label="Project: {title}"`, `focus-visible:outline-*` classes
- Replaced `aria-hidden="true"` on all 3 data viz SVGs with `role="img"` + `aria-label` + `<title>` for descriptive accessibility

### Footer (`src/components/footer/Footer.tsx`)
- Added `focus-visible:outline-2 focus-visible:outline-[var(--accent)]` to the CTA button

### What was verified but needed no changes
- Hero's NeuralMesh canvas: already has `aria-hidden="true"` (correct for decorative background)
- Hero's chevron SVG: already has `aria-hidden="true"` (correct)
- Single `<h1>` on page: Hero's name heading is the only h1 — verified
- Expertise section's `<h2>` "Expertise" is the only h2 section title — correct
- `prefers-reduced-motion` already handled in individual hooks (useMagnetic, useInkDrop, useCipherText, NeuralMesh) — the CSS global rule is the safety net
- Hero text uses `clamp()` for responsive sizing — already fluid
- Expertise grid uses `grid-cols-1 md:grid-cols-2` — responsive by design

### Build verification
- `bun run build` passes cleanly (tsc -b && vite build) — 432 modules, 17KB CSS, ~395KB JS
