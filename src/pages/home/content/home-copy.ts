import type { Locale } from '@/shared/i18n/types'

export const homeCopy = {
  vi: {
    greeting: 'Xin chào, tôi là ',
    subtitlePrefix: 'Tôi là một kỹ sư ',
    subtitleRole: 'lập trình mobile',
    subtitleLocation: ' tại Việt Nam',
    portraitLabel: 'Đây là tôi!',
  },
  en: {
    greeting: "Hi, I'm ",
    subtitlePrefix: "I'm a ",
    subtitleRole: 'Mobile Developer',
    subtitleLocation: ' based in Vietnam',
    portraitLabel: 'Hi, this is me!',
  },
} satisfies Record<
  Locale,
  {
    greeting: string
    subtitlePrefix: string
    subtitleRole: string
    subtitleLocation: string
    portraitLabel: string
  }
>
