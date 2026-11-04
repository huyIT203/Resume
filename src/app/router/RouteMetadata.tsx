import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { projects } from '@/pages/projects/content/projects'
import { site } from '@/shared/config/site'

const titles = {
  '/home': { vi: 'Trang chủ', en: 'Home' },
  '/projects': { vi: 'Dự án', en: 'Work' },
  '/about': { vi: 'Về tôi', en: 'About' },
  '/skills': { vi: 'Kỹ năng', en: 'Skills' },
  '/contact': { vi: 'Liên hệ', en: 'Contact' },
}

export function RouteMetadata() {
  const { pathname } = useLocation()
  const { locale } = useLocale()
  useEffect(() => {
    const name = pathname.startsWith('/projects/')
      ? projects.find((project) => project.id === pathname.split('/')[2])?.name
      : titles[pathname as keyof typeof titles]?.[locale]
    document.title = `${name ? `${name} · ` : ''}${site.name} · ${site.role}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', site.description[locale])
  }, [pathname, locale])
  return null
}
