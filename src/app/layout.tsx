import '@/assets/styles/main.scss';
import React from "react";

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
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
