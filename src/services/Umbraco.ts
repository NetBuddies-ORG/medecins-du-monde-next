import { GraphQLClient } from 'graphql-request';
import { sign } from 'jsonwebtoken';
import { getConfiguration } from '@/helpers/config';
import {GetPageQuery, getSdk} from "@/services/GraphQL";

const {
    umbracoCmsBaseUrl,
    jwt: {
        secret,
        backendIssuer: audience,
        frontendIssuer: issuer
    }
} = getConfiguration();

export const getUmbracoClient = () =>
{
    const client = new GraphQLClient(new URL("/graphql", umbracoCmsBaseUrl).toString());
    console.log(client);
    return getSdk(client);
};