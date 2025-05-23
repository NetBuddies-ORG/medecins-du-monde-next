const {createHash} = require("crypto");
const {readFile} = require("fs/promises");
const {join} = require("path");

async function getHash(file)
{
    const hash = createHash('md5');
    hash.update(await readFile(join(__dirname, './build/static/' + file)));
    return hash.digest('hex');
}

async function getVariables()
{
    try {
        return {
            STRAPI_CMS_BASE_URL: 'https://strapi.monboreseau.be',
            NEXT_PUBLIC_REVISION_ORGANISME: await getHash('organismes.json'),
            NEXT_PUBLIC_REVISION_PUBLICS: await getHash('publics.json'),
            NEXT_PUBLIC_REVISION_CATEGORIES: await getHash('categories.json'),
            NEXT_PUBLIC_REVISION_TRANSLATIONS: await getHash('translations.json'),
            NEXT_PUBLIC_REVISION_SERVICES: await getHash('services.json'),
        };
    } catch (e) {
        console.error(e);
    }
}

module.exports = getVariables();
