import {fetchOrganismes} from "./fetch-data/fetchOrganismes";
import {buildIndexes} from "./index-builder/build-indexes";
import {fetchPublics} from "./fetch-data/fetchPublics";
import {fetchCategories} from "./fetch-data/fetchCategories";
import {fetchTranslations} from "./fetch-data/fetchTranslations";
import {fetchLocales} from "./fetch-data/fetchLocales";
import { fetchServices } from "./fetch-data/fetchServices";
import {buildSitemap} from "./utils/build-sitemap";

async function prebuild() {
    console.info('Prebuild started...');

    /* Fetch every dataset first: the indexes are built from the JSON files written here */
    await Promise.all([
        fetchLocales(),
        fetchTranslations(),
        fetchPublics(),
        fetchCategories(),
        fetchOrganismes(),
        fetchServices(),
        buildSitemap(),
    ]);

    await buildIndexes();

    console.info('Prebuild done!');
}

prebuild().catch((error) => {
    console.error('Prebuild failed', error);
    process.exit(1);
});
