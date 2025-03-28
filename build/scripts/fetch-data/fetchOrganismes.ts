import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchOrganismes() {
    console.info('Fetching Organismes...');
    await buildCmsPageByCulture();
}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const organismes = (await client.getOrganismes()).organismes.data
        .map(item => ({ id: item.id, ...item.attributes}));

    await writeFile(join(__dirname, `../../static/organismes.json`), JSON.stringify(organismes), { encoding: 'utf8' });

}
