'use client'

import { GetCategoriesQuery } from '@/services/GraphQL'
import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import Image from 'next/image'
import noResultImage from '@/assets/utils/images/no-results.jpg'

export interface ToolBoxSearchProps {
  categories: GetCategoriesQuery
}

export function ToolBoxSearch(props: ToolBoxSearchProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('')
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value)
    setSelectedSubCategory('')
  }

  const handleSubCategoryChange = (e: any) => {
    setSelectedSubCategory(e.target.value)
  }

  const displayedCategoriesOptions = () => {
    return props?.categories?.categories?.data?.filter(
      (item) =>
        item.attributes?.sous_categories?.data?.length > 0 &&
        item.attributes?.sous_categories?.data?.some(
          (sub) => sub.attributes?.Toolbox?.length > 0
        )
    )
  }

  const displayedSubCategoriesOptions = () => {
    return displayedCategoriesOptions()
      ?.filter(
        (cat) =>
          selectedCategory === '0' ||
          !selectedCategory ||
          cat?.id == selectedCategory
      )
      ?.flatMap((item) =>
        item.attributes?.sous_categories?.data?.filter(
          (sub) => sub.attributes?.Toolbox?.length > 0
        )
      )
  }

  const displayedCategoriesAndSubcategoriesWithLinks = () => {
    return displayedCategoriesOptions()
      ?.filter(
        (cat) =>
          (selectedCategory === '0' ||
            !selectedCategory ||
            cat?.id == selectedCategory) &&
          cat.attributes?.sous_categories?.data?.filter(
            (sub) =>
              selectedSubCategory === '0' ||
              !selectedSubCategory ||
              sub.id == selectedSubCategory
          )?.length > 0
      )
      ?.map((category) => {
        return {
          id: category.id,
          attributes: category.attributes,
          subCategories: category.attributes?.sous_categories?.data?.filter(
            (sub) =>
              selectedSubCategory === '0' ||
              !selectedSubCategory ||
              sub.id == selectedSubCategory
          ),
        }
      })
  }

  const transformHTML = (htmlString) => {
    if (typeof window !== 'undefined') {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')
      const links = doc.querySelectorAll('a')

      links.forEach((link) => {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      })

      return (
        <div
          className="editor-wyswyg"
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
        />
      )
    } else {
      return (
        <div
          className="editor-wyswyg"
          style={{ width: '100%' }}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      )
    }
  }

  return (
    <React.Fragment>
      <div className="filters">
        <div className="searchbar input">
          <div className="input-container autocomplete">
            <FaAngleDown />
            <select
              defaultValue={undefined}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={
                selectedCategory === '0' || !selectedCategory
                  ? 'disabled-select'
                  : ''
              }
            >
              <option key={'default0'} className="disabled-option" value="0">
                Choisir une catégorie
              </option>
              {displayedCategoriesOptions()?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item?.attributes?.Nom}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="searchbar input">
          <div className="input-container autocomplete">
            <FaAngleDown />
            <select
              defaultValue={undefined}
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              className={
                selectedSubCategory === '0' || !selectedSubCategory
                  ? 'disabled-select'
                  : ''
              }
            >
              <option key={'default1'} className="disabled-option" value="0">
                Choisir une sous catégorie
              </option>
              {displayedSubCategoriesOptions()?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item?.attributes?.Nom}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="results">
        {displayedCategoriesAndSubcategoriesWithLinks.length > 0 ? (
          displayedCategoriesAndSubcategoriesWithLinks()?.map((category) => (
            <div key={category.id}>
              <h2 className="text-color-primary">{category.attributes?.Nom}</h2>
              <ul>
                {category.attributes?.sous_categories?.data?.map(
                  (subCategory) => {
                    return (
                      subCategory.attributes?.Toolbox?.length > 0 && (
                        <div key={subCategory.id}>
                          <h3>{subCategory.attributes?.Nom}</h3>
                          {transformHTML(subCategory.attributes?.Toolbox)}
                        </div>
                      )
                    )
                  }
                )}
              </ul>
            </div>
          ))
        ) : (
          <div className="no-results">
            <Image
              src={noResultImage}
              width={175}
              height={175}
              alt="Aucun résultat"
            />
            <div>
              <strong>Oups! On dirait qu'il n'y a rien ici.</strong>
            </div>
            <div>
              <small>Aucun résultat trouvé pour votre recherche.</small>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
