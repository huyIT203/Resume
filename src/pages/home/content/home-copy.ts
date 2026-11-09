import type { Locale } from '@/shared/i18n/types'

export const homeCopy = {
  vi: {
    bio: {
      lead: 'Mình thích tìm kiếm công cụ và thư viện ',
      highlight: 'mã nguồn mở',
      tail: ' để lập trình viên làm việc thuận tiện hơn. Mình luôn tìm cách cải thiện và đơn giản hóa quá trình viết code.',
    },
    greeting: 'Xin chào, tôi là ',
    subtitlePrefix: 'Tôi là một kỹ sư ',
    subtitleRole: 'lập trình mobile',
    subtitleLocation: ' tại Việt Nam',
    portraitLabel: 'Đây là tôi!',
  },
  en: {
    bio: {
      lead: 'I love crafting tools and ',
      highlight: 'open-source',
      tail: ' libraries to improve developer experience. Always eager to enhance and simplify the coding process.',
    },
    greeting: "Hi, I'm ",
    subtitlePrefix: "I'm a ",
    subtitleRole: 'Mobile Developer',
    subtitleLocation: ' based in Vietnam',
    portraitLabel: 'Hi, this is me!',
  },
} satisfies Record<
  Locale,
  {
    bio: { lead: string; highlight: string; tail: string }
    greeting: string
    subtitlePrefix: string
    subtitleRole: string
    subtitleLocation: string
    portraitLabel: string
  }
>
