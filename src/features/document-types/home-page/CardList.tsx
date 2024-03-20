'use client'
import Link from "next/link";
import {FaAngleDown, FaCheck, FaCircleInfo, FaCompass, FaHeadphones, FaTriangleExclamation} from "react-icons/fa6";
import {IconComponent} from "@/features/common/react-icons/IconComponent";
import {GetCategoriesQuery, GetHelpQuery, GetHomeQuery, GetPublicsQuery} from "@/services/GraphQL";
import {useTranslation} from "@/app/i18n/client";
import {useEffect, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {HelpModal} from "@/features/common/help-modal/HelpModal";
import AutoComplete from "@/features/common/auto-complete/AutoComplete";

interface CardListProps {
    extraData: GetHomeQuery
    categoriesContainer: GetCategoriesQuery
    publics: GetPublicsQuery["publicSpecifiques"]
    help: GetHelpQuery["help"]
    language: string
}

export function CardList({help, extraData, categoriesContainer: {categories}, publics, language}: CardListProps) {

    //TEMP EDIT WITH HEALTH
    const healthId = '18'
    const subHealthIds = ['19', '20', '21']

    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedPublics, setSelectedPublics] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false)
    const {t} = useTranslation()

    useEffect(() => {
        if (localStorage.getItem('isInfoVisible') === 'false') {
            setIsInfoVisible(false)
        } else {
            setIsInfoVisible(true)
        }
    }, [])

    function handleSelectedCategories(id: string) {
        if (healthId === id) {
            if (subHealthIds.every(subHealthId => selectedCategories.includes(subHealthId))) {
                let temp = [...selectedCategories]
                for (let i = 0; i < subHealthIds.length; i++) {
                    temp = temp.filter(item => item !== subHealthIds[i])
                }
                setSelectedCategories(temp)
                return
            }
        }

        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(item => item !== id))
        } else {
            if (healthId === id) {
                setSelectedCategories([...selectedCategories, ...subHealthIds])
                return
            }
            setSelectedCategories([...selectedCategories, id])
        }
    }

    function handlePublicsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPublics(event.target.value);
    }

    function showModal(isOpen: boolean) {
        setIsModalOpen(isOpen);
    }

    function hideHelpBox() {
        localStorage.setItem('isInfoVisible', 'false')
        setIsInfoVisible(false)
    }

    return <>
        {
            isModalOpen &&
            <HelpModal help={help} closeModal={() => setIsModalOpen(false)}/>
        }
        <div className="searchbar">
            {
                isInfoVisible &&
                <div className="info">
                    <FaCircleInfo/>
                    <FaTimes className={'cancel'} onClick={() => hideHelpBox()}/>
                    <h2> {t('HOME_HELP_WITH_TOOLS')} <a onClick={() => showModal(true)}>{t('HOME_CLICK_HERE')}</a></h2>
                </div>
            }
            <div className="warn">
                <FaTriangleExclamation/>
                <h2>Le site est en construction, les données ne sont donc pas complètes</h2>
            </div>
            <div className='searchbar input'>
                <AutoComplete language={language}></AutoComplete>
            </div>
            <div className="searchbar__input input">
                <select defaultValue={0} id={'publics'} value={selectedPublics}
                        className={selectedPublics === '0' || !selectedPublics ? 'disabled-select' : ''}
                        onChange={handlePublicsChange}>
                    <option value="0" className="disabled-option">Choisir un public spécifique ..</option>
                    {
                        publics.data.map(item =>
                            <option key={item.id} value={item.id}>{item.attributes.Nom}</option>)
                    }
                </select>
                <FaAngleDown/>
            </div>
        </div>
        <div className="card-container">
            <Link prefetch={false} href={extraData?.home?.data?.attributes?.UrgencesLink}>
                <div className="card danger">
                    <FaHeadphones/>
                    <div className="card__title"><span>{t('HOME_URGENCES')}</span></div>
                </div>
            </Link>
            <Link prefetch={false} href={extraData?.home?.data?.attributes?.OrientationsLink}>
                <div className="card info">
                    <FaCompass/>
                    <div className="card__title"><span>{t('HOME_ORIENTATIONS')}</span></div>
                </div>
            </Link>
            {
                categories.data.map(category => {
                    if (subHealthIds.includes(category.id)) return
                    return <div key={category.id}
                                className={'card' + (selectedCategories.includes(category.id) || (category.id === healthId && subHealthIds.every(subHealthId => selectedCategories.includes(subHealthId))) ? ' isSelected' : '')}
                                onClick={() => handleSelectedCategories(category.id)}>
                        <span className="check"><FaCheck/></span>
                        <IconComponent icon={category?.attributes.Icone}/>
                        <div className="card__title"><span>{category?.attributes.Nom}</span></div>
                    </div>
                })
            }
        </div>
        <div className={"footer-search" + (selectedCategories.length <= 0 ? ' isHidden' : '')}>
                <Link prefetch={false} href={{
                    pathname: 'rechercher-un-organisme',
                    query: {categories: selectedCategories, publics: selectedPublics}
                }}>
                    <button className="btn btn-primary">
                        Rechercher un organisme
                    </button>
                </Link>
        </div>
    </>
}
