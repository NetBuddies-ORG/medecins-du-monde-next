import '@/assets/styles/main.scss';
import {Metadata} from "next";
import React, { useEffect } from "react";

export const metadata: Metadata = {
    applicationName: 'Monbo Réseau',
    title: 'Monbo Réseau',
    description: 'Monbo Réseau',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: 'Monbo Réseau',
    },
};

export default function RootLayout({children}: {
    children: React.ReactNode
}) {

    useEffect(() => {
            // @ts-ignore
            const _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                const u="//matomo.alexianmoins.be/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                // @ts-ignore
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
            console.info('Matomo is loaded');
    }, []);

    return (
        <html lang="fr">
        <head>
            <meta name="robots" content="noindex"/>
            <meta name="theme-color"
                  content="#fff" />
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible"
                  content="IE=edge" />
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0" />
            <meta name="msapplication-TileColor"
                  content="##007bff" />
            <meta name="theme-color"
                  content="#ffffff" />
            <link rel="icon" type="image/ico" href="/images/favicon/favicon.ico" />
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}
