import {fetchThematiques} from "./fetch-data/fetchThematiques";
import {buildIndexes} from "./index-builder/build-indexes";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchThematiques(),
    buildIndexes()
]).then(() => console.info('Prebuild done!'));
