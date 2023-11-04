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

export default function OrgaDetailsPage({params: {language, segment, orgaslug}}: OrgaDetailsPageProps) {
    return (
        <OrganizationDetails language={language}
                             segment={segment}
                             orgaslug={orgaslug} />
    );
}

export async function generateStaticParams(): Promise<OrgaDetailsPageProps["params"][]> {
    const client = getStrapiClient();
    const catalogues: string[] = [];
    const getPagesList = async (language: string) => (await client.getPages({locale: language})).pages.data;

    for (const language of languages) {
        try {
            for (let page of (await getPagesList(language))) {
                if (page.attributes.ContentType === "Organizations") {
                    catalogues.push(page.attributes.Url);
                }
            }
        } catch (missingLanguage) {
            console.error('MissingLanguage', language, missingLanguage);
        }
    }

    const res: OrgaDetailsPageProps["params"][] = [];

    // TODO: quid translations
    function getSlugFromLang(partner: any, lang: string): string {
        switch (lang) {
            case 'en':
                return partner.name.english
            case 'nl':
                return partner.name.dutch
            case 'de':
                return partner.name.german
            case 'fr':
            default :
                return partner.name.french
        }
    }

    for (let organization of organizations) {
        for (let catalogue of catalogues) {
            const [_, language, segment] = catalogue.split('/');
            if (language && segment && organization) {
                res.push({
                    language,
                    segment,
                    orgaslug: removeDiacritics(organization.attributes.Nom),
                });
            }
        }
    }

    return res;
}
