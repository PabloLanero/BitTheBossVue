import { createI18n } from 'vue-i18n'
import { en } from './locales/en'
import { es } from './locales/es'

export const LOCALE_STORAGE_KEY = 'app_locale'
export const SUPPORTED_LOCALES = ['en', 'es'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

function isSupportedLocale(value: string | null): value is AppLocale {
  return value !== null && SUPPORTED_LOCALES.includes(value as AppLocale)
}

function getInitialLocale(): AppLocale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isSupportedLocale(stored)) return stored
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})

export function setAppLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }
}
