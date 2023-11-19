'use client'
import React, {useState} from 'react';
import {FaSearch, FaTimes} from "react-icons/fa";
import {useDBIndex} from "@/services/Search";
import {Categorie} from "@/services/GraphQL";
import {useAsyncEffect} from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import noResultImage from "@/assets/utils/images/no-results.jpg";

interface AutoCompleteProps {
    language: string;
}

export default function AutoComplete({language}: AutoCompleteProps) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Categorie[]>([]);
    const [categories, setCategories] = useState<(Categorie & { id: string })[]>([]);

    const {searchCategories, getCategories, isReady} = useDBIndex(language);

    useAsyncEffect(async () => {
        setCategories(await getCategories());
    }, [isReady]);

    const clear = () => {
        setInputValue('');
    }

    // Fonction pour surligner le texte
    function highlightText(text, positions) {
        let highlightedText = '';
        let currentIndex = 0;

        positions.forEach(position => {
            const {start, end} = position;

            // Ajoute le texte non surligné entre les occurrences
            highlightedText += text.substring(currentIndex, start);

            // Ajoute le texte surligné
            highlightedText += `<span class="highlight">${text.substring(start, end)}</span>`;

            currentIndex = end;
        });

        // Ajoute le texte restant non surligné
        highlightedText += text.substring(currentIndex);

        return highlightedText;
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value) {
            searchCategories({keyword: value}).then(categoriesId => {
                const copyCategories = JSON.parse(JSON.stringify(categories));
                setSuggestions(copyCategories.filter(category => categoriesId.includes(category.id)).map(cat => {
                    if (value.length > 1) {
                        cat.Nom = cat.Nom.replace(new RegExp(value, 'gi'), match => `<span class="highlight">${match}</span>`);
                        for (let subCat of cat.sous_categories.data) {
                            subCat.attributes.Nom = subCat.attributes.Nom.replace(new RegExp(value, 'gi'), match => `<span class="highlight">${match}</span>`);
                        }
                    }
                    return cat
                }));
            });
        }
    };

    return (<>
        {inputValue && <div className="help-modal-bg" onClick={clear}></div>}
        <div className="input-container">
            {inputValue && <span><FaTimes onClick={clear} className="selectable"/></span>}
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
                        (suggestions.length === 0) && <li className="suggestion-no-result">
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