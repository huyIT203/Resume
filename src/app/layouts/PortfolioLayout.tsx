import { Outlet, useLocation, useMatch } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { commonCopy } from '@/shared/i18n/common-copy'
import { PageTransition } from '@/shared/ui/animate-ui/page-transition'
import { RouteMetadata } from '../router/RouteMetadata'
import styles from './PortfolioLayout.module.css'
import { SideNavigation } from './SideNavigation'

export function PortfolioLayout({ preview = false }: { preview?: boolean }) {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  const isHome = useMatch('/')
  return (
    <div className={isHome ? `${styles.shell} ${styles.homeShell}` : styles.shell}>
      {!preview && <RouteMetadata />}
      {!preview && <SideNavigation />}
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
