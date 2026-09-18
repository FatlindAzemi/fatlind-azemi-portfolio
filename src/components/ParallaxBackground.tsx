import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function ParallaxBackground() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-0 -top-[15%] h-[90vh]"
        style={{ y: reduceMotion ? 0 : glowY }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(55% 50% at 50% 0%, rgba(79,134,255,0.13), transparent 72%)',
          }}
        />
      </motion.div>

      <div
        className="absolute inset-x-0 top-[55%] h-[70vh]"
        style={{
          background:
            'radial-gradient(45% 50% at 85% 50%, rgba(79,134,255,0.07), transparent 70%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 85% at 50% 45%, transparent 45%, var(--bg) 100%)',
        }}
      />
    </div>
  )
}
