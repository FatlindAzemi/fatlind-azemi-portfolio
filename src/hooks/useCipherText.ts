import { useState, useEffect, useRef } from 'react'

interface CipherOptions {
  duration?: number
  charset?: string
  /** Holds the scramble until this flips true — e.g. once the text scrolls into view. */
  active?: boolean
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

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

  // Start scrambled so the resolved text never flashes for a frame before the
  // effect takes over.
  const [displayText, setDisplayText] = useState<string>(() =>
    buildScrambledText(targetText.length, charset),
  )
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
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
      const resolvedCount = Math.min(Math.floor(resolveElapsed / 100) + 1, len)

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
