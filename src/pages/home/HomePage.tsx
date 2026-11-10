import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, useReducedMotion, useSpring } from 'motion/react'
import CloudSky from '@/components/originkit/ui/cloud-sky'
import { useLocale } from '@/features/change-language/model/useLocale'
import { Highlighter } from '@/shared/ui/magicui/highlighter'
import { homeCopy } from './content/home-copy'
import { AboutTitle } from './ui/AboutTitle/AboutTitle'
import { HangingPhotos } from './ui/HangingPhotos/HangingPhotos'
import { HomeGreeting } from './ui/HomeGreeting/HomeGreeting'
import { CornerPortrait } from './ui/CornerPortrait/CornerPortrait'
import styles from './HomePage.module.css'

const showHangingPhotos = false
const stickers = [
  'flutter',
  'dart',
  'android',
  'kotlin',
  'react-native',
  'claude',
  'firebase',
  'docker',
  'typescript',
  'javascript',
]

function StickerOrbit({ revealed }: { revealed: boolean }) {
  const eyesRef = useRef<HTMLDivElement>(null)
  const inView = useInView(eyesRef)
  const reducedMotion = useReducedMotion()
  const eyeX = useSpring(0, { stiffness: 240, damping: 24 })
  const eyeY = useSpring(0, { stiffness: 240, damping: 24 })

  useEffect(() => {
    const eyes = eyesRef.current
    if (!eyes || !inView || reducedMotion) return

    const reset = () => {
      eyeX.set(0)
      eyeY.set(0)
    }
    const followPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
      const bounds = eyes.getBoundingClientRect()
      const x = event.clientX - (bounds.left + bounds.width / 2)
      const y = event.clientY - (bounds.top + bounds.height / 2)
      const distance = Math.max(100, Math.hypot(x, y))
      eyeX.set((x / distance) * 9)
      eyeY.set((y / distance) * 9)
    }

    window.addEventListener('pointermove', followPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    return () => {
      window.removeEventListener('pointermove', followPointer)
      document.documentElement.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      reset()
    }
  }, [eyeX, eyeY, inView, reducedMotion])

  return (
    <div className={styles.stickerOrbit} data-revealed={revealed} aria-hidden="true">
      <div className={styles.stickerRing}>
        {stickers.map((icon, index) => (
          <img
            key={icon}
            className={styles.sticker}
            style={{ '--angle': `${(index * 360) / stickers.length}deg` } as CSSProperties}
            src={`/images/tech/${icon}.svg`}
            alt=""
            draggable={false}
          />
        ))}
      </div>
      <div ref={eyesRef} className={styles.eyeDock}>
        <svg className={styles.eyes} viewBox="0 0 64 32" fill="#151922">
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <g className={styles.eyeShape} data-visible={inView}>
              <rect x="1" y="1" width="20" height="30" rx="10" />
              <rect x="43" y="1" width="20" height="30" rx="10" />
            </g>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}

export function HomePage({ introReady = true }: { introReady?: boolean }) {
  const reducedMotion = useReducedMotion()
  const { locale } = useLocale()
  const { bio } = homeCopy[locale]
  const [greetingDone, setGreetingDone] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const orbitTriggerRef = useRef<HTMLDivElement>(null)
  const orbitRevealed = useInView(orbitTriggerRef)
  return (
    <div className={styles.scrollScene}>
      {!reducedMotion && (
        <div className={styles.cloudSky} aria-hidden="true">
          <CloudSky
            background="transparent"
            speed={40}
            density={70}
            size={100}
            clouds={{ softness: 300, shadow: 111, cirrus: 0 }}
            sun={{ x: 50, y: 100, glow: '#FFFFFF' }}
            pointer={{ parallax: 0, wind: 0 }}
            style={{ minWidth: 0, minHeight: 0 }}
          />
        </div>
      )}
      <div ref={orbitTriggerRef} className={styles.orbitTrigger} aria-hidden="true" />
      <div className={styles.stage}>
        <section className={styles.home} aria-labelledby="home-title">
          <div className={styles.portraitLayer}>{titleDone && <CornerPortrait />}</div>
          {showHangingPhotos && greetingDone && titleDone && <HangingPhotos locale={locale} />}
          <div className={styles.greeting}>
            {titleDone && <HomeGreeting onComplete={() => setGreetingDone(true)} />}
          </div>
          {introReady && <AboutTitle onComplete={() => setTitleDone(true)} />}
        </section>
        <div className={styles.bioGroup}>
          <StickerOrbit revealed={orbitRevealed} />
          <p className={styles.bio}>
            {bio.lead}
            <Highlighter key={locale} action="underline" className={styles.bioHighlight}>
              {bio.highlight}
            </Highlighter>
            {bio.tail}
          </p>
        </div>
        <div className={styles.previews}>
          <figure className={`${styles.preview} ${styles.experiencePreview}`}>
            <div className={styles.cardStack}>
              <span className={styles.cardBack} />
              <span className={`${styles.cardBack} ${styles.cardFace}`}>
                <img
                  className={styles.companyLogo}
                  src="/images/aboutme/tma-icon.webp"
                  alt="TMA Solutions"
                />
                <span className={styles.companyDates}>
                  <time dateTime="2025-06">Jun</time> – <time dateTime="2025-10">Oct 2025</time>
                </span>
              </span>
              <span className={styles.cardFace}>
                <img
                  className={styles.companyLogo}
                  src="/images/aboutme/mebisoft.webp"
                  alt="Mebisoft"
                />
                <span className={styles.companyDates}>
                  <time dateTime="2025-11">Nov 2025</time> – now
                </span>
              </span>
            </div>
            <figcaption className={styles.previewLabel}>
              {locale === 'vi' ? 'Kinh nghiệm' : 'Experience'}
              <span className={styles.previewCount}>02</span>
            </figcaption>
          </figure>
          <figure className={`${styles.preview} ${styles.projectPreview}`}>
            <div className={styles.cardStack}>
              <span className={`${styles.cardBack} ${styles.cardFace}`}>
                <img src="/images/project/mebipha.svg" alt="Mebipha" />
              </span>
              <span className={`${styles.cardBack} ${styles.cardFace}`}>
                <img src="/images/project/mebieco.svg" alt="Mebieco" />
              </span>
              <span className={styles.cardFace}>
                <img src="/images/project/DSS.svg" alt="DAT CRM" />
              </span>
            </div>
            <figcaption className={styles.previewLabel}>
              {locale === 'vi' ? 'Dự án' : 'Projects'}
              <span className={styles.previewCount}>03</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
