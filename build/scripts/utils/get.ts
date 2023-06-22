import fetch from 'node-fetch';
import JWT from 'jsonwebtoken';

const {
    UMBRACO_CMS_BASE_URL,
    JWT_BACKEND_ISSUER: audience,
    JWT_FRONTEND_ISSUER: issuer,
    JWT_SECRET: secret,
} = process.env;

export async function getWithoutJWT(url): Promise<any>
{
    /** @type {Response} */
    const response = await fetch(url);
    if (!response.ok)
    {
        throw response.statusText;
    }

    return await response.json();
}

export async function get(endPoint, language = 'fr'): Promise<any>
{
    const headers = new Headers();
    headers.set('Accept-Language', language);
    headers.set('Authorization', `Bearer ${JWT.sign({}, secret as JWT.Secret, { algorithm: 'HS256', expiresIn: "5m", audience, issuer })}`);
    let url = `${UMBRACO_CMS_BASE_URL!.replace(/\/$/, '')}/${endPoint.replace(/^\//, '')}`;
    const response = await fetch(url, { headers });
    if (response.status === 404)
    {
        return null;
    }

    const result = await response.json();
    if (!response.ok)
    {
        throw result;
    }

    return result;
}
