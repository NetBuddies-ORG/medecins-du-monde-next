async function getVariables()
{
    try {
        return {
            STRAPI_CMS_BASE_URL: 'http://127.0.0.1:1337',
        };
    } catch (e) {
        console.error(e);
    }
}

module.exports = getVariables();
