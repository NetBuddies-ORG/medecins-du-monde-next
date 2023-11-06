'use client'
import Link from "next/link";
import {FaCheck, FaHeadphones} from "react-icons/fa6";
import {IconComponent} from "@/features/common/react-icons/IconComponent";
import {GetCategoriesQuery, GetHomeQuery} from "@/services/GraphQL";
import {useTranslation} from "@/app/i18n/client";
import {useState} from "react";

interface CardListProps {
    extraData: GetHomeQuery
    categoriesContainer: GetCategoriesQuery
}

export function CardList({extraData, categoriesContainer: {categories}}: CardListProps){

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const {t} = useTranslation()

    function handleSelectedCategories(id: string){
        if(selectedCategories.includes(id)){
            setSelectedCategories(selectedCategories.filter(item => item !== id))
        } else {
            setSelectedCategories([...selectedCategories, id])
        }
    }

    return <>
        <div className="card-container">
            <Link href={extraData?.home?.data?.attributes?.UrgencesLink}>
                <div className="card danger">
                    <FaHeadphones />
                    <div className="card__title"><span>{t('HOME_URGENCES')}</span></div>
                </div>
            </Link>
            {
                categories.data.map(category => {
                    return <div key={category.id}
                                className={'card' + (selectedCategories.includes(category.id) ? ' isSelected' : '')}
                                onClick={() => handleSelectedCategories(category.id)}>
                        <span className="check"><FaCheck/></span>
                        <IconComponent icon={category?.attributes.Icone} />
                        <div className="card__title"><span>{category?.attributes.Nom}</span></div>
                    </div>
                })
            }
        </div>
        <div className={"footer-search" + (selectedCategories.length <= 0 ? ' isHidden' : '')}>
            <button className="btn btn-primary">
                <Link href={{ pathname: 'rechercher-un-organisme', query: { categories: selectedCategories } }}>
                    Rechercher un organisme
                </Link>
            </button>
        </div>
    </>
}