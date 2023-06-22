import { GraphQLClient } from 'graphql-request';
import { getConfiguration } from '../helpers/config';
import {getSdk} from "../services/GraphQL";

const {} = getConfiguration();

export const getStrapiClient = () =>
{
    const client = new GraphQLClient(
        new URL("/graphql", 'http://127.0.0.1:1337').toString());
    return getSdk(client);
};
