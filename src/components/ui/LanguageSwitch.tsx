import { useI18n } from '../../i18n/LanguageProvider'
import type { Locale } from '../../types'

const LOCALES: Locale[] = ['de', 'en']

// One URL per language (see the prerender step): German is the canonical root,
// English lives under /en/. Links keep the switch crawlable and shareable.
const PATHS: Record<Locale, string> = {
  de: '/',
  en: '/en/',
}

export default function LanguageSwitch() {
  const { locale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex h-10 shrink-0 items-center rounded-full border border-[var(--border-2)] p-0.5"
    >
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <a
            key={code}
            href={PATHS[code]}
            hrefLang={code}
            aria-current={active ? 'page' : undefined}
            className={`flex h-full items-center rounded-full px-2 font-mono text-[0.64rem] tracking-[0.06em] uppercase transition-colors sm:px-2.5 sm:text-[0.68rem] ${
              active
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
            }`}
          >
            {code}
          </a>
        )
      })}
    </div>
  )
}
