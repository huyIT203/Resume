import { useLocation } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { LocaleFlag, LocaleFlagTransition } from '@/features/change-language/ui/LocaleFlag'
import { site } from '@/shared/config/site'
import { FloatingDock, type FloatingDockItem } from '@/shared/ui/aceternity/floating-dock'
import { Portrait } from '@/shared/ui/animate-ui/icons/portrait'
import { Terminal } from '@/shared/ui/animate-ui/icons/terminal'
import { BookOpen } from '@/shared/ui/animate-ui/icons/book-open'

export function SideNavigation() {
  const { pathname } = useLocation()
  const { locale, setLocale } = useLocale()
  const items: FloatingDockItem[] = [
    {
      id: 'background',
      title: 'Background',
      href: '/home',
      active: pathname === '/home',
      icon: (animate) => <Portrait size={22} animate={animate} aria-hidden="true" />,
    },
    {
      id: 'product',
      title: 'Product',
      href: '/projects',
      active: pathname.startsWith('/projects'),
      icon: (animate) => <Terminal size={22} animate={animate} aria-hidden="true" />,
    },
    {
      id: 'resume',
      title: 'Resume',
      label: locale === 'vi' ? 'Mở CV ở tab mới' : 'Open resume in a new tab',
      href: site.cvUrl,
      external: true,
      icon: (animate) => <BookOpen size={22} animate={animate} aria-hidden="true" />,
    },
    {
      id: 'i18n',
      title: locale === 'vi' ? 'Tiếng Việt → English' : 'English → Tiếng Việt',
      tooltip: <LocaleFlagTransition locale={locale} />,
      label: locale === 'vi' ? 'Chuyển ngôn ngữ sang tiếng Anh' : 'Switch language to Vietnamese',
      onSelect: () => setLocale((current) => (current === 'vi' ? 'en' : 'vi')),
      icon: () => <LocaleFlag locale={locale} />,
    },
  ]
  return (
    <FloatingDock
      items={items}
      label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}
      onSky={pathname === '/home'}
    />
  )
}
