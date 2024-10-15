import {
    PHASE_PRODUCTION_BUILD,
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
                    "default-src 'self' data: ;" +
                    " style-src 'self' 'unsafe-inline' fonts.googleapis.com;" +
                    " base-uri 'none';" +
                    " form-action 'self';" +
                    " script-src 'self' 'unsafe-eval' 'unsafe-inline';" +
                    " font-src 'self' fonts.gstatic.com;" +
                    " manifest-src 'self';" +
                    " img-src 'self' blob: " +
                    " https://openlayers.org" +
                    " https://tile.openstreetmap.org" +
                    " http://a.tile.openstreetmap.org" +
                    " http://b.tile.openstreetmap.org" +
                    " https://strapi-mdm.alexianmoins.be" +
                    " data:" +
                    " https://ik.imagekit.io" +
                    " http://c.tile.openstreetmap.org;" +
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
        staticPageGenerationTimeout: 300,
        images:{
            ...config.images,
            loader: isExport ? 'custom' : 'default',
            loaderFile: isExport ? './src/images/loader.ts' : undefined,
            domains: ['ik.imagekit.io']
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
