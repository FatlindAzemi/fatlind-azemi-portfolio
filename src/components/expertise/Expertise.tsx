import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { portfolioData } from '../../data/portfolio'
import SvgBorder from '../ui/SvgBorder'
import { useMagnetic } from '../../hooks/useMagnetic'
import type { Skill } from '../../types'

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const magneticStyle = useMagnetic(ref)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const showDetail = isHovered || isFocused

  return (
    <motion.div
      ref={ref}
      style={magneticStyle}
      role="listitem"
      tabIndex={0}
      className="relative bento-card p-4 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <SvgBorder trigger={inView} />
      <h3 className="font-mono text-sm text-[var(--text-primary)]">{skill.name}</h3>
      <AnimatePresence>
        {showDetail && skill.terminalOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] font-mono text-xs text-[var(--text-secondary)] overflow-hidden"
          >
            {skill.terminalOutput.map((line, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="text-[var(--accent)]">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Expertise() {
  const [expertise1, expertise2] = portfolioData.expertise
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="px-6 py-24 md:py-32 bg-[var(--bg)]"
    >
      <div className="max-w-[var(--max-width)] mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Expertise
        </motion.h2>
        <motion.p
          className="text-[var(--text-secondary)] text-lg mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A versatile skill set spanning data engineering, cloud architecture, and modern application development.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
              {expertise1.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              {expertise1.subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {expertise1.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
              {expertise2.title}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              {expertise2.subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {expertise2.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
