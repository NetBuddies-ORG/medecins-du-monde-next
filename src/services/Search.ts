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
  const { subCategoriesIds, publicsId } = params

  // 1. OPTIMISATION : Récupération parallèle des données (plus rapide)
  const [organismesList, categoriesList] = await Promise.all([
    db!.then(
      (data) =>
        data.getAll(organismesStoreName) as Promise<
          (Organisme & { id: string })[]
        >
    ),
    db!.then(
      (data) =>
        data.getAll(categoriesStoreName) as Promise<
          (Categorie & { id: string })[]
        >
    ),
  ])

  // Préparation : Créer un Set pour les IDs recherchés (recherche en O(1) au lieu de O(n))
  const searchIdsSet = new Set(subCategoriesIds || [])
  const hasSearchFilter = searchIdsSet.size > 0
  const hasPublicFilter = publicsId && publicsId !== '0'

  const scoredResults: {
    organisme: Organisme
    stats: SearchDebugInfo
  }[] = []

  // 2. BOUCLE UNIQUE : On itère une seule fois sur les organismes (Performance)
  for (const organisme of organismesList) {
    // --- FILTRE 1 : Public (Exclusion stricte) ---
    // Si le filtre public est actif et que l'organisme ne contient pas ce public -> on passe
    if (hasPublicFilter) {
      const orgPublics = organisme.public_specifiques?.data || []
      const matchPublic = orgPublics.some((p) => p.id === publicsId)
      if (!matchPublic) continue // Passe à l'organisme suivant immédiatement
    }

    // --- FILTRE 2 & CALCUL : Sous-catégories ---
    const orgSubCats = organisme.sous_categories?.data || []
    let matchedSubCats: any[] = []

    if (hasSearchFilter) {
      // On trouve les intersections
      matchedSubCats = orgSubCats.filter((sub) => searchIdsSet.has(sub.id))

      // Si aucun match, on exclut l'organisme (sauf si on veut afficher des résultats par défaut)
      if (matchedSubCats.length === 0) continue
    } else {
      // Si aucune recherche spécifiée, on peut décider de tout retourner ou rien (ici comportement par défaut)
      // matchedSubCats = [];
    }

    // --- CALCUL DES SCORES ---
    const matchCount = matchedSubCats.length
    const totalCount = orgSubCats.length

    // A. Ratio de Précision (Votre ancien score) : Qualité de la spécialisation
    // Evite la division par zéro
    const precisionRatio = totalCount > 0 ? matchCount / totalCount : 0

    // B. Score Combiné (Le correctif) : Volume * Précision
    // On met au carré le matchCount pour donner encore plus de poids au volume,
    // ou simplement matchCount * precisionRatio.
    // Formule choisie ici : Score = Matchs * (Matchs / Total)
    const combinedScore = matchCount * precisionRatio

    // Préparation des données Debug / Stats
    const debugInfo: SearchDebugInfo = {
      Nom: organisme.Nom,
      TotalSubCategories: totalCount,
      MatchedSubCategories: matchCount,
      PrecisionRatio: Number(precisionRatio.toFixed(2)),
      CombinedScore: Number(combinedScore.toFixed(2)),
      MatchedSubCategoryNames: matchedSubCats
        .map((s) => s.attributes?.Nom || s.id)
        .join(', '),
    }

    scoredResults.push({
      organisme,
      stats: debugInfo,
    })
  }

  // 3. TRI FINAL
  scoredResults.sort((a, b) => b.stats.CombinedScore - a.stats.CombinedScore)

  // --- NOUVELLE ETAPE : ÉCRÉMAGE (THRESHOLDING) ---

  // On ne garde que les résultats pertinents si on en a au moins un
  if (scoredResults.length > 0) {
    const bestScore = scoredResults[0].stats.CombinedScore

    // FACTEUR DE TOLÉRANCE (A ajuster selon vos tests)
    // 0.3 = On garde les organismes qui ont au moins 30% du score du premier
    // Si vous voulez être très sélectif, mettez 0.5 (50%)
    const relevanceThreshold = 0

    // FILTRE DE QUALITÉ MINIMALE
    // On veut éviter les résultats parasites (ex: 1 match sur 100 services)
    // On peut dire : score combiné doit être > 0.5 au minimum absolu
    const minAbsoluteScore = 0.05

    // Application du filtre
    const cutoffScore = Math.max(
      bestScore * relevanceThreshold,
      minAbsoluteScore
    )

    // On remplace la liste par la version filtrée
    const filteredResults = scoredResults.filter(
      (r) => r.stats.CombinedScore >= cutoffScore
    )

    // Optionnel : Limite dure (Top 20 max) pour ne pas noyer l'utilisateur
    // const finalResults = filteredResults.slice(0, 20);

    // Mise à jour de la variable à retourner
    scoredResults.length = 0 // Vide l'original (optimisation mémoire)
    scoredResults.push(...filteredResults)
  }

  // Retour
  return {
    organismes: scoredResults.map((r) => r.organisme),
    debug: scoredResults.map((r) => r.stats),
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
