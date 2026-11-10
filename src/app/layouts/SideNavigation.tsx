import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimateIcon } from '@animate-ui/react/icons'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTheme } from '@/shared/model/theme-context'
import { useLocale } from '@/features/change-language/model/useLocale'
import { LocaleFlag } from '@/features/change-language/ui/LocaleFlag'
import { Menu01 } from '@/shared/ui/animate-ui/icons/hugeicons/menu-01'
import { Moon02 } from '@/shared/ui/animate-ui/icons/hugeicons/moon-02'
import { Sun03 } from '@/shared/ui/animate-ui/icons/hugeicons/sun-03'
import { site } from '@/shared/config/site'
import { Navbar } from '@/shared/ui/aceternity/resizable-navbar'
import { revealTheme } from '@/shared/lib/reveal-theme'
import styles from './SideNavigation.module.css'

export function SideNavigation() {
  const { pathname } = useLocation()
  const { locale, setLocale } = useLocale()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const reducedMotion = useReducedMotion()
  const items = [
    { name: 'Background', link: '/', active: pathname === '/' },
    { name: 'Product', link: '/projects', active: pathname.startsWith('/projects') },
    {
      name: 'Resume',
      link: site.cvUrl,
      external: true,
      label: locale === 'vi' ? 'Mở CV ở tab mới' : 'Open resume in a new tab',
    },
  ]

  useEffect(() => {
    if (!open) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target))
        setOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])

  const menuLabel =
    locale === 'vi' ? (open ? 'Đóng menu' : 'Mở menu') : open ? 'Close menu' : 'Open menu'
  const themeLabel =
    locale === 'vi'
      ? theme === 'dark'
        ? 'Chuyển sang giao diện sáng'
        : 'Chuyển sang giao diện tối'
      : theme === 'dark'
        ? 'Switch to light theme'
        : 'Switch to dark theme'
  const languageLabel = locale === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'

  return (
    <div ref={containerRef}>
      <Navbar
        label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}
        className={styles.navbar}
      >
        <motion.div
          className={styles.notch}
          initial={false}
          animate={{ width: open ? '100%' : 216 }}
          transition={{ duration: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={menuId}
                className={styles.menuItems}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.12 }}
              >
                {items.map((item) => (
                  <Link
                    key={item.link}
                    to={item.link}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.label}
                    aria-current={item.active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={styles.menuLink}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.controls} data-open={open}>
            <motion.button
              type="button"
              className={styles.iconButton}
              aria-label={languageLabel}
              title={languageLabel}
              whileHover={reducedMotion ? undefined : { scale: 1.08 }}
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              onClick={() => setLocale((current) => (current === 'vi' ? 'en' : 'vi'))}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={locale}
                  className={styles.iconFrame}
                  initial={{ opacity: 0, rotateX: reducedMotion ? 0 : 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: reducedMotion ? 0 : -90 }}
                  transition={{ duration: reducedMotion ? 0 : 0.15 }}
                >
                  <LocaleFlag locale={locale} />
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              ref={toggleRef}
              type="button"
              className={`${styles.iconButton} ${open ? styles.closeButton : ''}`}
              aria-label={menuLabel}
              title={menuLabel}
              aria-expanded={open}
              aria-controls={menuId}
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              onClick={() => setOpen((value) => !value)}
            >
              <Menu01 size={20} animate={open} aria-hidden="true" />
            </motion.button>
            <AnimateIcon animateOnHover animateOnTap asChild>
              <motion.button
                type="button"
                className={styles.iconButton}
                aria-label={themeLabel}
                title={themeLabel}
                whileTap={reducedMotion ? undefined : { scale: 0.9 }}
                onClick={(event) => {
                  void revealTheme(event.currentTarget, () =>
                    setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
                  )
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    className={styles.iconFrame}
                    initial={{
                      opacity: 0,
                      rotate: reducedMotion ? 0 : -60,
                      scale: reducedMotion ? 1 : 0.7,
                    }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      rotate: reducedMotion ? 0 : 60,
                      scale: reducedMotion ? 1 : 0.7,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.16 }}
                  >
                    {theme === 'dark' ? (
                      <Sun03 size={20} aria-hidden="true" />
                    ) : (
                      <Moon02 size={20} aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </AnimateIcon>
          </div>
        </motion.div>
      </Navbar>
    </div>
  )
}
