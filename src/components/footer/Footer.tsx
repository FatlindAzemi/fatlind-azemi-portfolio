import { motion } from 'framer-motion'
import MagneticWrapper from '../ui/MagneticWrapper'
import { useInkDrop } from '../../hooks/useInkDrop'
import { useLenis } from '../LenisProvider'
import { useI18n } from '../../i18n/LanguageProvider'
import { socialIconMap, ArrowUpRight } from '../ui/Icons'
import { buildMailto } from '../../utils/contact'

export default function Footer() {
  const lenis = useLenis()
  const { t, data } = useI18n()
  const { trigger, InkDropOverlay } = useInkDrop()

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[var(--border)]"
      style={{ paddingBlock: 'var(--section-y)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(79,134,255,0.12), transparent 70%)',
        }}
      />
      {InkDropOverlay}

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-6">{t.footer.eyebrow}</p>

          <h2 className="display max-w-4xl">{t.footer.heading}</h2>

          <p className="lead mt-7">{t.footer.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticWrapper>
              <a
                href={buildMailto(data.email, t.mail)}
                onClick={(event) => trigger(event)}
                className="btn btn-primary h-12 cursor-pointer px-6 text-[0.95rem]"
              >
                <span className="font-mono text-[0.82rem]">
                  {data.email}
                </span>
                <ArrowUpRight width={16} height={16} />
              </a>
            </MagneticWrapper>

            {data.socialLinks
              .filter((link) => link.icon !== 'mail')
              .map((link) => {
                const Icon = socialIconMap[link.icon]
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.platform}
                    className="icon-btn h-12 w-12"
                  >
                    <Icon />
                  </a>
                )
              })}
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--text-3)] sm:flex-row sm:items-center">
          <p className="font-mono">
            © {new Date().getFullYear()} {data.name} · {t.footer.builtWith}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono">
            <a
              href="/impressum.html"
              className="transition-colors hover:text-[var(--text)]"
            >
              {t.footer.imprint}
            </a>
            <a
              href="/datenschutz.html"
              className="transition-colors hover:text-[var(--text)]"
            >
              {t.footer.privacy}
            </a>
            <button
              type="button"
              onClick={() =>
                lenis
                  ? lenis.scrollTo('#hero', { duration: 1.6 })
                  : window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              className="cursor-pointer font-mono transition-colors hover:text-[var(--text)]"
            >
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
