import { Outlet, useLocation } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { commonCopy } from '@/shared/i18n/common-copy'
import { PageTransition } from '@/shared/ui/animate-ui/page-transition'
import { RouteMetadata } from '../router/RouteMetadata'
import { ScrollRestoration } from '../router/ScrollRestoration'
import styles from './PortfolioLayout.module.css'
import { SideNavigation } from './SideNavigation'

export function PortfolioLayout() {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  return (
    <div className={styles.shell}>
      <RouteMetadata />
      <ScrollRestoration />
      <SideNavigation />
      <a className={styles.skipLink} href="#main">
        {commonCopy[locale].skip}
      </a>
      <main id="main" tabIndex={-1}>
        <PageTransition effect="stack" pageKey={pathname} className={styles.content}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}
