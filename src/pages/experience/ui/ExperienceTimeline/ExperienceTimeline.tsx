import { useLocale } from '@/features/change-language/model/useLocale'
import { addTransitionType, startTransition } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { experiences } from '@/shared/content/experiences'
import { PageTransitionShared } from '@/shared/ui/animate-ui/page-transition'
import styles from './ExperienceTimeline.module.css'

export function ExperienceTimeline() {
  const { locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.content}>
        <Link
          to="/"
          className={styles.back}
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
              addTransitionType('nav-back')
              if (location.state?.fromHome) navigate(-1)
              else navigate('/')
            })
          }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {locale === 'vi' ? 'Quay lại' : 'Back'}
        </Link>
        <h2 id="experience-heading" className={styles.heading}>
          {locale === 'vi' ? 'Kinh nghiệm' : 'Experience'}
        </h2>
        <div className={styles.timeline}>
          <div className={styles.track} aria-hidden="true">
            <div className={styles.progress} />
          </div>
          <ol className={styles.milestones}>
            {[...experiences].reverse().map((experience, index) => (
              <li key={experience.id} className={styles.milestone}>
                <span className={styles.dot} aria-hidden="true" />
                <div className={styles.label}>
                  <p className={styles.period}>{experience.period[locale]}</p>
                  <div
                    className={styles.stampFrame}
                    style={{
                      animationRange: `cover ${(index / Math.max(1, experiences.length - 1)) * 100}% cover ${((index + 1) / Math.max(1, experiences.length - 1)) * 100}%`,
                    }}
                  >
                    <PageTransitionShared
                      name={`experience-card-${experience.id}`}
                      className={styles.stamp}
                      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img className={styles.logo} src={experience.logo} alt="" />
                      <h3 className={styles.company}>{experience.company}</h3>
                      <p className={styles.stampPeriod}>{experience.period[locale]}</p>
                    </PageTransitionShared>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
