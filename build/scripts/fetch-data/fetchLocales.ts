import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchLocales() {
    console.info('Fetching Locales...');
    await buildCmsPageByCulture();
}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();
    const categories = (await client.getLocales()).i18NLocales.data
        .map(item => item.attributes.code);
    await writeFile(join(__dirname, `../../static/locales.json`), JSON.stringify(categories), { encoding: 'utf8' });
}