/**
 * Documented exceptions for the automated checks.
 *
 * Every entry here is a KNOWN, ACCEPTED deviation — never add one silently.
 * Keeping them in code means a new regression still fails the suite while an
 * accepted one stays green and stays visible in review.
 */

/** Interactive controls allowed to be smaller than 24x24 (WCAG 2.5.8). */
export const ACCEPTED_SMALL_TARGETS: { name: string; why: string }[] = [
  {
    name: 'Nach oben',
    why: 'Footer "back to top" control; inline text target, WCAG 2.5.8 inline/spacing exception.',
  },
  {
    name: 'Back to top',
    why: 'Footer "back to top" control (EN); inline text target, WCAG 2.5.8 inline/spacing exception.',
  },
  {
    name: 'Impressum',
    why: 'Footer legal text link; inline text target, WCAG 2.5.8 inline exception.',
  },
  {
    name: 'Imprint',
    why: 'Footer legal text link (EN); inline text target, WCAG 2.5.8 inline exception.',
  },
  {
    name: 'Datenschutz',
    why: 'Footer legal text link; inline text target, WCAG 2.5.8 inline exception.',
  },
  {
    name: 'Privacy',
    why: 'Footer legal text link (EN); inline text target, WCAG 2.5.8 inline exception.',
  },
  {
    name: 'Scrollen',
    why: 'Hero scroll cue; inline text target, WCAG 2.5.8 inline exception.',
  },
  {
    name: 'Scroll',
    why: 'Hero scroll cue (EN); inline text target, WCAG 2.5.8 inline exception.',
  },
]

/**
 * axe violations accepted because the tool cannot evaluate them here.
 * `target` is matched against an axe node target string.
 */
export const ACCEPTED_VIOLATIONS: { id: string; target: RegExp; why: string }[] = [
  {
    id: 'color-contrast',
    target: /btn-(primary|ghost)/,
    why:
      'Hero CTAs sit over an animated/parallax background that axe cannot sample; ' +
      'measured computed contrast is rgb(11,11,13) on rgb(244,245,247) (~18:1) and ' +
      'light-on-dark for the ghost variant. Verified manually.',
  },
]
