import { Deferred } from '@/helpers'
import { Organisme } from '@/services/GraphQL'
import { useAsync } from 'react-use'
import {
  categoriesStoreName,
  MdmDB,
  organismesStoreName,
  publicsStoreName,
  SearchAccurateOrganizationParams,
  SearchCategories,
  SearchInterface,
  SearchOrganizationsParams,
  SearchServicesParams,
} from '@/services/index-db/IndexDBTypes'
import { setupDB } from '@/services/index-db/IndexDBConfig'
import { IDBPDatabase } from 'idb'
import { Index } from 'lunr'
import { searchByKeyword } from '@/helpers/search'
import { rankOrganismes } from '@/helpers/rankOrganismes'

const getOrganisme = (slug: string) => {
  return db?.then((data) =>
    data.transaction('organismes').store.index('slug').get(slug)
  )
}
let db: Promise<IDBPDatabase<MdmDB>> | undefined = undefined
let indexLanguage: string
let indexOrganism: Index
let indexService: Index
let indexCategorie: Index
let indexSubCategorie: Index

const initialization = new Map<string, Promise<void>>()

async function initialize(language: string = 'fr') {
  if (typeof window === 'undefined' || indexLanguage === language) {
    await initialization.get(language)
    return
  }
  const deferred = new Deferred()
  initialization.set(language, deferred.promise)
  indexLanguage = language
  db = setupDB(language, db)
  const [{ default: lunr }, { default: stemmer }] = await Promise.all([
    import('lunr'),
    import('lunr-languages/lunr.stemmer.support'),
    import('../helpers/removeDiacriticsSpelling'),
  ])
  stemmer(lunr)

  const { default: fr } = await import('lunr-languages/lunr.fr')
  fr(lunr)
  indexOrganism = lunr.Index.load(await import('../../build/static/index.json'))
  indexService = lunr.Index.load(
    await import('../../build/static/indexService.json')
  )
  indexCategorie = lunr.Index.load(
    await import('../../build/static/indexCategorie.json')
  )
  indexSubCategorie = lunr.Index.load(
    await import('../../build/static/indexSubCategorie.json')
  )

  deferred.resolve()
}

async function search(params: SearchAccurateOrganizationParams): Promise<{
  organismes: Organisme[]
}> {
  const organismes = await db!.then(
    (data) =>
      data.getAll(organismesStoreName) as Promise<(Organisme & { id: string })[]>
  )
  return { organismes: rankOrganismes(organismes, params) }
}

async function searchOrganismes(
  params: SearchOrganizationsParams
): Promise<string[]> {
  return await searchByKeyword({ index: indexOrganism, params })
}

async function searchServices(params: SearchServicesParams): Promise<string[]> {
  return await searchByKeyword({ index: indexService, params: params })
}

async function searchCategories(params: SearchCategories): Promise<string[]> {
  return await searchByKeyword({ index: indexCategorie, params })
}

async function searchSubCategories(
  params: SearchCategories
): Promise<string[]> {
  return await searchByKeyword({ index: indexSubCategorie, params })
}

export function useDBIndex(language: string): SearchInterface {
  const { loading } = useAsync(() => initialize(language), [language])

  return <SearchInterface>{
    isReady: !loading,
    search: !loading
      ? search
      : () => Promise.reject(new Error('Search engine is not ready')),
    getOrganisme: !loading
      ? getOrganisme
      : () => Promise.reject(new Error('DB is not ready')),
    getOrganismes: !loading
      ? searchOrganismes
      : () => Promise.reject(new Error('Search engine is not ready')),
    async getPublics(): Promise<any[]> {
      const data = await db!
      return await data.getAll(publicsStoreName)
    },
    searchCategories: !loading
      ? searchCategories
      : () => Promise.reject(new Error('Search engine is not ready')),
    searchSubCategories: !loading
      ? searchSubCategories
      : () => Promise.reject(new Error('Search engine is not ready')),
    async getCategories(): Promise<any[]> {
      const data = await db!
      return await data.getAll(categoriesStoreName)
    },
    getServices: !loading
      ? searchServices
      : () => Promise.reject(new Error('Search engine is not ready')),
  }
}
