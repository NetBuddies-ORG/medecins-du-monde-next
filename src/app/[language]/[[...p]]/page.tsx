import React, {cache, use} from 'react';
import {PageFiltersInput} from "@/services/GraphQL";
import {getStrapiClient} from "@/services/Strapi";
import {DocumentTypes} from "@/features/document-types/DocumentTypes";
import {notFound} from "next/navigation";
import {setPage} from "@/context/server";

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
    const cmsP = p?.map(item => item)[0];
    const {pages} = use(getPage(language, '/' + (cmsP ? cmsP : '')));

    if(!pages?.data[0]) notFound();
    setPage(pages);


    return (
        <>
            <DocumentTypes />
        </>
    );
}