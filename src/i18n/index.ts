import pinia from '@/store'
import { useSettingsStore } from '@/store/modules/settings'
import { createI18n } from 'vue-i18n'
import { LanguageType } from '/#/store'
import en from './locales/en.json'
import zh from './locales/zh.json'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

export { enLocale, zhLocale }

const messages: Record<LanguageType, any> = {
  en: {
    ...en,
  },
  zh: {
    ...zh,
  },
}

function getLocale() {
  const { getLanguage } = useSettingsStore(pinia)
  return getLanguage
}

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'zh',
  messages,
})

export function setupI18n(app: any) {
  app.use(i18n)
  return i18n
}

export function translate(message: string | undefined) {
  if (!message) {
    return ''
  }
  return (
    [getLocale(), 'vabI18n', message].reduce(
      (o, k) => (o || {})[k],
      messages as any
    ) || message
  )
}
