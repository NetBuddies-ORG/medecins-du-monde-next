import getConfig from 'next/config';
import locales from '../../build/static/locales.json';

export interface Configuration
{
    isDev: boolean;
    isPreview: boolean;
    isStatic: boolean;
    isExport: boolean;
    domain: string;
    apiBaseUrl: string;
    jwt: {
        backendIssuer: string;
        frontendIssuer: string;
        secret: string;
    },
}

// Public URL, not a secret. STRAPI_CMS_BASE_URL can override it (e.g. to target a local Strapi)
export const strapiBaseUrl: string = process.env.STRAPI_CMS_BASE_URL ?? 'https://strapi.monboreseau.be';

// TODO add other languages
export const languages: readonly string[] = locales;

export function getConfiguration(): Configuration
{
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig() ?? {};
    return {
        ...publicRuntimeConfig,
        ...serverRuntimeConfig,
    };
}
