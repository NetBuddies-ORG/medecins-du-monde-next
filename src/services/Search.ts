import { Deferred } from '@/helpers'
import { Categorie, Organisme } from '@/services/GraphQL'
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
  debug: {
    Nom: string
    TotalSubCategories: number
    MatchedSubCategories: number
    SpecializationScore: number
    MatchedSubCategoryNames: string
  }[]
}> {
  const { subCategoriesIds, publicsId } = params

  // Récupération des données depuis IndexedDB
  const organismesFromIndexedDb: (Organisme & { id: string })[] =
    await db!.then((data) => data.getAll(organismesStoreName))
  const categoriesFromIndexedDb: (Categorie & { id: string })[] =
    await db!.then((data) => data.getAll(categoriesStoreName))

  // Reconstruction de l'arborescence des catégories sélectionnées
  const recomposedParamCategories: {
    [key: string]: { isComplete: boolean; subcat: string[] }
  } = {}
  if (subCategoriesIds && subCategoriesIds.length > 0) {
    categoriesFromIndexedDb.forEach((categorie) => {
      for (const subcat of categorie.sous_categories.data) {
        if (subCategoriesIds.includes(subcat.id)) {
          if (!recomposedParamCategories[categorie.id]) {
            recomposedParamCategories[categorie.id] = {
              isComplete: false,
              subcat: [],
            }
          }
          recomposedParamCategories[categorie.id].subcat.push(subcat.id)
        }
      }
      if (
        recomposedParamCategories[categorie.id] &&
        recomposedParamCategories[categorie.id].subcat.length ===
          categorie.sous_categories.data.length
      ) {
        recomposedParamCategories[categorie.id].isComplete = true
      }
    })
  }

  // Filtrage et calcul du score de spécialisation
  const resultWithScore = organismesFromIndexedDb
    .map((organisme) => {
      // Vérification public
      let isPublicsOk = true
      if (publicsId && publicsId !== '0') {
        isPublicsOk = organisme.public_specifiques.data
          .map((publicSpe) => publicSpe.id)
          .includes(publicsId)
      }

      // Vérification sous-catégories
      const categoriesOk: { [key: string]: boolean } = {}
      for (const catId in recomposedParamCategories) {
        if (recomposedParamCategories[catId].isComplete) {
          categoriesOk[catId] = organisme.sous_categories.data
            .map((cat) => cat.id)
            .some((subCatId) =>
              recomposedParamCategories[catId].subcat.includes(subCatId)
            )
        } else {
          categoriesOk[catId] = recomposedParamCategories[catId].subcat.every(
            (subCatId) =>
              organisme.sous_categories.data
                .map((cat) => cat.id)
                .includes(subCatId)
          )
        }
      }
      const isSubCategoriesOk = Object.values(categoriesOk).every((val) => val)

      // Calcul du score de spécialisation
      const matchedSubCategories = organisme.sous_categories.data.filter(
        (sub) => subCategoriesIds?.includes(sub.id)
      )
      const matchedSubCategoriesCount = matchedSubCategories.length
      const totalSubCategoriesCount = organisme.sous_categories.data.length
      const specializationScore =
        totalSubCategoriesCount > 0
          ? matchedSubCategoriesCount / totalSubCategoriesCount
          : 0

      return {
        organisme,
        isPublicsOk,
        isSubCategoriesOk,
        matchedSubCategories,
        matchedSubCategoriesCount,
        totalSubCategoriesCount,
        specializationScore,
      }
    })
    // Filtre uniquement les organismes valides
    .filter(
      ({ isPublicsOk, isSubCategoriesOk, matchedSubCategoriesCount }) =>
        isPublicsOk && isSubCategoriesOk && matchedSubCategoriesCount > 0
    )
    // Trie par score de spécialisation décroissant
    .sort((a, b) => b.specializationScore - a.specializationScore)

  // Préparer les données pour debug
  const debug = resultWithScore.map((r) => ({
    Nom: r.organisme.Nom,
    TotalSubCategories: r.totalSubCategoriesCount,
    MatchedSubCategories: r.matchedSubCategoriesCount,
    SpecializationScore: Number(r.specializationScore.toFixed(2)),
    MatchedSubCategoryNames: r.matchedSubCategories
      .map((s) => s.attributes.Nom)
      .join(', '),
  }))

  // Retourne la liste des organismes et les infos debug
  return {
    organismes: resultWithScore.map((r) => r.organisme),
    debug,
  }
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
