import '@/assets/styles/main.scss';
import React from "react";
import { Poppins } from 'next/font/google';

// Downloaded at build time and served by the site: no request to Google from the visitors' browsers
const poppins = Poppins({
    weight: ['200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-poppins',
});

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={poppins.variable}>
        <head>
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
            <script defer src='/scripts/matomo.js'/>
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}
