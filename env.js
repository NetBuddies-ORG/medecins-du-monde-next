async function getVariables()
{
    return {
        UMBRACO_CMS_BASE_URL: 'https://medecins-du-monde.azurewebsites.net/umbraco/api',
        DOMAIN: 'https://next.pass.visitwallonia.be/',
        PREVIEW: 0,
    };
}

module.exports = getVariables();