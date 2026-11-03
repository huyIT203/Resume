import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, NavLink, Link, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router'
import { AnimateUIProvider } from '@animate-ui/react/provider'
import { ReducedMotionConfig } from '@animate-ui/react/utils/motion'
import { ExternalLink, Menu, X, ThemeToggle, PageTransition, Highlight, HighlightItem } from './components/ui'
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
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrollPositions = useRef(new Map<string, number>())
  const mobileMenuButton = useRef<HTMLButtonElement>(null)
  const c = copy[locale]
  const paths = ['/home', '/projects', '/about', '/skills', '/contact']
  const activePath = paths.find(path => location.pathname === path || location.pathname.startsWith(`${path}/`)) ?? null

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
    setMobileMenu(false)
    document.getElementById('main')?.focus({ preventScroll: true })
    const top = navigationType === 'POP' ? scrollPositions.current.get(location.key) ?? 0 : 0
    window.scrollTo({ top, left: 0, behavior: 'instant' })
    return () => { scrollPositions.current.set(location.key, window.scrollY) }
  }, [location.key, navigationType])

  useEffect(() => {
    if (!mobileMenu) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMobileMenu(false); mobileMenuButton.current?.focus() }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [mobileMenu])

  return <PortfolioContext.Provider value={{ locale, setLocale }}>
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header"><Link to="/home" className="wordmark" aria-label={locale === 'vi' ? 'Phạm Quang Huy — Trang chủ' : 'Phạm Quang Huy — Home'}><span className="brand-symbol">h.</span><span>huy<span className="wordmark-dot">/</span>mobile</span></Link>
      <nav id="primary-navigation" className={mobileMenu ? 'main-nav is-open' : 'main-nav'} aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}><Highlight controlledItems value={activePath} className="nav-active-highlight">{c.nav.map((label, index) => <HighlightItem key={paths[index]} value={paths[index]}><NavLink to={paths[index]} onClick={() => setMobileMenu(false)}>{label}</NavLink></HighlightItem>)}</Highlight></nav>
      <div className="header-actions"><div className="language-switch" role="group" aria-label={locale === 'vi' ? 'Ngôn ngữ' : 'Language'}><button aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')} lang="vi">VI</button><span aria-hidden="true">/</span><button aria-pressed={locale === 'en'} onClick={() => setLocale('en')} lang="en">EN</button></div><ThemeToggle locale={locale}/><button ref={mobileMenuButton} className="menu-toggle" aria-label={mobileMenu ? locale === 'vi' ? 'Đóng điều hướng' : 'Close navigation' : c.menu} aria-expanded={mobileMenu} aria-controls="primary-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={22}/> : <Menu size={22}/>}</button></div>
    </header>
    <main id="main" tabIndex={-1}><PageTransition effect="stack" pageKey={location.pathname} className="route-content"><Routes><Route path="/" element={<Navigate to="/home" replace/>}/><Route path="/home" element={<HomePage/>}/><Route path="/projects" element={<ProjectsPage/>}/><Route path="/projects/:slug" element={<ProjectDetailPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/skills" element={<SkillsPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></PageTransition></main>
    <footer className="site-footer"><Link to="/home" className="brand-symbol" aria-label={locale === 'vi' ? 'Trang chủ' : 'Home'}>h.</Link><span>© {new Date().getFullYear()} Phạm Quang Huy</span><span className="footer-message">{c.footer}</span><Link to="/contact">{locale === 'vi' ? 'Liên hệ' : 'Get in touch'}<ExternalLink size={14} aria-hidden="true"/></Link></footer>
  </PortfolioContext.Provider>
}
