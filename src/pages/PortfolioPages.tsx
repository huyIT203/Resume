import { HomeGreeting } from '../components/HomeGreeting'
import { useState } from 'react'
import { SplittingText } from '@animate-ui/react/primitives/texts/splitting'
import { HangingPhotos } from '../components/HangingPhotos'
import { usePortfolio } from '../navigation/PortfolioContext'
import styles from './HomePage.module.css'


export function HomePage() {
  const { locale } = usePortfolio()
  const [greetingDone, setGreetingDone] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  return <section className={styles.home} aria-labelledby="home-title">
    {greetingDone && titleDone && <HangingPhotos locale={locale}/>}
    <div className={styles.greeting}><HomeGreeting onComplete={() => setGreetingDone(true)}/></div>
    <h2 className={styles.title} lang="en" aria-label="ABOUT ME">
      <span aria-hidden="true">
        <SplittingText className={`${styles.titleSegment} ${styles.titleInitial}`} text="A" type="chars"
          initial={{ x: '-0.3em', opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }} stagger={0.18} delay={200}/>
        <SplittingText className={styles.titleSegment} text="BOU" type="chars"
          initial={{ x: '-0.3em', opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }} stagger={0.18} delay={380}/>
        <SplittingText className={styles.titleSegment} text="T ME" type="chars"
          initial={{ x: '0.3em', opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.63, ease: [0.16, 1, 0.3, 1] }} stagger={0.18} delay={920}
          onAnimationComplete={definition => { if (definition === 'visible') setTitleDone(true) }}/>
      </span>
    </h2>
  </section>
}

// Other pages stay empty while their new content is being designed.
export function ProjectsPage() { return null }
export function ProjectDetailPage() { return null }
export function AboutPage() { return null }
export function SkillsPage() { return null }
export function ContactPage() { return null }
export function NotFoundPage() { return null }

