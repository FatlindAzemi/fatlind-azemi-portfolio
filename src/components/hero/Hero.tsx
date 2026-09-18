import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCipherText } from '../../hooks/useCipherText'
import { useReveal } from '../../hooks/useReveal'
import { useI18n } from '../../i18n/LanguageProvider'
import { ArrowDown, socialIconMap } from '../ui/Icons'
import { buildMailto } from '../../utils/contact'

const panelVerticalFade =
  'linear-gradient(to bottom, transparent 0%, #000 9%, #000 80%, transparent 100%)'

const panelHorizontalFade =
  'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.5) 7%, rgba(0, 0, 0, 0.92) 16%, #000 32%)'

const portraitVerticalFade =
  'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 4%, #000 17%, #000 70%, rgba(0, 0, 0, 0.5) 87%, transparent 100%)'

const portraitHorizontalFade =
  'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.6) 6%, #000 15%, #000 85%, rgba(0, 0, 0, 0.6) 94%, transparent 100%)'

export default function Hero() {
  const { t, data } = useI18n()
  const nameRef = useRef<HTMLHeadingElement>(null)
  // On mobile the name sits low in the hero, so the scramble would already be
  // over by the time it scrolls into view. Start it when it is actually seen.
  const nameInView = useInView(nameRef, { once: true })
  const name = useCipherText(data.name, { duration: 1100, active: nameInView })
  const { reducedMotion, initial, transition } = useReveal()

  const profileLinks = data.socialLinks.filter((link) => link.icon !== 'mail')

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView()
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[50%] -translate-y-1/2 lg:block"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        style={{
          maskImage: panelVerticalFade,
          WebkitMaskImage: panelVerticalFade,
        }}
      >
        <img
          src={data.portrait}
          alt=""
          className="h-[80vh] max-h-[46rem] min-h-[26rem] w-full object-cover object-top"
          style={{
            maskImage: panelHorizontalFade,
            WebkitMaskImage: panelHorizontalFade,
          }}
        />
      </motion.div>

      <div className="shell relative z-10 w-full py-16 sm:py-24">
        <div className="lg:max-w-[44%]">
          <motion.p
            className="eyebrow"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            {data.title}
          </motion.p>

          <motion.div
            className="mx-[calc(var(--gutter)*-1)] mt-7 lg:hidden"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.06 }}
            style={{
              maskImage: portraitVerticalFade,
              WebkitMaskImage: portraitVerticalFade,
            }}
          >
            <img
              src={data.portrait}
              alt={data.name}
              width={1024}
              height={1024}
              fetchPriority="high"
              className="mx-auto aspect-square w-full max-w-[26rem] object-cover object-top"
              style={{
                maskImage: portraitHorizontalFade,
                WebkitMaskImage: portraitHorizontalFade,
              }}
            />
          </motion.div>

          <h1
            ref={nameRef}
            className="display mt-7 overflow-hidden font-semibold whitespace-nowrap lg:mt-6"
            style={{ minHeight: '1.05em' }}
          >
            {name}
          </h1>

          <motion.p
            className="lead mt-6 lg:mt-7"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.12 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.p
            className="mt-3.5 max-w-xl text-[0.82rem] leading-[1.65] text-[var(--text-3)] lg:mt-4 lg:text-[0.95rem] lg:leading-relaxed"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.18 }}
          >
            {data.bio[0]}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-1.5 sm:gap-3 lg:mt-10"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.24 }}
          >
            <a
              href={buildMailto(data.email, t.mail)}
              className="btn btn-primary h-10 min-h-0 px-3 text-[0.875rem] sm:h-[2.9rem] sm:min-h-[2.9rem] sm:px-[1.35rem] sm:text-[0.9rem]"
            >
              {t.hero.getInTouch}
            </a>
            <button
              type="button"
              onClick={() => goTo('projects')}
              className="btn btn-ghost h-10 min-h-0 cursor-pointer px-3 text-[0.875rem] sm:h-[2.9rem] sm:min-h-[2.9rem] sm:px-[1.35rem] sm:text-[0.9rem]"
            >
              {t.hero.viewProjects}
            </button>

            {profileLinks.length > 0 && (
              <div className="flex items-center gap-1.5 sm:ml-1 sm:gap-2">
                {profileLinks.map((link) => {
                  const Icon = socialIconMap[link.icon]
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={link.platform}
                      className="icon-btn h-10 w-10 sm:h-[2.9rem] sm:w-[2.9rem]"
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden lg:block">
        <div className="shell flex justify-center">
          <motion.button
            type="button"
            onClick={() => goTo('expertise')}
            aria-label={t.hero.scrollToExpertise}
            className="pointer-events-auto flex cursor-pointer items-center gap-3 text-[var(--text-3)] transition-colors hover:text-[var(--text-2)]"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.5 }}
          >
            <motion.span
              animate={reducedMotion ? { y: 0 } : { y: [0, 5, 0] }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
              }
              className="flex"
            >
              <ArrowDown width={16} height={16} />
            </motion.span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              {t.hero.scroll}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
