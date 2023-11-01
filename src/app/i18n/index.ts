import { createInstance, Namespace, KeyPrefix } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import {getOptions} from './settings'

const initI18next = async (lang: string) => {
    // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .init({
            ...getOptions(lang)
        })
    return i18nInstance
}

export async function useTranslation<
    N extends Namespace,
    TKPrefix extends KeyPrefix<N>,
>(
    lang: string,
    options: { keyPrefix?: TKPrefix } = {}
) {
    const i18nextInstance = await initI18next(lang)

    return {
        // TODO: solve TKPrefix problem here... (WVN: come from the example)
        t: i18nextInstance.getFixedT(lang),
        i18n: i18nextInstance
    }
}