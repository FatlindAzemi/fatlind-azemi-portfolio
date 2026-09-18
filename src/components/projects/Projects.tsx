import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { useI18n } from '../../i18n/LanguageProvider'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import DataViz from './DataViz'
import SectionHeader from '../ui/SectionHeader'
import type { Project } from '../../types'

const CARD_LAYOUT =
  'card flex flex-col overflow-hidden lg:grid lg:grid-cols-[1.05fr_0.95fr]'

function ProjectMeta({ project }: { project: Project }) {
  const { t } = useI18n()
  const label =
    project.category === 'data'
      ? t.projects.dataEngineering
      : t.projects.productDevelopment

  return (
    <>
      <span
        className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] ${
          project.category === 'data'
            ? 'text-[var(--accent)]'
            : 'text-[var(--text-3)]'
        }`}
      >
        {label}
      </span>
      <h3 className="mt-3.5 text-2xl text-[var(--text)] md:text-[1.75rem]">
        {project.title}
      </h3>
      <p className="mt-2.5 text-base text-[var(--text-2)]">{project.subtitle}</p>
      <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-[var(--text-3)]">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
    </>
  )
}

function Metrics({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid gap-2 border-t border-[var(--border)] pt-6">
      {items.map((metric) => (
        <li key={metric} className="flex items-start gap-2.5">
          <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[0.72rem] leading-relaxed text-[var(--text-2)]">
            {metric}
          </span>
        </li>
      ))}
    </ul>
  )
}

function VizPanel({
  project,
  trigger,
}: {
  project: Project
  trigger: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <div
      ref={ref}
      className="relative flex min-h-[13rem] flex-col items-center justify-center gap-5 overflow-hidden border-t border-[var(--border)] p-7 md:p-8 lg:border-t-0 lg:border-l"
      style={{
        background:
          'radial-gradient(120% 100% at 70% 0%, rgba(79,134,255,0.09), transparent 60%), var(--bg-soft)',
      }}
    >
      <span className="w-full max-w-[27rem] font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-3)] lg:max-w-[30rem]">
        {project.vizCaption}
      </span>
      <div className="w-full max-w-[27rem] lg:max-w-[30rem]">
        <DataViz kind={project.vizKind} trigger={inView && trigger} />
      </div>
    </div>
  )
}

function CardBody({
  project,
  trigger,
}: {
  project: Project
  trigger: boolean
}) {
  return (
    <>
      <div className="no-scrollbar flex flex-col justify-center overflow-y-auto p-7 md:p-9">
        <ProjectMeta project={project} />
        <Metrics items={project.metrics} />
      </div>
      <VizPanel project={project} trigger={trigger} />
    </>
  )
}

function PinnedCard({
  project,
  trigger,
}: {
  project: Project
  trigger: boolean
}) {
  return (
    <article
      className={`${CARD_LAYOUT} mr-6 h-full w-[var(--card-w)] shrink-0`}
    >
      <CardBody project={project} trigger={trigger} />
    </article>
  )
}

function StackedCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.article
      ref={ref}
      className={CARD_LAYOUT}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <CardBody project={project} trigger={inView} />
    </motion.article>
  )
}

export default function Projects() {
  const { t, data } = useI18n()
  const projects = data.projects
  const canPin = useMediaQuery('(min-width: 1024px) and (min-height: 700px)')
  const reduceMotion = useReducedMotion()
  const pinned = canPin && !reduceMotion

  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })

  const x = useMotionValue(0)

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (pinned) x.set(-progress * travel)
    const index = Math.round(progress * (projects.length - 1))
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, index)))
  })

  useEffect(() => {
    x.set(-scrollYProgress.get() * travel)
  }, [travel, x, scrollYProgress])

  useEffect(() => {
    if (!pinned) {
      setTravel(0)
      return
    }

    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setTravel(
        Math.max(0, track.scrollWidth - document.documentElement.clientWidth),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const header = (
    <SectionHeader
      eyebrow={t.projects.eyebrow}
      title={t.projects.title}
      description={t.projects.description}
    />
  )

  if (!pinned) {
    return (
      <section id="projects" style={{ paddingBlock: 'var(--section-y)' }}>
        <div className="shell">
          {header}
          <div className="grid gap-6">
            {projects.map((project, i) => (
              <StackedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects">
      <div
        className="shell"
        style={{ paddingTop: 'var(--section-y)', paddingBottom: '1rem' }}
      >
        {header}
      </div>

      <div ref={pinRef} style={{ height: `calc(100vh + ${travel}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="edge-fade flex min-h-0 flex-1 items-center pt-20">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex h-[min(620px,calc(100vh-8rem))] w-max items-stretch"
            >
              <div
                className="w-[var(--shell-inset)] shrink-0"
                aria-hidden="true"
              />
              {projects.map((project, i) => (
                <PinnedCard
                  key={project.id}
                  project={project}
                  trigger={i <= activeIndex}
                />
              ))}
              <div
                className="w-[calc(var(--shell-inset)-1.5rem)] shrink-0"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <div className="shell flex items-center gap-5 pb-9">
            <div className="flex flex-1 gap-2" aria-hidden="true">
              {projects.map((project, i) => (
                <motion.span
                  key={project.id}
                  className="h-[3px] flex-1 rounded-full bg-[var(--accent)]"
                  animate={{ opacity: i === activeIndex ? 1 : 0.16 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <p className="font-mono text-[0.72rem] text-[var(--text-3)]">
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="mx-1 opacity-50">/</span>
              {String(projects.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
