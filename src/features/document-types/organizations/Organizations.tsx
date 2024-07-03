'use client'
import { GetOrganismesQuery } from '@/services/GraphQL'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDBIndex } from '@/services/Search'
import { useAsyncEffect } from '@/hooks'
import noResultImage from '@/assets/utils/images/no-results.jpg'
import Image from 'next/image'
import { FaAngleDown, FaBuildingUser } from 'react-icons/fa6'
import { useSearchParams } from 'next/navigation'

interface OrganizationsProps {
  extraData: GetOrganismesQuery
  languague: string
}

export function Organizations({ extraData, languague }: OrganizationsProps) {
  const [keyword, setKeyword] = useState<string>('')
  const [organismes, setOrganismes] = useState<any[]>(extraData.organismes.data)
  const [selectedService, setSelectedService] = useState<string>('')
  const [services, setServices] = useState<any[]>()
  const searchParams = useSearchParams()
  const { getOrganismes, isReady } = useDBIndex(languague)

  const getServices = () =>
    import('../../../../build/static/services.json').then(({ default: p }) => p)
  const handleServiceChange = (e: any) => setSelectedService(e.target.value)

  useEffect(() => {
    if (searchParams.has('service') && services && services.length > 0) {
      setSelectedService(searchParams.get('service') as string)
    }
  }, [searchParams, services])

  useAsyncEffect(async () => {
    setServices(
      (await getServices()).sort((a: any, b: any) => a.Nom.localeCompare(b.Nom))
    )
  }, [])

  useAsyncEffect(async () => {
    const orga = extraData.organismes.data
    if (keyword && keyword !== '' && isReady) {
      getOrganismes({ keyword }).then((orgRef) => {
        if (!orgRef) return
        const filteredOrg: any = []
        orgRef.forEach((ref) => {
          orga.forEach((item) => {
            if (item.id === ref) {
              filteredOrg.push(item)
            }
          })
        })
        if (selectedService && selectedService !== '0') {
          setOrganismes(
            filteredOrg.filter((item) =>
              item.attributes.services.data
                .map((item) => item.id)
                .includes(selectedService)
            )
          )
        } else {
          setOrganismes(filteredOrg)
        }
      })
    } else {
      if (selectedService && selectedService !== '0') {
        setOrganismes(
          orga.filter((item) =>
            item.attributes.services.data
              .map((item) => item.id)
              .includes(selectedService)
          )
        )
      } else {
        setOrganismes(orga)
      }
    }
  }, [keyword])

  useEffect(() => {
    if (selectedService && selectedService !== '0') {
      setOrganismes(
        extraData.organismes.data.filter((item) =>
          item.attributes.services.data
            .map((item) => item.id)
            .includes(selectedService)
        )
      )
    } else {
      setOrganismes(extraData.organismes.data)
    }
  }, [selectedService])

  return (
    <>
      <div className="page-container">
        <div className="searchbar">
          <div className="searchbar input">
            <div className="input-container autocomplete">
              <FaSearch />
              <input
                type="text"
                value={keyword}
                onChange={(value) => setKeyword(value.target.value)}
                placeholder="Rechercher..."
              />
            </div>
          </div>
          <div className="searchbar input">
            <div className="input-container autocomplete">
              <FaAngleDown />
              <select
                defaultValue={undefined}
                value={selectedService}
                onChange={handleServiceChange}
                className={
                  selectedService === '0' || !selectedService
                    ? 'disabled-select'
                    : ''
                }
              >
                <option className="disabled-option" value="0">
                  Choisir un service
                </option>
                {services &&
                  services.length > 0 &&
                  services?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.Nom}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {organismes.length > 0 ? (
          <div className="card-container-organisme">
            {organismes.map((item) => (
              <Link key={item.id} href={item.attributes.generatedUrl}>
                <div className="card organisme">
                  <div className="up">{item.attributes.Nom}</div>
                  {item.attributes?.Departement && (
                    <div className="department">
                      <span>
                        <FaBuildingUser /> {item.attributes?.Departement}
                      </span>
                    </div>
                  )}
                  <div className="down">
                    {item.attributes.Adresse && (
                      <div className="location">
                        <FaMapMarkerAlt />
                        {item.attributes.Adresse ? (
                          <p>{item.attributes.Adresse}</p>
                        ) : (
                          <p>Adresse non disponible</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Image
              src={noResultImage}
              width={175}
              height={175}
              alt="Aucun résultat"
            />
            <div>
              <strong>Pas résultat</strong>
            </div>
            <div>
              <small>
                Aucun organisme ne correspond à votre critère de recherche
              </small>
            </div>
          </div>
        )}
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
