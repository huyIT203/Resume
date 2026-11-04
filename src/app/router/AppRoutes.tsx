import { startTransition, useCallback, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { HomePage } from '@/pages/home/HomePage'
import { IntroPage } from '@/pages/intro/IntroPage'
import { PlaceholderPage } from '@/pages/placeholder/PlaceholderPage'
import { PageTransition } from '@/shared/ui/animate-ui/page-transition'
import { PortfolioLayout } from '../layouts/PortfolioLayout'

const emptyRoutes = ['/projects', '/projects/:slug', '/about', '/skills', '/contact', '*']

export function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale } = useLocale()
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return sessionStorage.getItem('portfolio-entered') === 'true'
    } catch {
      return false
    }
  })
  const showIntro = location.pathname === '/intro' || (location.pathname === '/' && !hasEntered)
  const enterPortfolio = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio-entered', 'true')
    } catch {
      /* Storage is optional. */
    }
    startTransition(() => {
      setHasEntered(true)
      navigate('/home', { replace: true })
    })
  }, [navigate])

  return (
    <PageTransition effect="stack" pageKey={showIntro ? 'intro' : 'portfolio'}>
      {showIntro ? (
        <IntroPage locale={locale} onEnter={enterPortfolio} />
      ) : (
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            {emptyRoutes.map((route) => (
              <Route key={route} path={route} element={<PlaceholderPage />} />
            ))}
          </Route>
        </Routes>
      )}
    </PageTransition>
  )
}
