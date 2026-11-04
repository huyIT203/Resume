import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { AnimateUIProvider } from '@animate-ui/react/provider'
import { ReducedMotionConfig } from '@animate-ui/react/utils/motion'
import { LocaleProvider } from '@/features/change-language/model/LocaleProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AnimateUIProvider>
        <ReducedMotionConfig>
          <LocaleProvider>{children}</LocaleProvider>
        </ReducedMotionConfig>
      </AnimateUIProvider>
    </BrowserRouter>
  )
}
