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

export type PageContent<PageType extends {} = GetPageQuery['page']> = Omit<GetPageQuery, 'page'> &
    {
        page: PageType;
    };

export const getUmbracoClient = () =>
{
    const client = new GraphQLClient(
        new URL("/graphql", umbracoCmsBaseUrl).toString());
    return getSdk(client);
};