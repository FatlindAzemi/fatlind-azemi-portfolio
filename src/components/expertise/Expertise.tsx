import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../../i18n/LanguageProvider'
import SectionHeader from '../ui/SectionHeader'
import type { Certification, ExpertiseCategory, Skill } from '../../types'

function Certifications({
  items,
  label,
}: {
  items: Certification[]
  label: string
}) {
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-x-5 sm:gap-x-7">
        {items.map((cert) => (
          <div
            key={cert.name}
            className="flex max-w-[11rem] flex-col items-center gap-4 text-center"
          >
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] p-3 lg:h-[7.5rem] lg:w-[7.5rem] lg:p-3.5">
              <img
                src={cert.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-mono text-[0.72rem] text-[var(--text-2)] lg:text-[0.8rem]">
                {cert.issuer}
              </span>
              <span className="font-mono text-[0.64rem] leading-snug text-[var(--text-3)] lg:text-[0.72rem]">
                {cert.name}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillButton({
  skill,
  index,
  isActive,
  onActivate,
}: {
  skill: Skill
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={isActive}
      className={`group flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border px-3.5 py-3 text-left transition-all duration-200 ${
        isActive
          ? 'border-[var(--accent-line)] bg-[var(--accent-soft)]'
          : 'border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-2)] hover:bg-[var(--surface-3)]'
      }`}
    >
      <span
        className={`font-mono text-[0.62rem] transition-colors ${
          isActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className={`text-sm transition-colors ${
          isActive ? 'text-[var(--text)]' : 'text-[var(--text-2)] group-hover:text-[var(--text)]'
        }`}
      >
        {skill.name}
      </span>
    </button>
  )
}

function Console({ skill }: { skill: Skill }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[#0a0a0c]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#2f2f36]" />
        <span className="h-2 w-2 rounded-full bg-[#2f2f36]" />
        <span className="h-2 w-2 rounded-full bg-[#2f2f36]" />
        <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--text-3)]">
          {skill.name}
        </span>
      </div>
      <div className="no-scrollbar flex h-[15.5rem] flex-col gap-1.5 overflow-y-auto p-4 font-mono text-[0.7rem] leading-relaxed min-[360px]:h-[13.25rem] sm:h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex flex-col gap-1"
          >
            <p className="break-words text-[var(--text-3)]">
              <span className="text-[var(--accent)]">$</span>{' '}
              {skill.terminalCommand}
            </p>
            {skill.terminalOutput?.map((line) => (
              <p key={line} className="break-words text-[var(--text-2)]">
                {line}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function CategoryCard({
  category,
  delay,
}: {
  category: ExpertiseCategory
  delay: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = category.skills[activeIndex]

  return (
    <motion.div
      className="card flex flex-col p-6 md:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl text-[var(--text)] md:text-[1.35rem]">
            {category.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-2)]">
            {category.subtitle}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[0.62rem] text-[var(--text-3)]">
          {String(category.skills.length).padStart(2, '0')}
        </span>
      </div>

      <div className="hairline my-7" />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {category.skills.map((skill, i) => (
          <SkillButton
            key={skill.name}
            skill={skill}
            index={i}
            isActive={i === activeIndex}
            onActivate={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <Console skill={active} />
    </motion.div>
  )
}

export default function Expertise() {
  const { t, data } = useI18n()

  return (
    <section
      id="expertise"
      className="relative"
      style={{ paddingBlock: 'var(--section-y)' }}
    >
      <div className="shell">
        <SectionHeader
          eyebrow={t.expertise.eyebrow}
          title={t.expertise.title}
          description={t.expertise.description}
          aside={
            <Certifications
              items={data.certifications}
              label={t.expertise.certified}
            />
          }
          asideLayout="rail"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {data.expertise.map((category, i) => (
            <CategoryCard
              key={category.title}
              category={category}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
