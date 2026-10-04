import { GraphQLClient } from 'graphql-request'
import { strapiBaseUrl } from '../helpers/config'
import { getSdk } from '../services/GraphQL'

export const getStrapiClient = () => {
  const client = new GraphQLClient(
    new URL('/graphql', strapiBaseUrl).toString()
  )
  return getSdk(client)
}

type StrapiCollection<T> = {
  data: T[]
  meta: { pagination: { total: number } }
}

// Queries ask for `pagination: { limit: 1000 }` and Strapi may cap it lower (maxLimit):
// fail the build instead of silently publishing a truncated collection
export function getAllData<T>(label: string, collection: StrapiCollection<T>): T[] {
  const { total } = collection.meta.pagination
  if (collection.data.length < total) {
    throw new Error(
      `Strapi: ${label} truncated (${collection.data.length}/${total}). Raise the pagination limit or paginate the query.`
    )
  }
  return collection.data
}
