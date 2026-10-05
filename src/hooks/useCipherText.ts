import { useState, useEffect, useLayoutEffect, useRef } from 'react'

interface CipherOptions {
  duration?: number
  charset?: string
  /** Holds the scramble until this flips true, e.g. once the text scrolls into view. */
  active?: boolean
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

// How long each character takes to lock in once the scramble phase is over.
// This dominates the perceived length of the effect (13 chars = 13 steps), so
// it has to move together with `duration`.
const RESOLVE_MS_PER_CHAR = 50

// On the server there is no layout phase (and React warns about useLayoutEffect
// during SSR), so fall back to useEffect there.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

function getRandomChar(charset: string): string {
  return charset[Math.floor(Math.random() * charset.length)]
}

function buildScrambledText(length: number, charset: string): string {
  return Array.from({ length }, () => getRandomChar(charset)).join('')
}

export function useCipherText(targetText: string, options?: CipherOptions): string {
  const {
    duration = 3000,
    charset = DEFAULT_CHARSET,
    active = true,
  } = options ?? {}

  // Start RESOLVED so the prerendered HTML contains the real name (crawlable)
  // and the first client render matches it (hydration). The scramble starts in
  // a layout effect below — before paint — so the resolved text never flashes.
  const [displayText, setDisplayText] = useState<string>(targetText)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  useIsomorphicLayoutEffect(() => {
    if (!active) return

    const len = targetText.length

    if (len === 0) {
      setDisplayText('')
      return
    }

    startTimeRef.current = Date.now()
    setDisplayText(buildScrambledText(len, charset))

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current

      if (elapsed < duration) {
        setDisplayText(buildScrambledText(len, charset))
        return
      }

      const resolveElapsed = elapsed - duration
      const resolvedCount = Math.min(
        Math.floor(resolveElapsed / RESOLVE_MS_PER_CHAR) + 1,
        len,
      )

      let result = ''
      for (let i = 0; i < len; i++) {
        if (i < resolvedCount) {
          result += targetText[i]
        } else {
          result += getRandomChar(charset)
        }
      }

      setDisplayText(result)

      if (resolvedCount >= len) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, 50)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [targetText, duration, charset, active])

  return displayText
}
