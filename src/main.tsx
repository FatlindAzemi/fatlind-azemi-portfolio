import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import LenisProvider from './components/LenisProvider'
import LanguageProvider from './i18n/LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LenisProvider>
  </StrictMode>,
)
