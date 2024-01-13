import React, {cache} from 'react';
import {PageFiltersInput} from "@/services/GraphQL";
import {getStrapiClient} from "@/services/Strapi";
import {DocumentTypes} from "@/features/document-types/DocumentTypes";
import {notFound} from "next/navigation";
import {setCategories, setFooter, setHeader, setLanguage, setPage, setPublics} from "@/context/server";
import {languages} from "@/helpers";
import Head from "next/head";
import {ResolvingMetadata} from "next";

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

const getCategories = cache(async function getCategories(lang: string) {
    const client = getStrapiClient();
    return await client.getCategories({locale: lang});
});

const getPublics = cache(async function getPublics(lang: string) {
    const client = getStrapiClient();
    return await client.getPublics({locale: lang});
});

const getHeader = cache(async function getHeader(language: string) {
    const client = getStrapiClient();
    return await client.getHeader({locale: language});
});

const getFooter = cache(async function getFooter(language: string) {
    const client = getStrapiClient();
    return await client.getFooter({locale: language});
});

export default async function CmsPage({params: {language, p}}: CmsPageProps) {
    const cmsP = p?.map(item => item);
    const {pages} = await getPage(language, '/' + (cmsP ? cmsP : ''));
    const header = await getHeader(language);
    const footer = await getFooter(language);

    if(!pages?.data[0]) notFound();
    setPage(pages);
    setCategories(await getCategories(language));
    setPublics(await getPublics(language));
    setHeader(header);
    setFooter(footer);
    setLanguage(language);


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

export async function generateMetadata({params: {language, p}}) {
    const {pages} = await getPage(language, '/' + (p ? p : ''));
    return {
        applicationName: 'MonBo Réseau',
        title: pages?.data[0]?.attributes?.SEO.Title,
        description: pages?.data[0]?.attributes?.SEO.Description,
        robots: undefined,
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: pages?.data[0]?.attributes?.SEO.Title,
        },
    }
}