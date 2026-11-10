import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useLocale } from '@/features/change-language/model/useLocale'
import { projects } from '@/pages/projects/content/projects'
import { site } from '@/shared/config/site'

const titles = {
  '/experience': { vi: 'Kinh nghiệm', en: 'Experience' },
  '/': { vi: 'Trang chủ', en: 'Home' },
  '/projects': { vi: 'Dự án', en: 'Work' },
  '/about': { vi: 'Về tôi', en: 'About' },
  '/skills': { vi: 'Kỹ năng', en: 'Skills' },
  '/contact': { vi: 'Liên hệ', en: 'Contact' },
}

export function RouteMetadata() {
  const { pathname, state } = useLocation()
  const pagePath = pathname === '/' && state?.homeView === 'experience' ? '/experience' : pathname
  const { locale } = useLocale()
  useEffect(() => {
    const name = pagePath.startsWith('/projects/')
      ? projects.find((project) => project.id === pagePath.split('/')[2])?.name
      : titles[pagePath as keyof typeof titles]?.[locale]
    document.title = `${name ? `${name} · ` : ''}${site.name} · ${site.role}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', site.description[locale])
  }, [pagePath, locale])
  return null
}
