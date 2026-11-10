import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'

export type Theme = 'light' | 'dark'

export const ThemeContext = createContext<{
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
} | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
