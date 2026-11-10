import { useEffect, useRef, useState } from 'react'
import { SplittingText } from '@animate-ui/react/primitives/texts/splitting'
import type { Locale } from '@/shared/i18n/types'
import styles from './IntroPage.module.css'

type IntroPageProps = {
  locale: Locale
  onEnter: () => void
  opening: boolean
}

const partyInitial = { opacity: 0, scale: 0, y: 4, rotate: -1 }
const partyAnimate = {
  opacity: [0, 1, 1, 1, 1],
  scale: [0, 0.15, 1.08, 0.98, 1],
  y: [4, 4, -2, 1, 0],
  rotate: [-1, -1, 1, -0.5, 0],
}
const partyTransition = {
  duration: 0.38,
  ease: 'easeOut' as const,
  times: [0, 0.001, 0.55, 0.8, 1],
}

export function IntroPage({ locale, onEnter, opening }: IntroPageProps) {
  const mainRef = useRef<HTMLElement>(null)
  const [textFinished, setTextFinished] = useState(false)

  useEffect(() => {
    if (!textFinished) return
    const timer = window.setTimeout(onEnter, 1000)
    return () => window.clearTimeout(timer)
  }, [textFinished, onEnter])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = 'Phạm Quang Huy · Welcome'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [locale])

  return (
    <main
      ref={mainRef}
      tabIndex={-1}
      className={styles.intro}
      aria-label={
        locale === 'vi'
          ? 'Chào mừng đến portfolio của Phạm Quang Huy'
          : 'Welcome to Phạm Quang Huy’s portfolio'
      }
    >
      <h1 className={styles.heading} data-opening={opening} lang="en">
        <SplittingText
          className={styles.headingLine}
          text="welcome"
          initial={partyInitial}
          animate={partyAnimate}
          transition={partyTransition}
          stagger={0.11}
        />
        <br />
        <SplittingText
          className={styles.headingLine}
          text="to my"
          initial={partyInitial}
          animate={partyAnimate}
          transition={partyTransition}
          stagger={0.11}
          delay={770}
        />
        <span className={styles.scriptTitle}>
          <SplittingText
            text="Portfolio"
            initial={partyInitial}
            animate={partyAnimate}
            transition={partyTransition}
            stagger={0.11}
            delay={1500}
          />
        </span>
      </h1>
      <div className={styles.credit}>
        <p className={styles.creditLabel} lang="en">
          <SplittingText
            text="with"
            initial={partyInitial}
            animate={partyAnimate}
            transition={partyTransition}
            stagger={0.11}
            delay={1500}
          />
        </p>
        <p className={styles.creditName} lang="vi">
          <SplittingText
            text="Phạm Quang Huy"
            initial={partyInitial}
            animate={partyAnimate}
            transition={partyTransition}
            stagger={0.11}
            delay={1500}
            // This line finishes last: it has the most characters at this delay.
            onAnimationComplete={(definition) => {
              if (definition === 'visible') setTextFinished(true)
            }}
          />
        </p>
      </div>
    </main>
  )
}
