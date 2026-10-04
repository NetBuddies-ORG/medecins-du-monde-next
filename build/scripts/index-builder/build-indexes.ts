import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import {
  createCategoriesIndex,
  createOrganismesIndex,
  createServicesIndex,
  createSubCategoriesIndex,
} from './indexes'

// Read from disk (not require) so the indexes use the files just written by the fetchers
async function readStaticJson(file: string) {
  return JSON.parse(
    await readFile(join(__dirname, `../../static/${file}`), {
      encoding: 'utf-8',
    })
  )
}

async function buildIndex() {
  const [organismes, services, categories] = await Promise.all([
    readStaticJson('organismes.json'),
    readStaticJson('services.json'),
    readStaticJson('categories.json'),
  ])

  const index = createOrganismesIndex(organismes)
  const servicesIndex = createServicesIndex(services)
  const categoriesIndex = createCategoriesIndex(categories)
  const subCategoriesIndex = createSubCategoriesIndex(categories)

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
