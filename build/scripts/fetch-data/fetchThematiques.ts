import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchThematiques() {
    console.info('Fetching thematiques...');
    await buildCmsPageByCulture();

}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const pages = (await client.getThematiques()).thematiques.data;

    writeFile(join(__dirname, `../../static/thematiques.json`), JSON.stringify(pages), { encoding: 'utf8' });

}
