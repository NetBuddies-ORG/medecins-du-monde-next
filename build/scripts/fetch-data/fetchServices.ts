import { writeFile } from "fs/promises";
import { join } from "path";
import { getAllData, getStrapiClient } from "../../../src/services/Strapi";



export async function fetchServices() {
    console.info('Fetching Services...');
    await buildCmsPageByCulture();
}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();

    const services = getAllData('services', (await client.getServices()).services)
        .map(item => ({ id: item.id, ...item.attributes}));

    await writeFile(join(__dirname, `../../static/services.json`), JSON.stringify(services), { encoding: 'utf8' });

}
