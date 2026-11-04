import { Outlet, useLocation } from 'react-router'
import { LanguageSwitcher } from '@/features/change-language/ui/LanguageSwitcher'
import { useLocale } from '@/features/change-language/model/useLocale'
import { commonCopy } from '@/shared/i18n/common-copy'
import { PageTransition } from '@/shared/ui/animate-ui/page-transition'
import { RouteMetadata } from '../router/RouteMetadata'
import { ScrollRestoration } from '../router/ScrollRestoration'
import styles from './PortfolioLayout.module.css'

export function PortfolioLayout() {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  const isHome = pathname === '/home'
  return (
    <div className={`${styles.shell}${isHome ? ` ${styles.home}` : ''}`}>
      <RouteMetadata />
      <ScrollRestoration />
      <a className={styles.skipLink} href="#main">
        {commonCopy[locale].skip}
      </a>
      <header className={styles.header}>
        <LanguageSwitcher onSky={isHome} />
      </header>
      <main id="main" tabIndex={-1}>
        <PageTransition effect="stack" pageKey={pathname} className={styles.content}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}
