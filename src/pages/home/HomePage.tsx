import { useState } from 'react'
import { useLocale } from '@/features/change-language/model/useLocale'
import { AboutTitle } from './ui/AboutTitle/AboutTitle'
import { HangingPhotos } from './ui/HangingPhotos/HangingPhotos'
import { HomeGreeting } from './ui/HomeGreeting/HomeGreeting'
import { CornerPortrait } from './ui/CornerPortrait/CornerPortrait'
import styles from './HomePage.module.css'

const showHangingPhotos = false

export function HomePage() {
  const { locale } = useLocale()
  const [greetingDone, setGreetingDone] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  return (
    <section className={styles.home} aria-labelledby="home-title">
      {titleDone && <CornerPortrait />}
      {showHangingPhotos && greetingDone && titleDone && <HangingPhotos locale={locale} />}
      <div className={styles.greeting}>
        {titleDone && <HomeGreeting onComplete={() => setGreetingDone(true)} />}
      </div>
      <AboutTitle onComplete={() => setTitleDone(true)} />
    </section>
  )
}
