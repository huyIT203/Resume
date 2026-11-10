import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale } from '@/features/change-language/model/useLocale'
import { TypewriterEffect } from '@/shared/ui/aceternity/typewriter-effect'
import { Highlighter } from '@/shared/ui/magicui/highlighter'
import styles from './HomeGreeting.module.css'
import { homeCopy } from '../../content/home-copy'
import { site } from '@/shared/config/site'

function Greeting({ locale, onComplete }: { locale: 'vi' | 'en'; onComplete?: () => void }) {
  const [headingDone, setHeadingDone] = useState(false)
  const [subtitleDone, setSubtitleDone] = useState(false)
  const reducedMotion = useReducedMotion()
  const { greeting: prefix, subtitlePrefix, subtitleRole, subtitleLocation } = homeCopy[locale]

  return (
    <>
      <h1 id="home-title" className={styles.heading}>
        <TypewriterEffect
          cursorClassName={headingDone ? styles.finishedCursor : styles.cursor}
          onComplete={() => setHeadingDone(true)}
          words={[
            { text: prefix },
            {
              text: site.name,
              render: (letters) => (
                <strong className={styles.name}>
                  <Highlighter action="underline" enabled={headingDone}>
                    {letters}
                  </Highlighter>
                </strong>
              ),
            },
          ]}
        />
      </h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: reducedMotion ? 0 : -14 }}
        animate={headingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : -14 }}
        transition={{
          duration: reducedMotion ? 0 : 0.65,
          delay: reducedMotion ? 0 : 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        onAnimationComplete={() => {
          if (headingDone) {
            setSubtitleDone(true)
            onComplete?.()
          }
        }}
      >
        {subtitlePrefix}
        <span className={styles.role}>
          <Highlighter action="highlight" color="#000000" enabled={subtitleDone}>
            {subtitleRole}
          </Highlighter>
        </span>
        {subtitleLocation}
      </motion.p>
    </>
  )
}

export function HomeGreeting({ onComplete }: { onComplete?: () => void }) {
  const { locale } = useLocale()
  return <Greeting key={locale} locale={locale} onComplete={onComplete} />
}
