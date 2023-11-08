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

    const publics = (await client.getPublics()).publicSpecifiques.data
        .flatMap(item => ({id: item.id, ...item.attributes}))

    await writeFile(join(__dirname, `../../static/publics.json`), JSON.stringify(publics), { encoding: 'utf8' });

}
