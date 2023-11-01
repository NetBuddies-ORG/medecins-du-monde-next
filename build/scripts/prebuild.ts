import {fetchOrganismes} from "./fetch-data/fetchOrganismes";
import {buildIndexes} from "./index-builder/build-indexes";
import {fetchPublics} from "./fetch-data/fetchPublics";
import {fetchCategories} from "./fetch-data/fetchCategories";
import {fetchTranslations} from "./fetch-data/fetchTranslations";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchOrganismes(),
    fetchCategories(),
    fetchTranslations(),
    fetchPublics(),
    buildIndexes()
]).then(() => console.info('Prebuild done!'));
