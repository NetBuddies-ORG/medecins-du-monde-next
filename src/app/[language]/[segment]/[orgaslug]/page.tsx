import OrganizationDetails from "@/features/document-types/organization/Organization";
import {getStrapiClient} from "@/services/Strapi";
import {languages, removeDiacritics} from "@/helpers";
import organizations from "@/../build/static/organismes.json";

type OrgaDetailsPageProps = {
    params: {
        language: string;
        segment: string;
        orgaslug: string;
    }
}

export default async function OrgaDetailsPage({params: {language, segment, orgaslug}}: OrgaDetailsPageProps) {
    return <OrganizationDetails language={language}
                                segment={segment}
                                orgaslug={orgaslug} />;
}

export async function generateStaticParams() {
    const client = getStrapiClient();
    const catalogues: string[] = [];
    const getPagesList = async (language: string) => (await client.getPages({locale: language})).pages.data;

    for (const language of languages) {
        try {
            for (let page of (await getPagesList(language))) {
                if (page.attributes.ContentType === "Organizations") {
                    catalogues.push('/' + language + page.attributes.Url);
                }
            }
        } catch (missingLanguage) {
            console.error('MissingLanguage', language, missingLanguage);
        }
    }

    const res: OrgaDetailsPageProps["params"][] = [];


    for (let organization of organizations) {
        for (let catalogue of catalogues) {
            const [_, language, segment] = catalogue.split('/');
            if (language && segment && organization) {
                res.push({
                    language,
                    segment,
                    //orgaslug: removeDiacritics(organization.Nom),
                    orgaslug: organization.generatedUrl,
                });
            }
        }
    }


    return res;
}
