import {fetchOrganismes} from "./fetch-data/fetchOrganismes";
import {buildIndexes} from "./index-builder/build-indexes";
import {fetchPublics} from "./fetch-data/fetchPublics";
import {fetchCategories} from "./fetch-data/fetchCategories";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchOrganismes(),
    fetchCategories(),
    fetchPublics(),
    buildIndexes()
]).then(() => console.info('Prebuild done!'));
