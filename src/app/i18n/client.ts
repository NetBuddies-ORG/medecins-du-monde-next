'use client'

import i18next, { Namespace, KeyPrefix } from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
  UseTranslationResponse,
} from 'react-i18next'
import { getOptions } from '@/app/i18n/settings'

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .init({
    ...getOptions('fr'),
  })

// const runsOnServerSide = typeof window === 'undefined'

export function useTranslation<
  N extends Namespace,
  TKPrefix extends KeyPrefix<N> = undefined,
>(
  options?: UseTranslationOptions<TKPrefix>
): UseTranslationResponse<N, TKPrefix> {
  return useTranslationOrg(undefined, options)
}
