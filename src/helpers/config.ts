import locales from '../../build/static/locales.json';

// Public URL, not a secret. STRAPI_CMS_BASE_URL can override it (e.g. to target a local Strapi)
export const strapiBaseUrl: string = process.env.STRAPI_CMS_BASE_URL ?? 'https://strapi.monboreseau.be';

// TODO add other languages
export const languages: readonly string[] = locales;
