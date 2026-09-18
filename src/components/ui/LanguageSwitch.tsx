import { useI18n } from '../../i18n/LanguageProvider'
import type { Locale } from '../../types'

const LOCALES: Locale[] = ['en', 'de']

export default function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex h-10 shrink-0 items-center rounded-full border border-[var(--border-2)] p-0.5"
    >
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`h-full cursor-pointer rounded-full px-2 font-mono text-[0.64rem] tracking-[0.06em] uppercase transition-colors sm:px-2.5 sm:text-[0.68rem] ${
              active
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
