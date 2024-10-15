import { InitOptions } from 'i18next'
import translations from '../../../build/static/translations.json'

export function getOptions(lang: string): InitOptions {
  return {
    ns: ['translation'],
    defaultNS: 'translation',
    resources: translations,
    nsSeparator: false,
    lng: lang,
    appendNamespaceToMissingKey: false,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnEmptyString: false,
  }
}
