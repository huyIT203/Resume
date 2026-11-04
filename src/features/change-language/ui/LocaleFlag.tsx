import type { Locale } from '@/shared/i18n/types'

export function LocaleFlagTransition({ locale }: { locale: Locale }) {
  return (
    <span
      role="img"
      aria-label={locale === 'vi' ? 'Tiếng Việt sang tiếng Anh' : 'English to Vietnamese'}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, verticalAlign: 'middle' }}
    >
      <LocaleFlag locale={locale} />
      <span aria-hidden="true">→</span>
      <LocaleFlag locale={locale === 'vi' ? 'en' : 'vi'} />
    </span>
  )
}

export function LocaleFlag({ locale }: { locale: Locale }) {
  return (
    <svg width="24" height="16" viewBox="0 0 30 20" aria-hidden="true" style={{ borderRadius: 2 }}>
      {locale === 'vi' ? (
        <>
          <path fill="#da251d" d="M0 0h30v20H0z" />
          <path
            fill="#ffdf00"
            d="m15 3 1.65 5.1H22l-4.33 3.15 1.65 5.1L15 13.2l-4.32 3.15 1.65-5.1L8 8.1h5.35z"
          />
        </>
      ) : (
        <>
          <path fill="#fff" d="M0 0h30v20H0z" />
          {Array.from({ length: 7 }, (_, index) => (
            <path key={index} fill="#b22234" d={`M0 ${(index * 40) / 13}h30v${20 / 13}H0z`} />
          ))}
          <path fill="#3c3b6e" d="M0 0h12v10.77H0z" />
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: row % 2 ? 5 : 6 }, (_, column) => (
              <path
                key={`${row}-${column}`}
                fill="#fff"
                transform={`translate(${1 + column * 2 + (row % 2 ? 1 : 0)} ${1 + row * 1.1})`}
                d="m0-.5.15.35.4.04-.3.26.09.4L0 .34-.34.55l.09-.4-.3-.26.4-.04z"
              />
            )),
          )}
        </>
      )}
    </svg>
  )
}
