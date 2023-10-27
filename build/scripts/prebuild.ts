import {fetchOrganismes} from "./fetch-data/fetchOrganismes";
import {buildIndexes} from "./index-builder/build-indexes";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchOrganismes(),
    buildIndexes()
]).then(() => console.info('Prebuild done!'));
