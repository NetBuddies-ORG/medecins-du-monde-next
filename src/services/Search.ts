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

// Définition des interfaces pour la clarté (à adapter selon vos modèles réels)
interface SearchDebugInfo {
  Nom: string
  TotalSubCategories: number
  MatchedSubCategories: number
  PrecisionRatio: number // Ancien "SpecializationScore"
  CombinedScore: number // Nouveau Score
  MatchedSubCategoryNames: string
}

async function search(params: SearchAccurateOrganizationParams): Promise<{
  organismes: Organisme[]
  debug: SearchDebugInfo[]
}> {
  const { subCategoriesIds = [], publicsId } = params

  // --- CONFIGURATION DES POIDS ---
  const WEIGHT_PUBLIC = 0.65
  const WEIGHT_SUBCATEGORY = 0.35

  const MIN_FINAL_SCORE = 0.35 // élimine le bruit
  const RELATIVE_THRESHOLD = 0.4 // % du meilleur score
  const MAX_RESULTS = 20 // optionnel

  // --- RÉCUPÉRATION DES DONNÉES ---
  const [organismesList] = await Promise.all([
    db!.then(
      (data) =>
        data.getAll(organismesStoreName) as Promise<
          (Organisme & { id: string })[]
        >
    ),
  ])

  const searchSubCatSet = new Set(subCategoriesIds)
  const hasSubCategoryFilter = searchSubCatSet.size > 0
  const hasPublicFilter = publicsId && publicsId !== '0'

  const scoredResults: {
    organisme: Organisme
    stats: SearchDebugInfo & { FinalScore: number }
  }[] = []

  // --- BOUCLE PRINCIPALE ---
  for (const organisme of organismesList) {
    const orgPublics = organisme.public_specifiques?.data || []
    const orgSubCats = organisme.sous_categories?.data || []

    // ---------- SCORE PUBLIC ----------
    let publicScore = 0.5 // neutre par défaut

    if (hasPublicFilter) {
      const matchPublic = orgPublics.some((p) => p.id === publicsId)

      if (!matchPublic) continue // exclusion stricte
      publicScore = 1
    }

    // ---------- SCORE SOUS-CATÉGORIES ----------
    let subCategoryScore = 0

    let matchedSubCats: any[] = []

    if (hasSubCategoryFilter) {
      matchedSubCats = orgSubCats.filter((sub) => searchSubCatSet.has(sub.id))

      if (matchedSubCats.length === 0) continue

      const matchCount = matchedSubCats.length
      const totalOrgSubCats = orgSubCats.length
      const totalSearchSubCats = searchSubCatSet.size

      const precision = totalOrgSubCats > 0 ? matchCount / totalOrgSubCats : 0

      const recall =
        totalSearchSubCats > 0 ? matchCount / totalSearchSubCats : 0

      // F1-score
      subCategoryScore =
        precision + recall > 0
          ? (2 * precision * recall) / (precision + recall)
          : 0
    }

    // ---------- SCORE FINAL ----------
    const finalScore =
      WEIGHT_PUBLIC * publicScore + WEIGHT_SUBCATEGORY * subCategoryScore

    if (finalScore < MIN_FINAL_SCORE) continue

    scoredResults.push({
      organisme,
      stats: {
        Nom: organisme.Nom,
        TotalSubCategories: orgSubCats.length,
        MatchedSubCategories: matchedSubCats.length,
        PrecisionRatio: Number(
          (matchedSubCats.length / Math.max(orgSubCats.length, 1)).toFixed(2)
        ),
        RecallRatio: Number(
          (matchedSubCats.length / Math.max(searchSubCatSet.size, 1)).toFixed(2)
        ),
        SubCategoryScore: Number(subCategoryScore.toFixed(2)),
        PublicScore: Number(publicScore.toFixed(2)),
        FinalScore: Number(finalScore.toFixed(2)),
        MatchedSubCategoryNames: matchedSubCats
          .map((s) => s.attributes?.Nom || s.id)
          .join(', '),
      },
    })
  }

  // --- TRI ---
  scoredResults.sort((a, b) => b.stats.FinalScore - a.stats.FinalScore)

  // --- THRESHOLD RELATIF ---
  if (scoredResults.length > 0) {
    const bestScore = scoredResults[0].stats.FinalScore
    const cutoff = Math.max(bestScore * RELATIVE_THRESHOLD, MIN_FINAL_SCORE)

    const filtered = scoredResults.filter((r) => r.stats.FinalScore >= cutoff)

    scoredResults.length = 0
    scoredResults.push(...filtered)
  }

  // --- LIMITE FINALE ---
  const finalResults = scoredResults.slice(0, MAX_RESULTS)

  return {
    organismes: finalResults.map((r) => r.organisme),
    debug: finalResults.map((r) => r.stats),
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
