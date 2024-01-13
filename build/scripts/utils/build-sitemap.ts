import {languages} from "../../../src/helpers/config";
import {getStrapiClient} from "../../../src/services/Strapi";
import {writeFile} from "fs/promises";
import {join} from "path";

const baseDomain = new URL(`https://strapi.monboreseau.be/`);
const client = getStrapiClient();
const priority = (url: string) => Math.pow(0.8, Math.max(0, url.split('/').length - 3));
const { format } = new Intl.NumberFormat('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
const fixDates = /\.\d+Z$/;

export async function buildSitemap() {
    for (const language of languages){
        buildSitemapByCulture(language);
    }
}

async function buildSitemapByCulture(language) {

    /* Fetch all the umbraco's pages by culture */
    // @ts-ignore
    const pages = await client.getPages({ culture: language });

    /* Write pages sitemap here */
    const pagesSitemap =
        pages.pages.data.map((page) => '<url>' +
            `<loc>${new URL(language + page.attributes.Url, baseDomain)}</loc>` +
            `<lastmod>${new Date().toISOString().replace(fixDates, 'Z')}</lastmod>` +
            `<priority>${format(priority(page.attributes.Url))}</priority>` +
            '</url>').join('');

    const organismesSitemap = (await client.getOrganismes()).organismes.data
        .map(item => item.attributes.Referencement_internet && '<url>' +
            `<loc>${new URL(language + '/organismes/' + item.attributes.generatedUrl, baseDomain)}</loc>` +
            `<lastmod>${new Date().toISOString().replace(fixDates, 'Z')}</lastmod>` +
            `<priority>${format(priority(item.attributes.generatedUrl))}</priority>` +
            '</url>').join('');

    const sitemap= '<?xml version="1.0" encoding="utf-8" standalone="yes"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + pagesSitemap
        + organismesSitemap
        + '</urlset>';

    writeFile(join(__dirname, `../../../public/sitemap-${language}.xml`), sitemap, { encoding: 'utf8' });
}
