import {fetchThematiques} from "./fetch-data/fetchThematiques";

console.info('Prebuild started...');

/* Write here procedures to execute before the build */
Promise.all([
    fetchThematiques()
]).then(() => console.info('Prebuild done!'));
