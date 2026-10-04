import OrganizationDetails from '@/features/document-types/organization/Organization'
import { getAllData, getStrapiClient } from '@/services/Strapi'
import { languages } from '@/helpers'
import organizations from '@/../build/static/organismes.json'
import { cache } from 'react'

type OrgaDetailsParams = {
  language: string
  segment: string
  orgaslug: string
}

type OrgaDetailsPageProps = {
  params: Promise<OrgaDetailsParams>
}

export default async function OrgaDetailsPage({
  params,
}: OrgaDetailsPageProps) {
  const { language, segment, orgaslug } = await params
  return (
    <OrganizationDetails
      language={language}
      segment={segment}
      orgaslug={orgaslug}
    />
  )
}

export async function generateStaticParams() {
  const client = getStrapiClient()
  const catalogues: string[] = []
  const getPagesList = async (language: string) =>
    getAllData('pages', (await client.getPages({ locale: language })).pages)

  for (const language of languages) {
    try {
      for (const page of await getPagesList(language)) {
        if (page.attributes.ContentType === 'Organizations') {
          catalogues.push('/' + language + page.attributes.Url)
        }
      }
    } catch (missingLanguage) {
      console.error('MissingLanguage', language, missingLanguage)
    }
  }

  const res: OrgaDetailsParams[] = []

  for (const organization of organizations) {
    for (const catalogue of catalogues) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, language, segment] = catalogue.split('/')
      if (language && segment && organization) {
        res.push({
          language,
          segment,
          orgaslug: organization.generatedUrl,
        })
      }
    }
  }
  return res
}

export async function generateMetadata({ params }: OrgaDetailsPageProps) {
  const { language, orgaslug } = await params
  const organization = (await getOrganization(language, orgaslug)).organismes
    ?.data[0]?.attributes

  return {
    applicationName: 'MonBo Réseau',
    title: 'MonBo Réseau - ' + organization?.Nom,
    description: organization?.Description.slice(0, 100) + '...',
    robots: organization?.Referencement_internet ? undefined : 'noindex',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'MonBo Réseau - ' + organization?.Nom,
    },
  }
}

const getOrganization = cache(async function getCategories(
  lang: string,
  slug: string
) {
  const client = getStrapiClient()
  return await client.getOrganismes({
    locale: lang,
    //@ts-expect-error generated type
    filters: { generatedUrl: { eq: slug } },
  })
})
