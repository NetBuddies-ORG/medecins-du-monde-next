import {getLanguage, getPage} from "@/context/server";
import {CustomHeader} from "@/features/common/header/Header";
import {CustomFooter} from "@/features/common/footer/footer";
import {HomePage} from "@/features/document-types/home-page/HomePage";
import {cache} from "react";
import {getStrapiClient} from "@/services/Strapi";
import {GetPageQuery} from "@/services/GraphQL";

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
                <HomePage extraData={await getHome(language)}></HomePage>
            </>)
        case 'Organizations':
            return <>
                Orga
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

const getHome = cache(async function getHome(language: string) {
    const client = getStrapiClient();
    return await client.getHome({locale: language});
});
