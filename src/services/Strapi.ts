import { GraphQLClient } from 'graphql-request'
import { strapiBaseUrl } from '../helpers/config'
import { getSdk } from '../services/GraphQL'

export const getStrapiClient = () => {
  const client = new GraphQLClient(
    new URL('/graphql', strapiBaseUrl).toString()
  )
  return getSdk(client)
}
