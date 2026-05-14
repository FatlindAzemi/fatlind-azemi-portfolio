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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      role="navigation"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={`Scroll to ${label}`}
          aria-current={activeSection === id ? 'true' : undefined}
        >
          <span
            className={`text-xs font-mono transition-colors duration-300 ${
              activeSection === id
                ? 'text-[var(--accent)]'
                : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
            }`}
          >
            {label}
          </span>
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
