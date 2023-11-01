import {getStrapiClient} from "../../../src/services/Strapi";
import {languages} from "../../../src/helpers";
import {writeFile} from "fs/promises";
import {join} from "path";

export async function fetchTranslations() {
    console.info('Fetching Translations...');
    await buildCmsPageByCulture();

}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const result = {};

    for (let language of languages) {
        const translations = (await client.getTranslations({ locale: language })).traductions.data
            .map(item => item);

        const languageTranslations = translations
            .flatMap(item => item.attributes)
            .reduce((result, item) => {
                result[item.Key] = item.Traduction;
                return result;
            }, {});

        result[language] = {translation: languageTranslations};
    }

    writeFile(join(__dirname, `../../static/translations.json`), JSON.stringify(result), { encoding: 'utf8' });
}