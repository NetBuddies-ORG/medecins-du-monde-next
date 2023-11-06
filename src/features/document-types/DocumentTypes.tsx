import {getLanguage, getPage} from "@/context/server";
import {CustomHeader} from "@/features/common/header/Header";
import {CustomFooter} from "@/features/common/footer/footer";
import {HomePage} from "@/features/document-types/home-page/HomePage";
import {cache} from "react";
import {getStrapiClient} from "@/services/Strapi";
import {GetPageQuery} from "@/services/GraphQL";
import {Organizations} from "@/features/document-types/organizations/Organizations";

export async function DocumentTypes() {
    const pages = getPage();
    const language = getLanguage();

    return <>
        <CustomHeader/>
        <main>
            {
                await displayContent(pages, language)
            }
        </main>
        <CustomFooter/>
    </>

}

async function displayContent(page: GetPageQuery["pages"], language: string) {
    switch (page.data[0].attributes.ContentType) {
        case 'Home':
            return (<>
                <HomePage extraData={await getHomePage(language)}></HomePage>
            </>)
        case 'Organizations':
            return <>
                <Organizations extraData={await getOrganizationsPage(language)} languague={language} />
            </>
        case 'About':
            return <>
                About
            </>
        case 'Urgences':

            return <>
                Urgences
            </>
        default:
            return (
                <>
                </>
            );
    }
}

const getHomePage = cache(async function getHomePage(language: string) {
    const client = getStrapiClient();
    return await client.getHome({locale: language});
});

const getOrganizationsPage = cache(async function getOrganizationsPage(language: string) {
    const client = getStrapiClient();
    // @ts-ignore
    return await client.getOrganismes({locale: language, filters: {}});
});
