import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";



export async function fetchCategories() {
    console.info('Fetching Categories...');
    await buildCmsPageByCulture();
}

async function buildCmsPageByCulture() {
    const client = getStrapiClient();
    const pages = (await client.getCategories()).categories.data;
    writeFile(join(__dirname, `../../static/categories.json`), JSON.stringify(pages), { encoding: 'utf8' });
}