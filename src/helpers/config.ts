import getConfig from 'next/config';

export interface Configuration
{
    isDev: boolean;
    isPreview: boolean;
    isStatic: boolean;
    isExport: boolean;
    umbracoCmsBaseUrl: string;
    domain: string;
    apiBaseUrl: string;
    jwt: {
        backendIssuer: string;
        frontendIssuer: string;
        secret: string;
    },
}

// TODO add other languages
export const languages: readonly string[] = ['fr','en'];

export function getConfiguration(): Configuration
{
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig() ?? {};
    return {
        ...publicRuntimeConfig,
        ...serverRuntimeConfig,
        umbracoCmsBaseUrl: process.env.STRAPI_CMS_BASE_URL,
    };
}
