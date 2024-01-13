import React, {cache} from "react";
import {getStrapiClient} from "@/services/Strapi";
import {PageFiltersInput} from "@/services/GraphQL";
import {notFound} from "next/navigation";
import {setLanguage} from "@/context/server";

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

export default async function LanguageLayout({children, params: {language}}: LanguagePageProps & { children: React.ReactNode }) {
    const {pages} = await getPage(language ,`/`);

    if(!pages) notFound()
    setLanguage(language);

    return (
        <>
            {children}
        </>
    )
}
