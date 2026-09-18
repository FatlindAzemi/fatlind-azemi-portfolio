import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { portfolioByLocale } from '../data/portfolio'
import { uiDe } from './ui.de'
import { uiEn } from './ui.en'
import type { UiStrings } from './types'
import type { Locale, PortfolioData } from '../types'

export const LOCALE_STORAGE_KEY = 'portfolio-locale'

const uiByLocale: Record<Locale, UiStrings> = {
  en: uiEn,
  de: uiDe,
}

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'de'
}

export function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

export function detectLocale(): Locale {
  const stored = readStoredLocale()
  if (stored) return stored
  if (typeof navigator === 'undefined') return 'en'

  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language]

  return languages.some((language) => language.toLowerCase().startsWith('de'))
    ? 'de'
    : 'en'
}

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: UiStrings
  data: PortfolioData
}

const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) {
    throw new Error('useI18n must be used inside a LanguageProvider')
  }
  return value
}

export default function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      // storage unavailable (private mode) — the choice still applies to this session
    }
  }, [])

  useEffect(() => {
    const strings = uiByLocale[locale]
    document.documentElement.lang = locale
    document.title = strings.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', strings.meta.description)
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: uiByLocale[locale],
      data: portfolioByLocale[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
