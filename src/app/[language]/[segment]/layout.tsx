import { notFound } from 'next/navigation'
import { setFooter, setHeader, setLanguage, setPage } from '@/context/server'
import { cache, PropsWithChildren } from 'react'
import { getStrapiClient } from '@/services/Strapi'
import { PageFiltersInput } from '@/services/GraphQL'
import { CustomHeader } from '@/features/common/header/Header'
import { CustomFooter } from '@/features/common/footer/footer'

const getPage = cache(async function getPage(locale: string, url: string) {
  const client = getStrapiClient()
  const filters: PageFiltersInput = {
    // @ts-expect-error generated type
    Url: {
      eq: url,
    },
  }
  return await client.getPage({ locale: locale, filters: filters })
})

const getHeader = cache(async function getHeader(language: string) {
  const client = getStrapiClient()
  return await client.getHeader({ locale: language })
})

const getFooter = cache(async function getFooter(language: string) {
  const client = getStrapiClient()
  return await client.getFooter({ locale: language })
})

type OrganizationDetailsLayoutProps = PropsWithChildren<{
  params: {
    language: string
    segment: string
  }
}>
export default async function OrganizationDetailsLayout({
  children,
  params: { language, segment },
}: OrganizationDetailsLayoutProps) {
  const { pages } = await getPage(language, '/' + segment)
  const header = await getHeader(language)
  const footer = await getFooter(language)

  if (!pages?.data[0]) notFound()
  setPage(pages)
  setHeader(header)
  setFooter(footer)
  setLanguage(language)

  return (
    <>
      <CustomHeader />
      <main>{children}</main>
      <CustomFooter />
    </>
  )
}
