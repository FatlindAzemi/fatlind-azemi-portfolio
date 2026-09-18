import type { Locale, PortfolioData } from '../types'
import { portfolioDataDe } from './portfolio.de'
import { portfolioDataEn } from './portfolio.en'

export const portfolioByLocale: Record<Locale, PortfolioData> = {
  en: portfolioDataEn,
  de: portfolioDataDe,
}

export { portfolioDataDe, portfolioDataEn }
