import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import LanguageProvider, { localeFromPath } from './i18n/LanguageProvider'

const locale = localeFromPath(window.location.pathname)

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <LanguageProvider initialLocale={locale}>
      <App />
    </LanguageProvider>
  </StrictMode>
)

// The build prerenders this page (dist/index.html + dist/en/index.html), so
// hydrate the existing markup when it is there; otherwise fall back to a
// normal client render (e.g. `vite dev`).
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
