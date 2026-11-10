import { useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from '@/shared/model/theme-context'

function readTheme(): Theme {
  try {
    return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme)
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      /* Storage is optional. */
    }
  }, [theme])
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
