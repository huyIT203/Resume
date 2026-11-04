import { motion, useReducedMotion } from 'motion/react'
import { useLocale } from '@/features/change-language/model/useLocale'
import { site } from '@/shared/config/site'
import { homeCopy } from '../../content/home-copy'
import styles from './CornerPortrait.module.css'

const rays = ['M 242 31 L 247 13', 'M 254 37 L 269 22', 'M 260 49 L 280 43', 'M 230 27 L 227 16']

export function CornerPortrait() {
  const { locale } = useLocale()
  const reducedMotion = useReducedMotion()

  return (
    <figure className={styles.portrait}>
      <motion.div
        className={styles.paper}
        initial={reducedMotion ? false : { opacity: 0, y: -16, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{
          duration: reducedMotion ? 0 : 0.65,
          delay: reducedMotion ? 0 : 0.2,
          ease: 'easeOut',
        }}
      >
        <img
          src="/images/aboutme/image_1.webp"
          alt={site.name}
          width="960"
          height="540"
          fetchPriority="high"
        />
      </motion.div>
      <motion.figcaption
        className={styles.caption}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.7 }}
      >
        {homeCopy[locale].portraitLabel}
      </motion.figcaption>
      <svg
        className={styles.doodles}
        viewBox="0 0 300 210"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.path
          d="M 243 82 C 267 111 258 146 153 130 M 168 117 L 153 130 L 173 140"
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : 0.9,
            ease: 'easeOut',
          }}
        />
        {rays.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.2,
              delay: reducedMotion ? 0 : 1.1 + index * 0.08,
            }}
          />
        ))}
      </svg>
    </figure>
  )
}
