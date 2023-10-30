import {ResolvingMetadata} from "next";
import React, {cache, use} from "react";
import {getStrapiClient} from "@/services/Strapi";
import {PageFiltersInput} from "@/services/GraphQL";

const getPage = cache(async function getPage(locale: string, url: string) {
    const client = getStrapiClient();
    const filters: PageFiltersInput = {
        // @ts-ignore
        Url: {
            eq: url
        }
    }
    return await client.getPage({locale: locale, filters: filters});
});

interface LanguagePageProps {
    params: {
        language: string;
    }
}

export default function LanguageLayout({children, params: {language}}: LanguagePageProps & { children: React.ReactNode }) {

    const {pages} = use(getPage(language ,`/`));

    return (
        <html lang={language}>
        <body>
            {children}
        </body>
        </html>
    )
}

export function generateMetadata(
    { params },
    parent: ResolvingMetadata
) {
    // read route params
    const lang = params.language ?? 'fr'

    return {
        applicationName: 'MonBo Réseau',
        title: 'MonBo Réseau',
        description: 'MonBo Réseau',
        robots: 'noindex',
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: 'MonBo Réseau',
        },
    }
}
