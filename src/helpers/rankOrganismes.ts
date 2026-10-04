import { SearchAccurateOrganizationParams } from '@/services/index-db/IndexDBTypes'

// Only the relations used by the ranking, so tests can use minimal organisations
export interface RankableOrganisme {
  public_specifiques?: { data: { id: string }[] }
  sous_categories?: { data: { id: string }[] }
}

const WEIGHT_PUBLIC = 0.65
const WEIGHT_SUBCATEGORY = 0.35

/**
 * Filters and orders organisations for the "search by filters" page.
 * - public: strict filter (an organisation must serve it)
 * - sub-categories: an organisation must match at least one of them (OR)
 * - the score only orders the results, most specialised first; it never excludes a match
 * - no filter at all: no result, to avoid listing the whole directory
 * `categoriesIds` is ignored: organisations are only linked to sub-categories.
 */
export function rankOrganismes<T extends RankableOrganisme>(
  organismes: T[],
  params: SearchAccurateOrganizationParams
): T[] {
  const { subCategoriesIds = [], publicsId } = params

  const searchSubCatSet = new Set(subCategoriesIds)
  const hasSubCategoryFilter = searchSubCatSet.size > 0
  const hasPublicFilter = publicsId && publicsId !== '0'

  if (!hasSubCategoryFilter && !hasPublicFilter) return []

  const scoredResults: { organisme: T; score: number }[] = []

  for (const organisme of organismes) {
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

    if (hasSubCategoryFilter) {
      const matchedSubCats = orgSubCats.filter((sub) =>
        searchSubCatSet.has(sub.id)
      )

      if (matchedSubCats.length === 0) continue

      const matchCount = matchedSubCats.length
      const totalOrgSubCats = orgSubCats.length
      const totalSearchSubCats = searchSubCatSet.size

      // Precision favours specialised organisations, recall those covering more of the search
      const precision = totalOrgSubCats > 0 ? matchCount / totalOrgSubCats : 0
      const recall =
        totalSearchSubCats > 0 ? matchCount / totalSearchSubCats : 0

      // F1-score
      subCategoryScore =
        precision + recall > 0
          ? (2 * precision * recall) / (precision + recall)
          : 0
    }

    const finalScore =
      WEIGHT_PUBLIC * publicScore + WEIGHT_SUBCATEGORY * subCategoryScore

    // Rounded to 2 decimals: ties in the ranking rely on it
    scoredResults.push({ organisme, score: Number(finalScore.toFixed(2)) })
  }

  // Stable sort: equal scores keep the data order
  scoredResults.sort((a, b) => b.score - a.score)

  return scoredResults.map((r) => r.organisme)
}
