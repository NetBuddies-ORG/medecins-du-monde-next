import '@/assets/styles/main.scss';
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    applicationName: 'Pass VisitWallonia.be',
    title: 'Pass VisitWallonia.be',
    description: 'Pass VisitWallonia.be',
    manifest: '/manifest.json',
    themeColor: "#FFFFFF",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: 'Pass VisitWallonia.be',
    },
};

export default function RootLayout({children}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
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
        </head>
        <body>
            {children}
        </body>
        </html>
    )
}
