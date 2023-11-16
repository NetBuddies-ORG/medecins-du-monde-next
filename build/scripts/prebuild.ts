import {fetchOrganismes} from "./fetch-data/fetchOrganismes";
import {buildIndexes} from "./index-builder/build-indexes";
import {fetchPublics} from "./fetch-data/fetchPublics";
import {fetchCategories} from "./fetch-data/fetchCategories";
import {fetchTranslations} from "./fetch-data/fetchTranslations";
import {fetchLocales} from "./fetch-data/fetchLocales";
import { fetchServices } from "./fetch-data/fetchServices";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchLocales(),
    fetchTranslations(),
    fetchPublics(),
    fetchCategories(),
    fetchOrganismes(),
    fetchServices(),
    buildIndexes()
]).then(() => console.info('Prebuild done!'));
