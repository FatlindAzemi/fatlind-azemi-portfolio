import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  // Always start `false` so the prerendered (server) markup and the first
  // client render agree — otherwise hydration mismatches on every desktop
  // viewport. The effect syncs the real value right after mount.
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
