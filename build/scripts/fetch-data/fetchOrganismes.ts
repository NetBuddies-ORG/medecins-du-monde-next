import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchOrganismes() {
    console.info('Fetching Organismes...');
    await buildCmsPageByCulture();

}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const pages = (await client.getOrganismes()).organismes.data;

    writeFile(join(__dirname, `../../static/organismes.json`), JSON.stringify(pages), { encoding: 'utf8' });

}
