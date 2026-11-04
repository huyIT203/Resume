import { SplittingText } from '@animate-ui/react/primitives/texts/splitting'
import styles from './AboutTitle.module.css'

export function AboutTitle({ onComplete }: { onComplete?: () => void }) {
  return (
    <h2 className={styles.title} lang="en" aria-label="ABOUT ME">
      <span aria-hidden="true">
        <SplittingText
          className={`${styles.titleSegment} ${styles.titleInitial}`}
          text="A"
          type="chars"
          initial={{ x: '-0.3em', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }}
          stagger={0.18}
          delay={200}
        />
        <SplittingText
          className={styles.titleSegment}
          text="BOU"
          type="chars"
          initial={{ x: '-0.3em', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }}
          stagger={0.18}
          delay={380}
        />
        <SplittingText
          className={styles.titleSegment}
          text="T ME"
          type="chars"
          initial={{ x: '0.3em', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }}
          stagger={0.18}
          delay={920}
          onAnimationComplete={(definition) => {
            if (definition === 'visible') onComplete?.()
          }}
        />
      </span>
    </h2>
  )
}
