import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { Locale } from '@/shared/i18n/types'

export const LocaleContext = createContext<{
  locale: Locale
  setLocale: Dispatch<SetStateAction<Locale>>
} | null>(null)
