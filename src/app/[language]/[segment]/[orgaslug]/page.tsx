import OrganizationDetails from '@/features/document-types/organization/Organization'
import { getStrapiClient } from '@/services/Strapi'
import { languages } from '@/helpers'
import organizations from '@/../build/static/organismes.json'
import { cache } from 'react'

type OrgaDetailsPageProps = {
  params: {
    language: string
    segment: string
    orgaslug: string
  }
}

export default async function OrgaDetailsPage({
  params: { language, segment, orgaslug },
}: OrgaDetailsPageProps) {
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
    (await client.getPages({ locale: language })).pages.data

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

  const res: OrgaDetailsPageProps['params'][] = []

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

export async function generateMetadata({
  params: { language, orgaslug },
}: OrgaDetailsPageProps) {
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
