import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER,
} from 'next/constants.js';

const config = {
    experimental: {
        appDir: true
    },
    reactStrictMode: true,
    trailingSlash: true,
    async headers(){
        return [{
            source:"/:all*",
            headers:[{
                key:"content-security-policy",
                value:"" +
                    "default-src 'none';" +
                    " style-src 'self' 'unsafe-inline' fonts.googleapis.com; prefetch-src 'self';" +
                    " base-uri 'none';" +
                    " form-action 'self';" +
                    " script-src 'self' 'unsafe-eval' 'unsafe-inline';" +
                    " font-src 'self' fonts.gstatic.com;" +
                    " manifest-src 'self';" +
                    " img-src 'self' data: https://ik.imagekit.io;" +
                    " connect-src 'self';"
            }]
        }]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/fr/',
                permanent: false,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/locales/:endpoint*',
                destination: 'https://medecins-du-monde.azurewebsites.net/locales/:endpoint*',
            },
        ];
    }
};

/** @type {(phase: PHASE_DEVELOPMENT_SERVER | PHASE_PRODUCTION_BUILD | PHASE_PRODUCTION_SERVER) => import("next").NextConfig} */
function build(phase)
{
    const isExport = phase === PHASE_PRODUCTION_BUILD;
    return {
        ...config,
        headers: !isExport ? config.headers : undefined,
        redirects: !isExport ? config.redirects : undefined,
        output: isExport ? 'export' : undefined,
        distDir: isExport ? 'dist' : undefined,
        images:{
            ...config.images,
            loader: isExport ? 'custom' : 'default',
            loaderFile: isExport ? './src/images/loader.ts' : undefined,
            domains: ['ik.imagekit.io', 'placehold.co', 'placekitten.com']
        },
        webpack(config, options)
        {

            let cfg = options.config.serverRuntimeConfig;
            options.config.publicRuntimeConfig.isDev = cfg.isDev = options.dev;
            options.config.publicRuntimeConfig.isStatic = cfg.isStatic = !options.dev && !cfg.isPreview;
            options.config.publicRuntimeConfig.isExport = cfg.isExport = isExport;
            return config;
        },
    }
}

export default build;
