import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchCategories() {
    console.info('Fetching Categories...');
    await buildCmsPageByCulture();
}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();
    const categories = (await client.getCategories()).categories.data
        .map(item => ({id: item.id, ...item.attributes}));
   await  writeFile(join(__dirname, `../../static/categories.json`), JSON.stringify(categories), { encoding: 'utf8' });
}