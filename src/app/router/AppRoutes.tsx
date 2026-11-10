import { useCallback, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { HomePage } from '@/pages/home/HomePage'
import { IntroPage } from '@/pages/intro/IntroPage'
import { PlaceholderPage } from '@/pages/placeholder/PlaceholderPage'
import { PortfolioLayout } from '../layouts/PortfolioLayout'
import styles from './AppRoutes.module.css'
import { ScrollRestoration } from './ScrollRestoration'

const emptyRoutes = ['/projects', '/projects/:slug', '/about', '/skills', '/contact', '*']

export function AppRoutes() {
  const location = useLocation()
  const { locale } = useLocale()
  const reducedMotion = useReducedMotion()
  const [openingKey, setOpeningKey] = useState<string | null>(null)
  const opening = openingKey === location.key
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio-entered') === 'true'
    } catch {
      return false
    }
  })
  const showIntro = location.pathname === '/' && !hasEntered
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio-entered', 'true')
    } catch {
      /* Storage is optional. */
    }
    setHasEntered(true)
  }, [])
  const enterPortfolio = useCallback(() => {
    if (reducedMotion) finishIntro()
    else setOpeningKey(location.key)
  }, [finishIntro, location.key, reducedMotion])
  return (
    <>
      <div className={showIntro ? styles.preview : undefined} inert={showIntro}>
        {!showIntro && <ScrollRestoration />}
        <Routes>
          <Route path="/intro" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route element={<PortfolioLayout preview={showIntro} />}>
            <Route index element={<HomePage introReady={!showIntro} />} />
            {emptyRoutes.map((route) => (
              <Route key={route} path={route} element={<PlaceholderPage />} />
            ))}
          </Route>
        </Routes>
      </div>
      {showIntro && (
        <div
          className={styles.introOverlay}
          data-opening={opening}
          onAnimationEnd={(event) => {
            if (opening && event.target === event.currentTarget) finishIntro()
          }}
        >
          <IntroPage locale={locale} onEnter={enterPortfolio} opening={opening} />
        </div>
      )}
    </>
  )
}
