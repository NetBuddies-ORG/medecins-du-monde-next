import lunr from 'lunr'
import stemmerSupport from 'lunr-languages/lunr.stemmer.support'
import french from 'lunr-languages/lunr.fr'
import { removeDiacriticsSpelling } from './removeDiacriticsSpelling'
import { Organisme, Service } from '@/services/GraphQL'

// Index definitions shared by the prebuild (build-indexes.ts) and the search tests,
// so the tests exercise exactly the indexes shipped to the browser.

stemmerSupport(lunr)
french(lunr)
const frenchStemmer = (lunr as any).fr.stemmer as lunr.PipelineFunction

// Indexes both the French stem ("logements" -> "log") and the whole word. Exact queries are
// stemmed, so plurals and word families match; prefix queries ("hebergem*", typed while
// searching) are not stemmed by lunr and need the whole word ("hebergement").
const stemKeepingWord: lunr.PipelineFunction = (token, i, tokens) => {
  const stem = frenchStemmer(token.clone(), i, tokens) as lunr.Token
  return stem.toString() === token.toString() ? token : [token, stem]
}
lunr.Pipeline.registerFunction(stemKeepingWord, 'stemKeepingWord-fr')

// French trimmer, stop words and stemmer, accents removed before stemming. The search pipeline
// serialised with the index ends up as [removeDiacriticsSpelling, stemmer-fr].
function useFrench(builder: lunr.Builder) {
  builder.use((lunr as any).fr)
  builder.use(removeDiacriticsSpelling)
  builder.pipeline.after(frenchStemmer, stemKeepingWord)
  builder.pipeline.remove(frenchStemmer)
}

export function createOrganismesIndex(organismes: (Organisme & { id: string })[]) {
  return lunr(function () {
    useFrench(this)
    this.ref('id')

    this.field('name_organismes', {
      extractor: (p: Organisme) => p.Nom,
    })
    this.field('address_organismes', {
      extractor: (p: Organisme) => p.Adresse,
      boost: 0.5,
    })
    this.field('department_organismes', {
      extractor: (p: Organisme) => p.Departement,
      boost: 0.5,
    })
    this.field('search_text', {
      extractor: (p: Organisme) =>
        `${p.Nom} ${p.Adresse ?? ''} ${p.Departement ?? ''}`
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/[^\w\s]/g, '')
          .toLowerCase(),
      boost: 2,
    })

    organismes.forEach((p) => this.add(p))
  })
}

export function createServicesIndex(services: (Service & { id: string })[]) {
  return lunr(function () {
    useFrench(this)
    this.ref('id')
    this.field('name_services', { extractor: (p: Service) => p.Nom })
    services.forEach((p) => this.add(p))
  })
}

export function createCategoriesIndex(categories: any[]) {
  return lunr(function () {
    useFrench(this)
    this.ref('id')
    this.field('name_category')
    this.field('name_sub_category')
    this.field('searchTerms')
    categories.forEach((p) =>
      this.add({
        id: p.id,
        name_category: p.Nom,
        name_sub_category: p.sous_categories.data
          .map((s) => s.attributes.Nom)
          .join(' '),
        searchTerms: p.sous_categories.data
          .map((s) => s.attributes.SearchTerms)
          .join(' '),
      })
    )
  })
}

export function createSubCategoriesIndex(categories: any[]) {
  return lunr(function () {
    useFrench(this)
    this.ref('id')
    this.field('subcategory')
    this.field('searchTerms', { boost: 15 })
    categories.forEach((p) =>
      p.sous_categories.data.forEach((s) => {
        this.add({
          id: s.id,
          subcategory: s.attributes.Nom,
          searchTerms: s.attributes?.SearchTerms?.join(' '),
        })
      })
    )
  })
}
