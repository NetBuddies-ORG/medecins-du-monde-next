'use client'
import React, {useEffect, useState} from 'react';
import {FaSearch, FaTimes} from "react-icons/fa";
import {Categorie} from "@/services/GraphQL";
import {useAsyncEffect} from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import noResultImage from "@/assets/utils/images/no-results.jpg";
import {useDBIndex} from "@/services/Search";
import {highlight} from "@/helpers/highlight";

interface AutoCompleteProps {
    language: string;
}

export default function AutoComplete({language}: AutoCompleteProps) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Categorie[]>([]);
    const [categories, setCategories] = useState<(Categorie & { id: string })[]>([]);

    const {searchSubCategories,
        getCategories,
        isReady
    } = useDBIndex(language);

    useAsyncEffect(async () => {
        if (isReady) setCategories(await getCategories());
    }, [isReady]);

    const clear = () => {
        setInputValue('');
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Depends on isReady and categories: a keyword typed while the search engine loads
    // is searched once it is ready. `cancelled` drops the answer of an outdated keyword.
    useEffect(() => {
        let cancelled = false;
        if (inputValue && isReady) {
            searchSubCategories({keyword: inputValue}).then(subCategoriesId => {
                if (cancelled) return;

                const copyCategories = JSON.parse(JSON.stringify(categories)) as (Categorie & {id: string})[];
                const categoriesLinkedToSubCategories = copyCategories.filter(cat => {
                    return cat.sous_categories.data.some(subCat => subCategoriesId.includes(subCat.id));
                });
                const categoriesLinkedToSubCategoriesSorted = categoriesLinkedToSubCategories.sort((a, b) => {
                    const aSubCategories = a.sous_categories.data.filter(subCat => subCategoriesId.includes(subCat.id));
                    const bSubCategories = b.sous_categories.data.filter(subCat => subCategoriesId.includes(subCat.id));

                    // Compare les index de la première sous-catégorie trouvée dans les deux catégories
                    return subCategoriesId.indexOf(aSubCategories[0].id) - subCategoriesId.indexOf(bSubCategories[0].id);
                });

                categoriesLinkedToSubCategoriesSorted
                    .map((cat: Categorie & {id: string}) => {
                        // Les caractères spéciaux sont épargnés pour la recherche.
                        if (inputValue.length > 1) {
                            const subCategories = cat.sous_categories.data
                                .filter(subCat => subCategoriesId.includes(subCat.id));
                            for (const subCat of subCategories) {
                                subCat.attributes.Nom = highlight(subCat.attributes.Nom, inputValue);
                            }
                            cat.sous_categories.data = subCategories;
                        }
                        return cat;
                    });

                setSuggestions(categoriesLinkedToSubCategoriesSorted);
            });
        }
        return () => {
            cancelled = true;
        };
    }, [inputValue, isReady, categories]);

    return (<>
        {inputValue && <div className="form-bg" onClick={clear}></div>}
        <div className="input-container autocomplete">
            {inputValue && <button onClick={clear}>
                <FaTimes onClick={clear} className="selectable"/>
            </button>}
            {!inputValue && <FaSearch/>}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Rechercher..."
            />

            {/* Affichez le menu de résultats ici */}
            {inputValue && (
                <ul className="suggestions-container">
                    {(suggestions.length > 0) && suggestions.map((category, categoryIndex) => (
                        category.sous_categories.data.length > 0 && <li key={categoryIndex} className="suggestion-item">
                            <div className="category-title">
                                <span dangerouslySetInnerHTML={{__html: category.Nom}}></span>
                            </div>
                            <ul className="suggestion-sub-container">
                                {
                                    (category.sous_categories.data.length > 0) && category.sous_categories.data.map((subCategory, subCategoryIndex) => (
                                        <Link key={subCategoryIndex} href={{
                                            pathname: 'rechercher-un-organisme',
                                            query: {subCategories: subCategory.id}
                                        }}>
                                            <li className="suggestion-sub-item"
                                                dangerouslySetInnerHTML={{__html: subCategory.attributes.Nom}}></li>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </li>
                    ))}
                    {
                        // Not while the search engine loads: the suggestions are not computed yet
                        (isReady && suggestions.length === 0) && <li className="suggestion-no-result">
                        <div>
                            <Image
                                src={noResultImage}
                                width={90}
                                height={90}
                                alt="Aucun résultat"/>
                        </div>

                            <span>
                                Aucun résultat.
                            </span>
                        </li>
                    }
                </ul>
            )}
        </div>
    </>);
};
