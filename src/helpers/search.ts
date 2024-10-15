import {
  SearchCategories,
  SearchOrganizationsParams,
  SearchServicesParams,
} from '@/services/index-db/IndexDBTypes'

export const stopWords = [
  'de',
  'la',
  'le',
  'les',
  'un',
  'une',
  'du',
  'des',
  'et',
  'en',
  'a',
  'au',
  'aux',
  'pour',
  'avec',
  'sans',
]

export async function searchByKeyword({
  index,
  params,
}: {
  index: any
  params: SearchServicesParams | SearchOrganizationsParams | SearchCategories
}) {
  const newKeyword = params.keyword
  const terms = newKeyword
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s*]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter((t) => !stopWords.includes(t.toLowerCase())) // Filtrer les stop words

  let finalQuery = ''

  // Si plusieurs termes, traiter comme une expression exacte
  if (terms.length > 1) {
    finalQuery = `"${terms.join(' ')}"`
  } else {
    terms.forEach((t, i) => {
      if (t !== '' && i === 0) {
        finalQuery += `${t}^${100 - i} ${t}*^10 ${t}~2 `
      } else {
        finalQuery += `${t}^${100 - i} `
      }
    })
  }

  const filteredResultsMedian = filterByScore(
    index.search(finalQuery).map(({ ref, score }) => ({ ref, score })),
    'mean'
  ).sort((a, b) => b.score - a.score)

  const results: Set<string> = new Set(filteredResultsMedian.map((i) => i.ref))
  return Array.from(results)
}

function filterByScore(
  results: { ref: string; score: number }[],
  method: 'mean' | 'median' = 'mean',
  tolerance: number = 1,
  minScore: number = 0.25
) {
  const scores = results.map((r) => r.score)
  let threshold = 0

  if (method === 'mean') {
    // Calculer la moyenne des scores
    const sum = scores.reduce((acc, val) => acc + val, 0)
    const mean = sum / scores.length

    // Calculer l'écart-type
    const variance =
      scores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      scores.length
    const stdDev = Math.sqrt(variance)

    // Ajuster le seuil avec un facteur d'écart-type (tolerance)
    threshold = mean - tolerance * stdDev
  } else if (method === 'median') {
    // Calculer la médiane des scores
    scores.sort((a, b) => a - b)
    const mid = Math.floor(scores.length / 2)
    threshold =
      scores.length % 2 === 0
        ? (scores[mid - 1] + scores[mid]) / 2
        : scores[mid]
  }

  // Prendre le maximum entre le seuil calculé et le seuil minimal absolu
  threshold = Math.max(threshold, minScore)

  // Filtrer les résultats avec des scores supérieurs au seuil ajusté
  return results.filter((r) => r.score >= threshold)
}
