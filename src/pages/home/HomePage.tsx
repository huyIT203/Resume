import { useState } from 'react'
import { useLocale } from '@/features/change-language/model/useLocale'
import { AboutTitle } from './ui/AboutTitle/AboutTitle'
import { HangingPhotos } from './ui/HangingPhotos/HangingPhotos'
import { HomeGreeting } from './ui/HomeGreeting/HomeGreeting'
import styles from './HomePage.module.css'

export function HomePage() {
  const { locale } = useLocale()
  const [greetingDone, setGreetingDone] = useState(false)
  const [titleDone, setTitleDone] = useState(false)
  return (
    <section className={styles.home} aria-labelledby="home-title">
      {greetingDone && titleDone && <HangingPhotos locale={locale} />}
      <div className={styles.greeting}>
        <HomeGreeting onComplete={() => setGreetingDone(true)} />
      </div>
      <AboutTitle onComplete={() => setTitleDone(true)} />
    </section>
  )
}
