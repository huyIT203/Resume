import type { Locale } from '@/shared/i18n/types'

export const homeCopy = {
  vi: {
    greeting: 'Xin chào, tôi là ',
    subtitlePrefix: 'Tôi là một kỹ sư ',
    subtitleRole: 'lập trình mobile',
  },
  en: {
    greeting: "Hi, I'm ",
    subtitlePrefix: "I'm a ",
    subtitleRole: 'Mobile Developer',
  },
} satisfies Record<Locale, { greeting: string; subtitlePrefix: string; subtitleRole: string }>
