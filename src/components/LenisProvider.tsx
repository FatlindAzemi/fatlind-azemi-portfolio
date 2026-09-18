import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      syncTouch: false,
    })

    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    let rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
