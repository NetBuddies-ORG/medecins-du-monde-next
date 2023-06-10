import config from 'next/config';

export interface Configuration
{
    isDev: boolean;
    isPreview: boolean;
    isStatic: boolean;
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
export const languages: readonly string[] = ['fr'];

export function getConfiguration(): Configuration
{
    const { serverRuntimeConfig, publicRuntimeConfig } = config() ?? {};
    return {
        ...publicRuntimeConfig,
        ...serverRuntimeConfig,
        umbracoCmsBaseUrl: process.env.UMBRACO_CMS_BASE_URL,
        domain: process.env.DOMAIN,
        jwt: {
            backendIssuer: process.env.JWT_BACKEND_ISSUER,
            frontendIssuer: process.env.JWT_FRONTEND_ISSUER,
            secret: process.env.JWT_SECRET,
        },
    };
}