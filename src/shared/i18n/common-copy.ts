import type { Locale } from './types'

export const commonCopy = {
  vi: { skip: 'Đến nội dung chính', language: 'Ngôn ngữ' },
  en: { skip: 'Skip to main content', language: 'Language' },
} satisfies Record<Locale, { skip: string; language: string }>
