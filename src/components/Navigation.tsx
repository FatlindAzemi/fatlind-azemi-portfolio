import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LanguageSwitch from './ui/LanguageSwitch'
import { MailIcon } from './ui/Icons'
import { useLenis } from './LenisProvider'
import { useI18n } from '../i18n/LanguageProvider'
import { buildMailto } from '../utils/contact'

const spyIds = ['hero', 'expertise', 'projects', 'contact'] as const

export default function Navigation() {
  const lenis = useLenis()
  const { t, data } = useI18n()
  const [active, setActive] = useState<string>('hero')
  const [condensed, setCondensed] = useState(false)

  const links = [
    { id: 'expertise', label: t.nav.expertise },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ]

  const goTo = useCallback(
    (id: string) => {
      const target = `#${id}`
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4 })
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [lenis],
  )

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setCondensed(window.scrollY > 24)

      const line = window.innerHeight * 0.38
      let current: string = spyIds[0]
      for (const id of spyIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        condensed
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-2 md:h-[4.5rem] md:gap-4">
        <button
          type="button"
          onClick={() => goTo('hero')}
          className="group flex shrink-0 cursor-pointer items-center"
          aria-label={t.nav.backToTop}
        >
          <img
            src="/logo.svg"
            alt=""
            width={899}
            height={131}
            className="h-5 w-auto opacity-90 transition-opacity group-hover:opacity-100 sm:h-[1.55rem] lg:h-[1.75rem]"
          />
        </button>

        <nav
          aria-label={t.nav.sections}
          className="hidden items-center gap-1 md:flex"
        >
          {links.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              aria-current={active === id ? 'true' : undefined}
              className={`relative cursor-pointer rounded-full px-3.5 py-2 text-sm transition-colors ${
                active === id
                  ? 'text-[var(--text)]'
                  : 'text-[var(--text-2)] hover:text-[var(--text)]'
              }`}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-[var(--accent)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />

          <a
            href={buildMailto(data.email, t.mail)}
            aria-label={t.nav.getInTouch}
            className="btn btn-ghost h-10 min-h-0 w-10 shrink-0 px-0 sm:w-auto sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">{t.nav.getInTouch}</span>
            <MailIcon className="sm:hidden" width={17} height={17} />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
