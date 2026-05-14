import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeuralMesh from '../../canvas/NeuralMesh'
import { useCipherText } from '../../hooks/useCipherText'
import { useLenis } from '../LenisProvider'
import { portfolioData } from '../../data/portfolio'

export default function Hero() {
  const name = useCipherText(portfolioData.name, { duration: 3000 })
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showBio, setShowBio] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 3500)
    const t2 = setTimeout(() => setShowBio(true), 7000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    const onScroll = ({ scroll }: { scroll: number }) => {
      setHasScrolled(scroll > 60)
    }
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  const subtitle = useCipherText(
    showSubtitle ? portfolioData.title : '',
    { duration: 3000 },
  )

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <NeuralMesh />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, var(--bg) 85%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1
          className="font-mono font-bold text-center leading-none select-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            textShadow: '0 0 80px rgba(0, 112, 243, 0.15)',
          }}
        >
          {name}
        </h1>

        <p
          className="font-mono text-center mt-5 select-none"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--text-secondary)',
            minHeight: '2rem',
          }}
        >
          {subtitle}
        </p>

        <AnimatePresence>
          {showBio && (
            <motion.p
              key="hero-bio"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-8 max-w-xl text-center leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
                color: 'var(--text-muted)',
              }}
            >
              {portfolioData.bio[0]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            key="scroll-chevron"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 8, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 1.6,
                  ease: 'easeInOut',
                },
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
