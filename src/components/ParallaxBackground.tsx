import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const codeY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setPrefersReduced(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  const codeSnippets = useMemo(
    () => [
      { text: 'SELECT * FROM events WHERE region = ?', top: '10%', left: '3%', size: 'text-xs' },
      { text: 'await fetch("/api/v2/analytics")', top: '30%', left: '78%', size: 'text-sm' },
      { text: 'def process_data(batch):', top: '50%', left: '5%', size: 'text-sm' },
      { text: 'terraform apply -auto-approve', top: '65%', left: '82%', size: 'text-xs' },
      { text: 'spark-submit --master yarn --num-executors 24', top: '20%', left: '52%', size: 'text-xs' },
      { text: 'gcloud deploy --region europe-west1', top: '80%', left: '25%', size: 'text-xs' },
      { text: 'docker build -t api:latest .', top: '42%', left: '68%', size: 'text-sm' },
      { text: 'import tensorflow as tf', top: '72%', left: '55%', size: 'text-xs' },
      { text: 'kubectl apply -f deployment.yaml', top: '15%', left: '88%', size: 'text-xs' },
      { text: 'npx vitest run --coverage', top: '58%', left: '35%', size: 'text-sm' },
      { text: 'dbt run --select marts/finance', top: '88%', left: '72%', size: 'text-xs' },
      { text: 'git push origin main --force-with-lease', top: '38%', left: '15%', size: 'text-sm' },
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
            className={`absolute font-mono ${snippet.size} whitespace-nowrap select-none`}
            style={{
              top: snippet.top,
              left: snippet.left,
              color: 'var(--text-muted)',
              opacity: 0.18,
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
