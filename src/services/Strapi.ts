import { GraphQLClient } from 'graphql-request'
import { getConfiguration } from '../helpers/config'
import { getSdk } from '../services/GraphQL'
import * as process from 'process'

const {} = getConfiguration()

export const getStrapiClient = () => {
  const client = new GraphQLClient(
    new URL('/graphql', process.env.STRAPI_CMS_BASE_URL).toString()
  )
  return getSdk(client)
}
