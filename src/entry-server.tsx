import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import LanguageProvider from './i18n/LanguageProvider'
import type { Locale } from './types'

/** Render one locale to an HTML string for the prerender step. */
export function render(locale: Locale): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLocale={locale}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  )
}
