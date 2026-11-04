import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Locale } from '@/shared/i18n/types'
import { LocaleContext } from './locale-context'

const storageKey = 'portfolio-language'

function readLocale(): Locale {
  try {
    return localStorage.getItem(storageKey) === 'en' ? 'en' : 'vi'
  } catch {
    return 'vi'
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readLocale)
  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(storageKey, locale)
    } catch {
      /* Storage is optional. */
    }
  }, [locale])
  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
