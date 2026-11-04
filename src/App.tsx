import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router'
import { AnimateUIProvider } from '@animate-ui/react/provider'
import { ReducedMotionConfig } from '@animate-ui/react/utils/motion'
import { PageTransition } from './components/ui'
import { copy, projects, type Locale } from './content'
import { PortfolioContext } from './navigation/PortfolioContext'
import { HomePage, ProjectsPage, ProjectDetailPage, AboutPage, SkillsPage, ContactPage, NotFoundPage } from './pages/PortfolioPages'
import { IntroPage } from './pages/IntroPage'

function initialLocale(): Locale {
  try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'vi' }
  catch { return 'vi' }
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [hasEntered, setHasEntered] = useState(() => {
    try { return sessionStorage.getItem('portfolio-entered') === 'true' }
    catch { return false }
  })

  const showIntro = location.pathname === '/intro' || (location.pathname === '/' && !hasEntered)
  const enterPortfolio = useCallback(() => {
    try { sessionStorage.setItem('portfolio-entered', 'true') } catch { /* Storage is optional. */ }
    startTransition(() => {
      setHasEntered(true)
      navigate('/home', { replace: true })
    })
  }, [navigate])

  return <AnimateUIProvider><ReducedMotionConfig>
    <PageTransition effect="stack" pageKey={showIntro ? 'intro' : 'portfolio'}>
      {showIntro ? <IntroPage locale={initialLocale()} onEnter={enterPortfolio}/> : <PortfolioApp/>}
    </PageTransition>
  </ReducedMotionConfig></AnimateUIProvider>
}

function PortfolioApp() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrollPositions = useRef(new Map<string, number>())
  const c = copy[locale]
  const paths = ['/home', '/projects', '/about', '/skills', '/contact']

  useEffect(() => {
    document.documentElement.lang = locale
    const pageName = location.pathname.startsWith('/projects/')
      ? projects.find(p => p.id === location.pathname.split('/')[2])?.name
      : Object.fromEntries(paths.map((path, index) => [path, c.nav[index]]))[location.pathname]
    document.title = `${pageName ? `${pageName} · ` : ''}Phạm Quang Huy · Mobile Developer`
    document.querySelector('meta[name="description"]')?.setAttribute('content', locale === 'vi' ? 'Portfolio của Phạm Quang Huy, Mobile Developer tại Mebisoft. Flutter, React Native, Mebione, DSS-CRM và Mebipha.' : 'Phạm Quang Huy, Mobile Developer at Mebisoft. Explore Flutter and React Native work across Mebione, DSS-CRM and Mebipha.')
    try { localStorage.setItem('portfolio-language', locale) } catch { /* Optional browser storage. */ }
  }, [locale, location.pathname, c.nav])

  useLayoutEffect(() => {
    document.getElementById('main')?.focus({ preventScroll: true })
    const top = navigationType === 'POP' ? scrollPositions.current.get(location.key) ?? 0 : 0
    window.scrollTo({ top, left: 0, behavior: 'instant' })
    return () => { scrollPositions.current.set(location.key, window.scrollY) }
  }, [location.key, navigationType])


  return <PortfolioContext.Provider value={{ locale, setLocale }}>
    <div className={`portfolio-shell${location.pathname === '/home' ? ' is-home' : ''}`}>
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header"><div className="header-actions"><div className="language-switch" role="group" aria-label={locale === 'vi' ? 'Ngôn ngữ' : 'Language'}><button aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')} lang="vi">VI</button><span aria-hidden="true">/</span><button aria-pressed={locale === 'en'} onClick={() => setLocale('en')} lang="en">EN</button></div></div>
    </header>
    <main id="main" tabIndex={-1}><PageTransition effect="stack" pageKey={location.pathname} className="route-content"><Routes><Route path="/" element={<Navigate to="/home" replace/>}/><Route path="/home" element={<HomePage/>}/><Route path="/projects" element={<ProjectsPage/>}/><Route path="/projects/:slug" element={<ProjectDetailPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/skills" element={<SkillsPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></PageTransition></main>
    </div>
  </PortfolioContext.Provider>
}


