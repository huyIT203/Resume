import { useEffect, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'motion/react'
import styles from './HangingPhotos.module.css'

const memories = [
  { angle: 9, position: '50% 45%' },
  { angle: 3, position: '50% 50%' },
  { angle: -1, position: '50% 38%' },
  { angle: -7, position: '50% 43%' },
  { angle: -5, position: '50% 35%' },
]

function HangingPhoto({ index, locale }: { index: number; locale: 'vi' | 'en' }) {
  const reducedMotion = useReducedMotion()
  const [swing, setSwing] = useState(0)
  const controls = useAnimationControls()
  const { angle, position } = memories[index]

  useEffect(() => {
    if (reducedMotion) { controls.set({ rotate: angle }); return }
    void controls.start({
      rotate: [angle - 10, angle + 8, angle - 5, angle + 3, angle - 1, angle],
      transition: { duration: 3.8, delay: swing ? 0 : 0.35 + index * 0.09, ease: 'easeInOut' },
    })
    return () => controls.stop()
  }, [angle, controls, index, reducedMotion, swing])

  return <div className={styles.hanger}>
    <motion.div
      className={styles.swing}
      initial={{ rotate: reducedMotion ? angle : angle - 10 }}
      animate={controls}
    >
      <motion.div
        className={styles.draggable}
        drag={reducedMotion ? false : 'x'}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.14}
        dragSnapToOrigin
        whileHover={reducedMotion ? undefined : { rotate: -angle / 2, y: 3 }}
        whileTap={reducedMotion ? undefined : { scale: 1.025 }}
        onDragEnd={() => setSwing(value => value + 1)}
      >
        <button
          type="button"
          className={styles.photo}
          onClick={() => setSwing(value => value + 1)}
          aria-label={locale === 'vi' ? `Đung đưa ảnh kỷ niệm ${index + 1}` : `Swing memory photo ${index + 1}`}
        >
          <img src={`/images/aboutme/image_${index + 1}.webp`} alt="" width="160" height="160" draggable={false} style={{ objectPosition: position }}/>
        </button>
        <span className={styles.peg} aria-hidden="true"/>
      </motion.div>
    </motion.div>
  </div>
}

export function HangingPhotos({ locale = 'vi' }: { locale?: 'vi' | 'en' }) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={styles.clothesline}
    initial={reducedMotion ? false : { y: '-160%', opacity: 0 }}
    animate={{ y: '0%', opacity: 1 }}
    transition={reducedMotion ? { duration: 0 } : {
      y: { type: 'spring', stiffness: 105, damping: 11, mass: 1.1 },
      opacity: { duration: 0.2 },
    }}
  >
    <svg className={styles.rope} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <path className={styles.ropeShadow} d="M -60 0 Q 500 150 1060 0"/>
      <path className={styles.ropeBase} d="M -60 0 Q 500 150 1060 0"/>
      <path className={styles.ropeTwist} d="M -60 0 Q 500 150 1060 0"/>
    </svg>
    {memories.map((_, index) => <HangingPhoto key={index} index={index} locale={locale}/>)}
  </motion.div>
}
