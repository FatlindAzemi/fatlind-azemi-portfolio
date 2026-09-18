import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: string
  aside?: ReactNode
  asideLayout?: 'inline' | 'rail'
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  aside,
  asideLayout = 'inline',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const rail = asideLayout === 'rail'

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div
        className={
          rail
            ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16'
            : undefined
        }
      >
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <motion.p className="eyebrow mb-5" {...reveal(0)}>
                {eyebrow}
              </motion.p>
              <motion.h2
                className="text-[clamp(2rem,4.2vw,3.25rem)] text-[var(--text)]"
                {...reveal(0.06)}
              >
                {title}
              </motion.h2>
            </div>
            {aside && !rail && (
              <motion.div className="pb-2" {...reveal(0.12)}>
                {aside}
              </motion.div>
            )}
          </div>
          {description && (
            <motion.p className="lead mt-6" {...reveal(0.12)}>
              {description}
            </motion.p>
          )}
        </div>
        {aside && rail && (
          <motion.div className="mt-10 lg:mt-0" {...reveal(0.12)}>
            {aside}
          </motion.div>
        )}
      </div>
    </div>
  )
}
