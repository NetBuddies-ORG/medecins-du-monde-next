import React, {cache, use} from 'react';
import {PageFiltersInput} from "@/services/GraphQL";
import {getStrapiClient} from "@/services/Strapi";
import {DocumentTypes} from "@/features/document-types/DocumentTypes";
import {notFound} from "next/navigation";
import {setPage} from "@/context/server";
import {languages} from "@/helpers";

export type CmsPageProps = {
    params: {
        language: string;
        p?: string[];
    }
};

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

export default function CmsPage({params: {language, p}}: CmsPageProps) {
    const cmsP = p?.map(item => item);
    const {pages} = use(getPage(language, '/' + (cmsP ? cmsP : '')));

    if(!pages?.data[0]) notFound();
    setPage(pages);


    return (
        <>
            <DocumentTypes />
        </>
    );
}

export async function generateStaticParams() {
    const client = getStrapiClient();
    const getPagesList = async (language: string) => (await client.getPages({locale: language})).pages.data;
    const dynamicRoutes: string[] = [];

    for (const language of languages) {
        try {
            for (let page of (await getPagesList(language))){
                if(page.attributes.Url !== '/')
                    dynamicRoutes.push(language + page.attributes.Url)
            }
        } catch (missingLanguage){
            console.error('MissingLanguage', language, missingLanguage);
        }
    }

    return dynamicRoutes.map((url) =>{
        const splittedUrl = url.split('/');
        const lang = splittedUrl.shift();
        return {language: lang, p: splittedUrl}
    });
}