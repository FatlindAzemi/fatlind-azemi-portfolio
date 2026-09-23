import { useEffect } from 'react'
import Expertise from './components/expertise/Expertise'
import Footer from './components/footer/Footer'
import Hero from './components/hero/Hero'
import Navigation from './components/Navigation'
import ParallaxBackground from './components/ParallaxBackground'
import Projects from './components/projects/Projects'
import { useI18n } from './i18n/LanguageProvider'

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    const setVw = () =>
      document.documentElement.style.setProperty(
        '--vw',
        `${document.documentElement.clientWidth}px`,
      )
    setVw()
    window.addEventListener('resize', setVw)
    return () => window.removeEventListener('resize', setVw)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:border focus:border-[var(--border-2)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm"
      >
        {t.nav.skipToContent}
      </a>
      <ParallaxBackground />
      <Navigation />
      <main id="main">
        <Hero />
        <Expertise />
        <Projects />
        <Footer />
      </main>
    </>
  )
}
