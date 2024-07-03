import { writeFile } from 'fs/promises'
import { join } from 'path'
import lunr from 'lunr'
import { removeDiacriticsSpelling } from './removeDiacriticsSpelling'
import { Organisme, Service } from '@/services/GraphQL'
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.fr')(lunr)

async function buildIndex() {
  const organismes = require(`../../static/organismes.json`)
  const services = require(`../../static/services.json`)
  const categories = require(`../../static/categories.json`)

  const index = lunr(function () {
    this.use(removeDiacriticsSpelling)
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
    organismes.forEach((p) => this.add(p))
  })

  const servicesIndex = lunr(function () {
    this.use(removeDiacriticsSpelling)
    this.ref('id')
    this.field('name_services', { extractor: (p: Service) => p.Nom })
    services.forEach((p) => this.add(p))
  })

  const categoriesIndex = lunr(function () {
    this.use(removeDiacriticsSpelling)
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

  const subCategoriesIndex = lunr(function () {
    this.use(removeDiacriticsSpelling)
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

  const jsonIndex = JSON.stringify(index)
  await writeFile(join(__dirname, `../../static/index.json`), jsonIndex, {
    encoding: 'utf-8',
  })

  const jsonServicesIndex = JSON.stringify(servicesIndex)
  await writeFile(
    join(__dirname, `../../static/indexService.json`),
    jsonServicesIndex,
    { encoding: 'utf-8' }
  )

  const jsonCategoriesIndex = JSON.stringify(categoriesIndex)
  await writeFile(
    join(__dirname, `../../static/indexCategorie.json`),
    jsonCategoriesIndex,
    { encoding: 'utf-8' }
  )

  const jsonSubCategoriesIndex = JSON.stringify(subCategoriesIndex)
  await writeFile(
    join(__dirname, `../../static/indexSubCategorie.json`),
    jsonSubCategoriesIndex,
    { encoding: 'utf-8' }
  )
}

export async function buildIndexes() {
  console.info('Build indexes...')
  await buildIndex()
}
