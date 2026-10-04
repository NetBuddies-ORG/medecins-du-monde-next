import { describe, expect, it } from 'vitest'
import { RankableOrganisme, rankOrganismes } from './rankOrganismes'

// Minimal organisation: only the relations the ranking reads
function orga(
  id: string,
  { publics = [], subCategories = [] }: { publics?: string[]; subCategories?: string[] }
) {
  return {
    id,
    public_specifiques: { data: publics.map((p) => ({ id: p })) },
    sous_categories: { data: subCategories.map((s) => ({ id: s })) },
  }
}

const ids = (organismes: { id: string }[]) => organismes.map((o) => o.id)

// Sub-category ids
const RELOGEMENT = '10'
const ENERGIE = '14'
const HEBERGEMENT = '12'
// Public ids
const SANS_ABRI = '6'
const JEUNE = '1'

// A generalist organisation covers many sub-categories
const manySubCategories = (count: number, ...extra: string[]) => [
  ...extra,
  ...Array.from({ length: count }, (_, i) => `other-${i}`),
]

describe('rankOrganismes', () => {
  describe('without any filter', () => {
    const organismes = [orga('a', { publics: [SANS_ABRI], subCategories: [RELOGEMENT] })]

    it('returns nothing rather than the whole directory', () => {
      expect(rankOrganismes(organismes, { categoriesIds: [] })).toEqual([])
    })

    it('treats the "Aucun" public (0) and an empty public as no filter', () => {
      expect(rankOrganismes(organismes, { categoriesIds: [], publicsId: '0' })).toEqual([])
      expect(rankOrganismes(organismes, { categoriesIds: [], publicsId: '' })).toEqual([])
    })

    it('ignores categoriesIds: organisations are only linked to sub-categories', () => {
      expect(rankOrganismes(organismes, { categoriesIds: ['11'] })).toEqual([])
    })
  })

  describe('public filter', () => {
    it('keeps exactly the organisations serving the public', () => {
      const organismes = [
        orga('serves', { publics: [SANS_ABRI, JEUNE] }),
        orga('other-public', { publics: [JEUNE] }),
        orga('no-public', {}),
        orga('serves-too', { publics: [SANS_ABRI] }),
      ]

      const result = rankOrganismes(organismes, { categoriesIds: [], publicsId: SANS_ABRI })

      expect(ids(result)).toEqual(['serves', 'serves-too'])
    })

    it('is combined with the sub-categories: both must match', () => {
      const organismes = [
        orga('both', { publics: [SANS_ABRI], subCategories: [RELOGEMENT] }),
        orga('sub-category-only', { publics: [JEUNE], subCategories: [RELOGEMENT] }),
        orga('public-only', { publics: [SANS_ABRI], subCategories: [ENERGIE] }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT],
        publicsId: SANS_ABRI,
      })

      expect(ids(result)).toEqual(['both'])
    })
  })

  describe('sub-category filter', () => {
    it('keeps the organisations matching at least one selected sub-category (OR)', () => {
      const organismes = [
        orga('relogement', { subCategories: [RELOGEMENT] }),
        orga('energie', { subCategories: [ENERGIE] }),
        orga('hebergement', { subCategories: [HEBERGEMENT] }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT, ENERGIE],
      })

      expect(ids(result).sort()).toEqual(['energie', 'relogement'])
    })

    it('lists an organisation once even if it matches several selected sub-categories', () => {
      // 2 organisations in Relogement + 2 in Énergie, one of them in both: 3 results, not 4
      const organismes = [
        orga('relogement', { subCategories: [RELOGEMENT] }),
        orga('both', { subCategories: [RELOGEMENT, ENERGIE] }),
        orga('energie', { subCategories: [ENERGIE] }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT, ENERGIE],
      })

      expect(result).toHaveLength(3)
      expect(new Set(ids(result)).size).toBe(3)
    })

    it('keeps generalist organisations when no public is selected (regression)', () => {
      // A minimum score used to hide organisations covering ~28+ sub-categories without a public
      const organismes = [
        orga('specialist', { subCategories: [RELOGEMENT] }),
        orga('generalist', { subCategories: manySubCategories(32, RELOGEMENT) }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT],
      })

      expect(ids(result)).toEqual(['specialist', 'generalist'])
    })

    it('never gives more results when a public is added', () => {
      const organismes = [
        orga('specialist', { publics: [SANS_ABRI], subCategories: [RELOGEMENT] }),
        orga('generalist', {
          publics: [SANS_ABRI],
          subCategories: manySubCategories(32, RELOGEMENT),
        }),
      ]
      const withoutPublic = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT],
      })
      const withPublic = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT],
        publicsId: SANS_ABRI,
      })

      expect(withPublic.length).toBeLessThanOrEqual(withoutPublic.length)
    })
  })

  describe('ordering', () => {
    it('puts the most specialised organisations first', () => {
      const organismes = [
        orga('generalist', { subCategories: manySubCategories(10, RELOGEMENT) }),
        orga('specialist', { subCategories: [RELOGEMENT] }),
        orga('semi', { subCategories: manySubCategories(2, RELOGEMENT) }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT],
      })

      expect(ids(result)).toEqual(['specialist', 'semi', 'generalist'])
    })

    it('puts first the organisations covering more of the selected sub-categories', () => {
      const organismes = [
        orga('one-of-two', { subCategories: [RELOGEMENT] }),
        orga('both', { subCategories: [RELOGEMENT, ENERGIE] }),
      ]

      const result = rankOrganismes(organismes, {
        categoriesIds: [],
        subCategoriesIds: [RELOGEMENT, ENERGIE],
      })

      expect(ids(result)).toEqual(['both', 'one-of-two'])
    })

    it('keeps the data order between organisations with the same score', () => {
      const organismes = ['c', 'a', 'b'].map((id) => orga(id, { publics: [SANS_ABRI] }))

      const result = rankOrganismes(organismes, { categoriesIds: [], publicsId: SANS_ABRI })

      expect(ids(result)).toEqual(['c', 'a', 'b'])
    })
  })

  it('returns every match, without any cap (regression: results used to stop at 20)', () => {
    const organismes = Array.from({ length: 31 }, (_, i) =>
      orga(`orga-${i}`, { publics: [SANS_ABRI] })
    )

    const result = rankOrganismes(organismes, { categoriesIds: [], publicsId: SANS_ABRI })

    expect(result).toHaveLength(31)
  })

  it('handles organisations without any public or sub-category', () => {
    const empty: RankableOrganisme & { id: string } = { id: 'empty' }
    const organismes = [empty, orga('match', { subCategories: [RELOGEMENT] })]

    const result = rankOrganismes(organismes, {
      categoriesIds: [],
      subCategoriesIds: [RELOGEMENT],
    })

    expect(ids(result)).toEqual(['match'])
  })
})
