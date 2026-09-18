import { useReducedMotion } from './useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Entrance animation for content that reveals on scroll or on mount.
 *
 * Keep this on the slow side. EASE is a quintic ease-out and front-loads hard:
 * measured in the browser it is ~45% done after the first 100ms and ~78% after
 * 200ms, so the rest of a 0.7s reveal is one long settle. Shorten the duration
 * and that settle collapses — the reveal still fades, but it reads as a pop.
 * When the user prefers reduced motion the element starts at its final state,
 * so nothing animates at all.
 */
export function useReveal(distance = 24) {
  const reducedMotion = useReducedMotion()

  return {
    reducedMotion,
    initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: EASE,
    },
  }
}
