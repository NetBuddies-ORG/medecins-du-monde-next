'use client'
import Link from "next/link";
import {FaAngleDown, FaCheck, FaCircleInfo, FaCompass, FaHeadphones} from "react-icons/fa6";
import {IconComponent} from "@/features/common/react-icons/IconComponent";
import {GetCategoriesQuery, GetHelpQuery, GetHomeQuery, GetPublicsQuery} from "@/services/GraphQL";
import {useTranslation} from "@/app/i18n/client";
import {useEffect, useState} from "react";
import {FaSearch, FaTimes} from "react-icons/fa";
import {HomeSearchBar} from "@/features/document-types/home-page/HomeSearchBar";
import {HelpModal} from "@/features/common/help-modal/HelpModal";
import AutoComplete from "@/features/common/auto-complete/AutoComplete";

interface CardListProps {
    extraData: GetHomeQuery
    categoriesContainer: GetCategoriesQuery
    publics: GetPublicsQuery["publicSpecifiques"]
    help: GetHelpQuery["help"]
    language: string
}

export function CardList({help, extraData, categoriesContainer: {categories}, publics, language}: CardListProps){

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedPublics, setSelectedPublics] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const {t} = useTranslation()

    function handleSelectedCategories(id: string){
        if(selectedCategories.includes(id)){
            setSelectedCategories(selectedCategories.filter(item => item !== id))
        } else {
            setSelectedCategories([...selectedCategories, id])
        }
    }

    function handlePublicsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPublics(event.target.value);
    }

    function showModal(isOpen: boolean) {
        setIsModalOpen(isOpen);
    }

    return <>
        {
            isModalOpen &&
            <HelpModal help={help} closeModal={() => setIsModalOpen(false)} />
        }
        <div className="searchbar">
            <div className="info">
                <FaCircleInfo/>
                <FaTimes className={'cancel'}/>
                <h2> {t('HOME_HELP_WITH_TOOLS')} <a onClick={() => showModal(true)}>{t('HOME_CLICK_HERE')}</a></h2>
            </div>
            <div className='searchbar input'>
                <AutoComplete language={language}></AutoComplete>
            </div>
            <div className="searchbar__input input">
                <select id={'publics'} value={selectedPublics} onChange={handlePublicsChange}>
                    <option value="0" selected disabled>Public spécifique ..</option>
                    {
                        publics.data.map(item =>
                            <option key={item.id} value={item.id}>{item.attributes.Nom}</option>)
                    }
                </select>
                <FaAngleDown/>
            </div>
        </div>
        <div className="card-container">
            <Link href={extraData?.home?.data?.attributes?.UrgencesLink}>
                <div className="card danger">
                    <FaHeadphones />
                    <div className="card__title"><span>{t('HOME_URGENCES')}</span></div>
                </div>
            </Link>
            <Link href={extraData?.home?.data?.attributes?.OrientationsLink}>
                <div className="card info">
                    <FaCompass/>
                    <div className="card__title"><span>{t('HOME_ORIENTATIONS')}</span></div>
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
                <Link href={{ pathname: 'rechercher-un-organisme', query: { categories: selectedCategories, publics: selectedPublics} }}>
                    Rechercher un organisme
                </Link>
            </button>
        </div>
    </>
}
