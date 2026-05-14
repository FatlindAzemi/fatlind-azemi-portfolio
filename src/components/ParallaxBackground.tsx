import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Parallax speeds: grid at 0.3x, code snippets at 0.15x of scroll
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const codeY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setPrefersReduced(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  const codeSnippets = useMemo(
    () => [
      { text: 'SELECT * FROM events WHERE...', top: '15%', left: '5%' },
      { text: 'await fetch("/api/v2/analytics")', top: '35%', left: '75%' },
      { text: 'def process_data(batch):', top: '55%', left: '10%' },
      { text: 'terraform apply -auto-approve', top: '70%', left: '80%' },
      { text: 'spark-submit --master yarn', top: '25%', left: '50%' },
      { text: 'gcloud deploy --region europe', top: '85%', left: '30%' },
      { text: 'docker build -t api:latest .', top: '45%', left: '65%' },
    ],
    [],
  )

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Grid layer — thin lines, very low opacity */}
      <motion.div
        style={{ y: prefersReduced ? 0 : gridY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Code snippets layer — even deeper parallax */}
      <motion.div
        style={{ y: prefersReduced ? 0 : codeY }}
        className="absolute inset-0"
      >
        {codeSnippets.map((snippet, i) => (
          <span
            key={i}
            className="absolute font-mono text-xs whitespace-nowrap select-none"
            style={{
              top: snippet.top,
              left: snippet.left,
              color: 'var(--text-muted)',
              opacity: 0.15,
            }}
          >
            {snippet.text}
          </span>
        ))}
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, var(--bg) 100%)',
        }}
      />
    </div>
  )
}
