import { cache } from 'react'
import { getStrapiClient } from '@/services/Strapi'
import { notFound } from 'next/navigation'
import {
  FaArrowUpRightFromSquare,
  FaEnvelope,
  FaGlobe,
  FaPhone,
} from 'react-icons/fa6'
import { OrganizationMap } from '@/features/document-types/organization/OrganizationMap'
import { IconComponent } from '@/features/common/react-icons/IconComponent'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Maybe, Organisme } from '@/services/GraphQL'
import Link from 'next/link'

const getOrganization = cache(async function getCategories(
  lang: string,
  slug: string
) {
  const client = getStrapiClient()
  return await client.getOrganismes({
    locale: lang,
    // @ts-ignore
    filters: { generatedUrl: { eq: slug } },
  })
})

type OrganizationDetailsProps = {
  language: string
  segment: string
  orgaslug: string
}
export default async function OrganizationDetails({
  language,
  segment,
  orgaslug,
}: OrganizationDetailsProps) {
  let organization: Maybe<Organisme>
  try {
    // @ts-ignore
    organization = (await getOrganization(language, orgaslug)).organismes
      ?.data[0]?.attributes
  } catch (e) {
    notFound()
  }

  if (!organization) notFound()

  function formatWebAdress(website: string) {
    if (website.includes('http')) return website
    return 'https://' + website
  }

  function formatSize(website: string) {
    const regex = /^(https?:\/\/)?([^\/]+)\/?/
    const match = website.match(regex)
    return match
      ? match[1]
        ? match[1] + match[2]
        : 'https://' + match[2]
      : null
  }

  return (
    <>
      <div className="page-container">
        <div className="details-container">
          <div className="details-container__header">
            <div className="image-container">
              {organization?.Logo?.data ? (
                <img
                  alt="Logo"
                  src={organization?.Logo?.data?.attributes?.url}
                />
              ) : (
                <>
                  <br />
                </>
              )}
            </div>
            <h2>{organization?.Nom}</h2>
            {organization?.Departement && <h3>{organization?.Departement}</h3>}
          </div>
          <div className="details-container__body">
            <div className="intro__card">{organization?.Description}</div>
            <div className="contact__card">
              <h3>Contactez-nous</h3>
              <ul>
                {organization?.Telephone && (
                  <li>
                    <FaPhone />
                    <span>
                      <a href={'tel:' + organization?.Telephone}>
                        {organization?.Telephone}
                      </a>
                    </span>
                  </li>
                )}
                {organization?.Adresse && (
                  <li>
                    <FaMapMarkerAlt />
                    <span>
                      <a
                        target={'_blank'}
                        href={
                          'https://www.google.com/maps/search/' +
                          organization?.Adresse
                        }
                      >
                        {organization?.Adresse}
                      </a>
                    </span>
                  </li>
                )}
                {organization?.Email && (
                  <li>
                    <FaEnvelope />
                    <span>
                      <a href={'mailto:' + organization?.Email}>
                        {organization?.Email}
                      </a>
                    </span>
                  </li>
                )}
                {organization?.Website && (
                  <li>
                    <FaGlobe />
                    <span>
                      <a
                        target={'_blank'}
                        href={formatWebAdress(organization?.Website)}
                      >
                        {formatSize(organization?.Website)}
                        <FaArrowUpRightFromSquare
                          style={{ fontSize: '.75rem', marginLeft: '.25rem' }}
                        />
                      </a>
                    </span>
                  </li>
                )}
              </ul>
            </div>
            {organization?.Horaires && (
              <div className="schedules__card">
                <h3>Horaires</h3>
                {organization?.Horaires && (
                  <div
                    dangerouslySetInnerHTML={{ __html: organization?.Horaires }}
                  ></div>
                )}
              </div>
            )}
            {organization?.langues?.data?.length > 0 && (
              <div className="languages__card">
                <h3>Langues</h3>
                <ul>
                  {organization?.langues.data.map((item) => (
                    <li key={item.attributes.Nom}>
                      <span>{item.attributes.Nom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {organization?.Conditions && (
              <div className="access-conditions__card">
                <h3>{"Plus d'informations"}</h3>
                {organization?.Conditions && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: organization?.Conditions,
                    }}
                  ></div>
                )}
              </div>
            )}
            {organization?.Latitude && organization?.Longitude && (
              <div className="map">
                <h3>Carte</h3>
                <OrganizationMap
                  latitude={organization.Latitude}
                  longitude={organization.Longitude}
                  canScrollZoom={false}
                  canMove={false}
                  zoom={15}
                />
              </div>
            )}
            {organization?.services?.data?.length > 0 && (
              <div className="services__card">
                <h3>Services</h3>
                <ul className="social-functions">
                  {organization?.services?.data
                    ?.sort((a, b) => {
                      if (
                        a.attributes.Nom.toLowerCase() <
                        b.attributes.Nom.toLowerCase()
                      )
                        return -1
                      if (
                        a.attributes.Nom.toLowerCase() >
                        b.attributes.Nom.toLowerCase()
                      )
                        return 1
                      return 0
                    })
                    .map((item) => {
                      return (
                        <li key={item.attributes.Nom}>
                          <Link href={'/fr/organismes/?service=' + item.id}>
                            <IconComponent icon={item.attributes.Icone} />
                            <span>{item.attributes.Nom}</span>
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1694936473">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </>
  )
}
