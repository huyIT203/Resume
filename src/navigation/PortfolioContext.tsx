import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import type { Locale } from '../content'
type PortfolioContextValue = { locale: Locale; setLocale: Dispatch<SetStateAction<Locale>> }
export const PortfolioContext = createContext<PortfolioContextValue | null>(null)
export function usePortfolio() {
  const value = useContext(PortfolioContext)
  if (!value) throw new Error('Portfolio context is unavailable')
  return value
}
export const EMAIL = 'phamquangnamhuy1908@gmail.com'
export const CV_URL = '/PhamQuangHuy_CV.pdf'
