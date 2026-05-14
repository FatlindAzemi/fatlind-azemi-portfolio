import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { portfolioData } from '../../data/portfolio'
import { useMagnetic } from '../../hooks/useMagnetic'
import type { Project } from '../../types'

function LineChartViz({ trigger }: { trigger: boolean }) {
  const points = [
    { x: 28, y: 82 },
    { x: 72, y: 62 },
    { x: 116, y: 68 },
    { x: 160, y: 46 },
    { x: 204, y: 26 },
    { x: 248, y: 14 },
  ]
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${d} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`

  return (
    <svg
      width="280"
      height="110"
      viewBox="0 0 280 110"
      fill="none"
      role="img"
      aria-label="Line chart visualization showing upward trend"
      className="w-full max-w-[280px]"
    >
      <title>Upward trending line chart</title>
      {[25, 50, 75].map((y) => (
        <line
          key={y}
          x1="16"
          y1={y}
          x2="272"
          y2={y}
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      ))}

      <motion.path
        d={areaD}
        fill="var(--accent)"
        initial={{ opacity: 0 }}
        animate={trigger ? { opacity: 0.06 } : {}}
        transition={{ duration: 1.5, delay: 0.6 }}
      />

      <motion.path
        d={d}
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={trigger ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={trigger ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 1.6 + i * 0.12 }}
        />
      ))}
    </svg>
  )
}

function NodeGraphViz({ trigger }: { trigger: boolean }) {
  const nodes = [
    { x: 40, y: 55, r: 8 },
    { x: 110, y: 25, r: 6 },
    { x: 180, y: 60, r: 9 },
    { x: 130, y: 80, r: 5 },
    { x: 220, y: 35, r: 7 },
    { x: 250, y: 75, r: 6 },
  ]
  const edges = [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 5],
    [3, 5],
    [4, 5],
  ]

  return (
    <svg
      width="280"
      height="110"
      viewBox="0 0 280 110"
      fill="none"
      role="img"
      aria-label="Node graph visualization showing connected data points"
      className="w-full max-w-[280px]"
    >
      <title>Connected node graph</title>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity={0.35}
          initial={{ pathLength: 0 }}
          animate={trigger ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={trigger ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.circle
          key={`inner-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r * 0.28}
          fill="var(--accent)"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 + i * 0.15 }}
        />
      ))}
    </svg>
  )
}

function BarChartViz({ trigger }: { trigger: boolean }) {
  const bars = [
    { x: 24, w: 34, h: 55 },
    { x: 72, w: 34, h: 82 },
    { x: 120, w: 34, h: 48 },
    { x: 168, w: 34, h: 92 },
    { x: 216, w: 34, h: 66 },
  ]
  const baseY = 98

  return (
    <svg
      width="280"
      height="110"
      viewBox="0 0 280 110"
      fill="none"
      role="img"
      aria-label="Bar chart visualization showing comparative data"
      className="w-full max-w-[280px]"
    >
      <title>Comparative bar chart</title>
      <line
        x1="12"
        y1={baseY}
        x2="272"
        y2={baseY}
        stroke="var(--border)"
        strokeWidth="0.5"
      />

      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x}
          width={bar.w}
          rx="3"
          fill="var(--accent)"
          fillOpacity={0.75 + i * 0.05}
          initial={{ height: 0, y: baseY }}
          animate={trigger ? { height: bar.h, y: baseY - bar.h } : {}}
          transition={{
            duration: 0.7,
            delay: 0.15 + i * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      ))}

      {[25, 50, 75].map((y, i) => (
        <motion.line
          key={y}
          x1="12"
          y1={baseY - y}
          x2="272"
          y2={baseY - y}
          stroke="var(--border)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
        />
      ))}
    </svg>
  )
}

function DataViz({
  type,
  trigger,
}: {
  type: Project['dataVizType']
  trigger: boolean
}) {
  switch (type) {
    case 'line-chart':
      return <LineChartViz trigger={trigger} />
    case 'node-graph':
      return <NodeGraphViz trigger={trigger} />
    case 'bar-chart':
      return <BarChartViz trigger={trigger} />
  }
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const magneticStyle = useMagnetic(cardRef, { strength: 0.08, radius: 200 })
  const inView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      role="region"
      aria-label={`Project: ${project.title}`}
      style={{
        ...magneticStyle,
        minWidth: '80vw',
        height: '80vh',
        padding: '0 5vw',
        display: 'flex',
        alignItems: 'center',
      }}
      className="focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
    >
      <motion.div
        className="bento-card p-6 md:p-10 w-full h-full flex flex-col justify-between overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-3">
            {project.category === 'data' ? 'Data Engineering' : 'Product Development'}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold font-mono text-[var(--text-primary)] mb-3 leading-tight">
            {project.title}
          </h3>

          <p className="text-[var(--text-secondary)] text-base md:text-lg mb-5 max-w-xl">
            {project.subtitle}
          </p>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-[var(--radius-sm)] bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <span className="text-xs text-[var(--text-secondary)] font-mono">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 self-end">
          <DataViz type={project.dataVizType} trigger={inView} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const projectCount = portfolioData.projects.length
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((projectCount - 1) / projectCount) * 100}%`],
  )

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  })

  const dot0 = useTransform(smoothProgress, [0, 0.25, 0.5], [1, 1, 0.25])
  const dot1 = useTransform(smoothProgress, [0.25, 0.5, 0.75], [0.25, 1, 0.25])
  const dot2 = useTransform(smoothProgress, [0.5, 0.75, 1], [0.25, 1, 1])
  const dotOpacities = [dot0, dot1, dot2]

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{ height: '300vh', position: 'relative' }}
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <motion.div
            style={{
              x,
              display: 'flex',
              width: 'max-content',
              willChange: 'transform',
            }}
          >
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
          }}
        >
          {dotOpacities.map((opacity, i) => (
            <motion.div
              key={i}
              style={{
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                opacity,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
