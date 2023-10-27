import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
    PHASE_PRODUCTION_SERVER,
} from 'next/constants.js';

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    trailingSlash: true,
    async headers(){
        return [{
            source:"/:all*",
            headers:[{
                key:"content-security-policy",
                value:"" +
                    "default-src 'self';" +
                    " style-src 'self' 'unsafe-inline' fonts.googleapis.com; prefetch-src 'self';" +
                    " base-uri 'none';" +
                    " form-action 'self';" +
                    " script-src 'self' 'unsafe-eval' 'unsafe-inline';" +
                    " font-src 'self' fonts.gstatic.com;" +
                    " manifest-src 'self';" +
                    " img-src 'self'" +
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
    }
};


/** @type {(phase: PHASE_DEVELOPMENT_SERVER | PHASE_PRODUCTION_BUILD | PHASE_PRODUCTION_SERVER) => import("next").NextConfig} */
function build(phase)
{
    const isExport = phase === PHASE_PRODUCTION_BUILD;
    const res = {
        ...config,
        headers: !isExport ? config.headers : undefined,
        output: isExport ? 'export' : undefined,
        distDir: isExport ? 'dist' : undefined,
        images:{
            ...config.images,
            loader: isExport ? 'custom' : 'default',
            loaderFile: isExport ? './src/images/loader.ts' : undefined,
        },
        webpack(config, options)
        {

            let cfg = options.config.serverRuntimeConfig;
            options.config.publicRuntimeConfig.isDev = cfg.isDev = options.dev;
            options.config.publicRuntimeConfig.isStatic = cfg.isStatic = !options.dev && !cfg.isPreview;

            return config;
        },
    }
    if (isExport)
    {
        delete res.rewrites;
        delete res.redirects;
    }
    return res;
}

export default build;
