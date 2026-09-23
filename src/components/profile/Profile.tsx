import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { useI18n } from '../../i18n/LanguageProvider'
import { useReveal } from '../../hooks/useReveal'

export default function Profile() {
  const { t, data } = useI18n()
  const { initial, transition } = useReveal()
  const paragraphs = data.bio.slice(1)

  return (
    <section
      id="profile"
      className="relative"
      style={{ paddingBlock: 'var(--section-y)' }}
    >
      <div className="shell">
        <SectionHeader eyebrow={t.profile.eyebrow} title={t.profile.title} />

        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={paragraph}
              className="text-[0.95rem] leading-[1.7] text-[var(--text-2)] lg:text-base lg:leading-[1.75]"
              initial={initial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ ...transition, delay: i * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
