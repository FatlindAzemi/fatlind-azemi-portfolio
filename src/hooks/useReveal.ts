import { useReducedMotion } from './useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Entrance animation for content that reveals on scroll or on mount.
 *
 * Travel is kept short and the duration brief so the reveal reads as a fade
 * rather than a pop. When the user prefers reduced motion the element starts
 * at its final state, so nothing animates at all.
 */
export function useReveal(distance = 8) {
  const reducedMotion = useReducedMotion()

  return {
    reducedMotion,
    initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    transition: {
      duration: reducedMotion ? 0 : 0.3,
      ease: EASE,
    },
  }
}
