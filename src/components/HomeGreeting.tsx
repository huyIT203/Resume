import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { usePortfolio } from '../navigation/PortfolioContext'
import { TypewriterEffect } from './aceternity/typewriter-effect'
import { Highlighter } from './magicui/highlighter'
import styles from './HomeGreeting.module.css'

function Greeting({ locale, onComplete }: { locale: 'vi' | 'en'; onComplete?: () => void }) {
  const [headingDone, setHeadingDone] = useState(false)
  const reducedMotion = useReducedMotion()
  const prefix = locale === 'vi' ? 'Xin chào, tôi là ' : "Hi, I'm "
  const subtitle = locale === 'vi' ? 'Một người giản dị với những ước mơ lớn' : 'A simple person with big dreams'

  return <>
    <h1 id="home-title" className={styles.heading}>
      <TypewriterEffect cursorClassName={headingDone ? styles.finishedCursor : styles.cursor} onComplete={() => setHeadingDone(true)} words={[
        { text: prefix },
        { text: 'Phạm Quang Huy', render: letters => <strong className={styles.name}><Highlighter action="underline" enabled={headingDone}>{letters}</Highlighter></strong> },
      ]}/>
    </h1>
    <motion.p className={styles.subtitle}
      initial={{ opacity: 0, y: reducedMotion ? 0 : -14 }}
      animate={headingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : -14 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => { if (headingDone) onComplete?.() }}
    >{subtitle}</motion.p>
  </>
}

export function HomeGreeting({ onComplete }: { onComplete?: () => void }) {
  const { locale } = usePortfolio()
  return <Greeting key={locale} locale={locale} onComplete={onComplete}/>
}
