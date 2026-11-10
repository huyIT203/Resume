import {
  addTransitionType,
  startTransition,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, useInView, useReducedMotion, useSpring } from 'motion/react'
import CloudSky from '@/components/originkit/ui/cloud-sky'
import CloudSkyNight from '@/components/originkit/ui/cloud-sky-03'
import { useTheme } from '@/shared/model/theme-context'
import { useLocale } from '@/features/change-language/model/useLocale'
import { Highlighter } from '@/shared/ui/magicui/highlighter'
import { homeCopy } from './content/home-copy'
import { experiences } from '@/shared/content/experiences'
import { PageTransitionShared } from '@/shared/ui/animate-ui/page-transition'
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
  'claude-robot',
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
  const navigate = useNavigate()
  const { theme } = useTheme()
  const reducedMotion = useReducedMotion()
  const { locale } = useLocale()
  const { bio } = homeCopy[locale]
  const [greetingDone, setGreetingDone] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const orbitTriggerRef = useRef<HTMLDivElement>(null)
  const orbitRevealed = useInView(orbitTriggerRef)

  useEffect(() => {
    const bioElement = bioRef.current
    const scene = sceneRef.current
    if (!bioElement || !scene) return
    const observer = new ResizeObserver(([entry]) => {
      scene.style.setProperty('--mobile-bio-height', `${entry.contentRect.height}px`)
    })
    observer.observe(bioElement)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sceneRef} className={styles.scrollScene}>
        {!reducedMotion && (
          <div className={styles.cloudSky} aria-hidden="true">
            {theme === 'dark' ? (
              <CloudSkyNight
                background="#050A1A"
                baseColor="#1C2B4D"
                accentColor="#2E3850"
                density={40}
                speed={reducedMotion ? 0 : 50}
                size={100}
                stars={67}
                clouds={{ softness: 300, shadow: 0 }}
                moon={{ x: 26, y: 76, glow: '#D6E4FFE6' }}
                pointer={{ parallax: 0, wind: 0, damping: 1 }}
                style={{ minWidth: 0, minHeight: 0 }}
              />
            ) : (
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
            )}
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
            <p ref={bioRef} className={styles.bio}>
              {bio.lead}
              <Highlighter key={locale} action="underline" className={styles.bioHighlight}>
                {bio.highlight}
              </Highlighter>
              {bio.tail}
            </p>
          </div>
          <div className={styles.previews}>
            <figure className={`${styles.preview} ${styles.experiencePreview}`}>
              <Link
                to="/"
                state={{ homeView: 'experience', fromHome: true }}
                className={styles.previewLink}
                aria-label={
                  locale === 'vi' ? 'Xem kinh nghiệm làm việc' : 'Explore work experience'
                }
                onClick={(event) => {
                  if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return
                  event.preventDefault()
                  startTransition(() => {
                    addTransitionType('card-unfold')
                    navigate('/', { state: { homeView: 'experience', fromHome: true } })
                  })
                }}
              >
                <div className={styles.cardStack}>
                  <span className={styles.cardBack} />
                  {experiences.map((experience, index) => (
                    <PageTransitionShared
                      key={experience.id}
                      name={`experience-card-${experience.id}`}
                      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className={
                        index === experiences.length - 1
                          ? styles.cardFace
                          : `${styles.cardBack} ${styles.cardFace}`
                      }
                    >
                      <img
                        className={styles.companyLogo}
                        src={experience.logo}
                        alt={experience.company}
                      />
                      <span className={styles.companyDates}>{experience.period[locale]}</span>
                    </PageTransitionShared>
                  ))}
                </div>
                <span className={styles.previewLabel}>
                  {locale === 'vi' ? 'Kinh nghiệm' : 'Experience'}
                  <span className={styles.previewCount}>
                    {String(experiences.length).padStart(2, '0')}
                  </span>
                </span>
              </Link>
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
    </>
  )
}
