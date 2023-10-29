import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";
import {PublicSpecifique} from "@/services/GraphQL";



export async function fetchPublics() {
    console.info('Fetching Publics...');
    await buildCmsPageByCulture();

}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const pages = (await client.getPublics()).publicSpecifiques.data.map(item => item as unknown as PublicSpecifique);

    writeFile(join(__dirname, `../../static/publics.json`), JSON.stringify(pages), { encoding: 'utf8' });

}
