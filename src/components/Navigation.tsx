import { useState, useEffect, useCallback } from 'react'
import { useLenis } from '../components/LenisProvider'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export default function Navigation() {
  const lenis = useLenis()
  const [activeSection, setActiveSection] = useState<string>('hero')

  const handleClick = useCallback(
    (sectionId: string) => {
      lenis?.scrollTo(`#${sectionId}`)
    },
    [lenis],
  )

  useEffect(() => {
    const handleScroll = () => {
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      role="navigation"
      aria-label="Section navigation"
      className="fixed z-50 flex gap-4
        bottom-6 left-1/2 -translate-x-1/2 flex-row
        sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:left-auto sm:bottom-auto sm:translate-x-0 sm:flex-col"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className="group flex items-center gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 rounded-[var(--radius-sm)]"
          aria-label={`Scroll to ${label}`}
          aria-current={activeSection === id ? 'true' : undefined}
        >
          <span
            className={`text-xs font-mono transition-colors duration-300 hidden sm:inline ${
              activeSection === id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
            }`}
          >
            {label}
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === id
                ? 'bg-[var(--accent)] scale-125'
                : 'bg-[var(--border)] group-hover:bg-[var(--text-muted)]'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
