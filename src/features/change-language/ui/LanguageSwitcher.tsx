import { commonCopy } from '@/shared/i18n/common-copy'
import { useLocale } from '../model/useLocale'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher({ onSky = false }: { onSky?: boolean }) {
  const { locale, setLocale } = useLocale()
  return (
    <div
      className={`${styles.switcher}${onSky ? ` ${styles.onSky}` : ''}`}
      role="group"
      aria-label={commonCopy[locale].language}
    >
      <button aria-pressed={locale === 'vi'} onClick={() => setLocale('vi')} lang="vi">
        VI
      </button>
      <span aria-hidden="true">/</span>
      <button aria-pressed={locale === 'en'} onClick={() => setLocale('en')} lang="en">
        EN
      </button>
    </div>
  )
}
