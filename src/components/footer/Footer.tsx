import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticWrapper from '../ui/MagneticWrapper'
import { useInkDrop } from '../../hooks/useInkDrop'
import { portfolioData } from '../../data/portfolio'

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.05])

  const handleMailto = () => {
    window.location.href = `mailto:${portfolioData.email}`
  }

  const { trigger, InkDropOverlay } = useInkDrop(handleMailto)

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, var(--bg) 0%, #000000 100%)',
      }}
    >
      {InkDropOverlay}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        style={{ scale: reducedMotion ? 1 : scale }}
        className="text-center relative z-10"
      >
        <h2
          className="font-mono font-bold text-[var(--text-primary)] select-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Initiate Connection
        </h2>
      </motion.div>

      <div className="relative z-10 mt-10">
        <MagneticWrapper>
          <button
            onClick={(e) => trigger(e)}
            className="px-8 py-4 font-mono text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
          >
            Open Channel
          </button>
        </MagneticWrapper>
      </div>
    </section>
  )
}
