import lunr from 'lunr'
import { describe, expect, it } from 'vitest'
import {
  createOrganismesIndex,
  createSubCategoriesIndex,
} from '../../build/scripts/index-builder/indexes'
import { searchByKeyword } from './search'

// The browser loads the indexes from their JSON: test the same round trip
const roundTrip = (index: lunr.Index) =>
  lunr.Index.load(JSON.parse(JSON.stringify(index)))

const organismesIndex = roundTrip(
  createOrganismesIndex([
    {
      id: '1',
      Nom: 'Abri de nuit - CPAS de Mons',
      Adresse: '187, rue Henri Dunant - 7000 Mons',
      Departement: null,
    },
    {
      id: '2',
      Nom: 'Maison des jeunes Robert Beugnies',
      Adresse: "Rue de l'Aufilette, 81 - 7033 Cuesmes",
      Departement: null,
    },
    {
      id: '3',
      Nom: 'Centre de planning familial Les Arbas',
      Adresse: '100, rue des Arbalestriers - 7000 Mons',
      Departement: 'Planning',
    },
    {
      id: '4',
      Nom: 'Hôpital Ambroise Paré',
      Adresse: '2, boulevard Kennedy - 7000 Mons',
      Departement: 'Urgences',
    },
  ] as any)
)

const subCategoriesIndex = roundTrip(
  createSubCategoriesIndex([
    {
      id: '11',
      Nom: 'Logement',
      sous_categories: {
        data: [
          {
            id: '10',
            attributes: { Nom: 'Relogement', SearchTerms: ['appartement', 'loyer'] },
          },
          {
            id: '12',
            attributes: { Nom: "Hébergement d'urgence", SearchTerms: ['nuit', 'abri'] },
          },
        ],
      },
    },
  ])
)

const searchOrganismes = (keyword: string) =>
  searchByKeyword({ index: organismesIndex, params: { keyword } })
const searchSubCategories = (keyword: string) =>
  searchByKeyword({ index: subCategoriesIndex, params: { keyword } })

describe('searchByKeyword', () => {
  describe('organisations', () => {
    it('finds an organisation by a word of its name', async () => {
      expect(await searchOrganismes('abri')).toEqual(['1'])
    })

    it('ignores accents in the query and in the data', async () => {
      expect(await searchOrganismes('hopital')).toEqual(['4'])
      expect(await searchOrganismes('HÔPITAL')).toEqual(['4'])
    })

    it('matches the beginning of a word (autocomplete while typing)', async () => {
      expect(await searchOrganismes('plann')).toEqual(['3'])
    })

    it('tolerates a typo of one letter', async () => {
      expect(await searchOrganismes('beugnis')).toEqual(['2'])
    })

    it('finds an organisation by its address', async () => {
      expect(await searchOrganismes('cuesmes')).toEqual(['2'])
    })

    it('ranks first the organisation matching every word', async () => {
      const result = await searchOrganismes('planning mons')
      expect(result[0]).toBe('3')
    })

    it('returns each organisation once', async () => {
      const result = await searchOrganismes('mons')
      expect(new Set(result).size).toBe(result.length)
    })

    it('returns nothing for an empty query or only French stop words', async () => {
      expect(await searchOrganismes('')).toEqual([])
      expect(await searchOrganismes('de la des')).toEqual([])
    })

    it('does not throw on a query made only of spaces or punctuation (regression)', async () => {
      // lunr used to throw a QueryParseError, e.g. when typing a space in the home search box
      expect(await searchOrganismes('   ')).toEqual([])
      expect(await searchOrganismes(" - ' ")).toEqual([])
    })

    it('returns nothing when no organisation matches', async () => {
      expect(await searchOrganismes('xylophone')).toEqual([])
    })
  })

  describe('sub-categories (home page autocomplete)', () => {
    it('finds a sub-category by its name', async () => {
      expect(await searchSubCategories('relogement')).toEqual(['10'])
    })

    it('finds a sub-category by one of its search terms', async () => {
      expect(await searchSubCategories('appartement')).toEqual(['10'])
      expect(await searchSubCategories('nuit')).toEqual(['12'])
    })

    it('ignores accents in sub-category names', async () => {
      expect(await searchSubCategories('hebergement')).toEqual(['12'])
    })
  })
})

describe('searchByKeyword with the French stemmer', () => {
  // Cases taken from the real directory
  const frenchOrganismesIndex = roundTrip(
    createOrganismesIndex([
      { id: 'arbas', Nom: 'Centre de planning familial Les Arbas', Adresse: '7000 Mons', Departement: null },
      { id: 'famille-heureuse', Nom: 'Centre de Planning Familial La Famille Heureuse', Adresse: '7000 Mons', Departement: null },
      { id: 'pcs-dour', Nom: 'Plan de Cohésion Sociale de Dour', Adresse: '7370 Dour', Departement: null },
      { id: 'pcs-mons', Nom: 'Plan de Cohésion Sociale de Mons', Adresse: '7000 Mons', Departement: null },
    ] as any)
  )

  const frenchSubCategoriesIndex = roundTrip(
    createSubCategoriesIndex([
      {
        id: '11',
        Nom: 'Logement',
        sous_categories: {
          data: [
            { id: 'relogement', attributes: { Nom: 'Relogement', SearchTerms: [] } },
            { id: 'logement', attributes: { Nom: "Soutien à la recherche d'un autre logement", SearchTerms: [] } },
            { id: 'hebergement', attributes: { Nom: "Hébergement d'urgence/Temporaire", SearchTerms: [] } },
          ],
        },
      },
      {
        id: '20',
        Nom: 'Violences',
        sous_categories: {
          data: [
            { id: 'violences', attributes: { Nom: 'Violences conjugales', SearchTerms: [] } },
            { id: 'psy', attributes: { Nom: 'Soutien psychologique', SearchTerms: [] } },
          ],
        },
      },
    ])
  )

  const organismes = (keyword: string) =>
    searchByKeyword({ index: frenchOrganismesIndex, params: { keyword } })
  const subCategories = (keyword: string) =>
    searchByKeyword({ index: frenchSubCategoriesIndex, params: { keyword } })

  it('matches singular and plural forms both ways', async () => {
    expect(await subCategories('logements')).toContain('logement')
    expect(await subCategories('violence')).toEqual(['violences'])
    expect(await subCategories('hébergements')).toEqual(['hebergement'])
  })

  it('matches masculine and feminine forms', async () => {
    const familial = await organismes('familial')
    const familiale = await organismes('familiale')
    expect(familiale.sort()).toEqual(familial.sort())
    expect(familial.sort()).toEqual(['arbas', 'famille-heureuse'])
  })

  it('matches word families (adjective / noun)', async () => {
    expect(await subCategories('psychologie')).toEqual(['psy'])
  })

  it('does not reduce "planning" to "plan" (regression: the index used the English stemmer)', async () => {
    expect((await organismes('planning')).sort()).toEqual(['arbas', 'famille-heureuse'])
  })

  it('still finds a word typed beyond its stem, while typing', async () => {
    // "hébergement" is stemmed to "heberg": the prefix query "hebergem*" needs the whole word
    expect(await subCategories('hebergem')).toEqual(['hebergement'])
  })

  it('ranks the exact word first while typing', async () => {
    const result = await organismes('planni')
    expect(result.slice(0, 2).sort()).toEqual(['arbas', 'famille-heureuse'])
  })
})
