'use client'
import {
    FaAngleDown,
    FaAngleUp, FaCheck,
    FaList,
    FaMapLocationDot,
    FaXmark
} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {useDBIndex} from "@/services/Search";
import {
    Categorie, CategorieEntity, GetCategoriesQuery, GetPublicsQuery,
    GetSearchOrganizationQuery,
    Organisme,
    SousCategorieEntity
} from "@/services/GraphQL";
import Link from "next/link";
import {FaMapMarkerAlt} from "react-icons/fa";
import {useSearchParams} from "next/navigation";
import {LeafletMap} from "@/features/common/leaflet";

interface SearchOrganizationProps {
    extraData: GetSearchOrganizationQuery;
    publics: GetPublicsQuery;
    categories: GetCategoriesQuery;
    language: string;
}

export function SearchOrganization({extraData, language, publics, categories}: SearchOrganizationProps) {
    const [isMapViewSelect, setIsMapViewSelect] = useState<boolean>(false);
    const [isSlideOutOpen, setIsSlideOutOpen] = useState<boolean>(false);
    const [organismes, setOrganismes] = useState<Organisme[]>([]);

    const [selectedOpenCategories, setSelectedOpenCategories] = useState<string[]>([]);
    const [selectedPublic, setSelectedPublic] = useState<string>('0');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSubSelectedCategories] = useState<string[]>([]);
    const [categoriesForFilterDisplay, setCategoriesForFilterDisplay] = useState<(CategorieEntity & {id: string})[]>([]);

    const searchParams = useSearchParams()
    const {search, isReady} = useDBIndex(language);


    useEffect(() => {
        if(isReady && searchParams.getAll('categories').length > 0){
            const categoriesInit = categories.categories.data.filter(item => searchParams.getAll('categories').includes(item.id));
            const subIdsInitToAdd: string[] = []
            categoriesInit.forEach(item => {
                subIdsInitToAdd.push(...item.attributes.sous_categories.data.map(item => item.id));
            });
            setSubSelectedCategories([...selectedSubCategories, ...subIdsInitToAdd])
            setSelectedPublic(searchParams.get('publics') as string ?? '0')
            console.log(categoriesInit)
            // @ts-ignore
            setCategoriesForFilterDisplay(categoriesInit)
            search({
                categoriesIds: searchParams.getAll('categories') as string[],
                publicsId: searchParams.get('publics') as string ?? '0'
            }).then((organismes) => {
                setOrganismes(organismes);
            });
        }
    }, [isReady])

    useEffect(() => {
        if(isReady && searchParams.getAll('categories').length > 0){
            search({
                categoriesIds: selectedCategories,
                subCategoriesIds: selectedSubCategories,
                publicsId: selectedPublic as string ?? '0'
            }).then((organismes) => {
                setOrganismes(organismes);
            });
        }
    }, [selectedPublic, selectedSubCategories])

    function handlePublicsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPublic(event.target.value);
    }

    function toggleAccordions(id: string) {
        if(selectedOpenCategories.includes(id)){
            setSelectedOpenCategories(selectedOpenCategories.filter(item => item !== id))
        } else {
            setSelectedOpenCategories([...selectedOpenCategories, id])
        }
    }

    function handleCheck(subCategoryId: string) {
        if(selectedSubCategories.includes(subCategoryId)){
            setSubSelectedCategories(selectedSubCategories.filter(item => item !== subCategoryId))
        } else {
            setSubSelectedCategories([...selectedSubCategories, subCategoryId])
        }
    }

    function handleCategoryCheck(event: React.MouseEvent<HTMLSpanElement>, subCategoriesId: SousCategorieEntity[]) {
        event.stopPropagation();
        if(subCategoriesId.every(item => selectedSubCategories.includes(item.id))){
            setSubSelectedCategories(selectedSubCategories.filter(item => !subCategoriesId.map(item => item.id).includes(item)))
        } else {
            setSubSelectedCategories([...selectedSubCategories, ...subCategoriesId.map(item => item.id)])
        }
    }

    return <>
        <div className='page-container'>
            {<div className={'slideout-results' + (isSlideOutOpen ? ' isOpen' : '')} id='slideout-results'>
                <div className='so-header'>
                    Affiner ma recherche
                    <FaXmark onClick={() => setIsSlideOutOpen(!isSlideOutOpen)}/>
                </div>

                <div className="page-container">
                    <div className='so-cat'>
                        <h3><span>Public spécifique</span></h3>
                        <div className='searchbar'>
                            <div className="searchbar__input input">
                                <select value={selectedPublic} onChange={handlePublicsChange}>
                                    <option value={0}>Aucun</option>
                                    {
                                        publics.publicSpecifiques.data.map(item => <option key={item.id} value={item.id}>{item.attributes.Nom}</option>)
                                    }
                                </select>
                                <FaAngleDown/>
                            </div>
                        </div>
                    </div>
                    <div className='so-body'>
                        <h3><span>Catégories</span></h3>
                        {
                            categoriesForFilterDisplay.length > 0 &&
                            categoriesForFilterDisplay.map((category) => {return <>
                                <div className={'accordion-tab' +  ( selectedOpenCategories.includes(category.id) ? ' isOpen' : '')}>
                                    <div className='sub-title' onClick={() => toggleAccordions(category.id)}>
                                        <span className={"custom-checkbox" + (category?.attributes.sous_categories?.data?.every(item => selectedSubCategories.includes(item.id)) ? ' isChecked' : '')}
                                              onClick={(event) => handleCategoryCheck(event, category?.attributes.sous_categories?.data)}>
                                            {category?.attributes.sous_categories?.data.every(item => selectedSubCategories.includes(item.id)) && <FaCheck /> }
                                        </span>
                                        <span>
                                            {/*<span className={'custom-icon'}>*/}
                                            {/*    <IconComponent size={30} icon={category.Icone} />*/}
                                            {/*</span>*/}
                                            {category.attributes.Nom}
                                            <span className="angle">
                                                {
                                                    selectedOpenCategories.includes(category.id) ?
                                                        <FaAngleUp />
                                                        :
                                                        <FaAngleDown />
                                                }
                                            </span>
                                        </span>

                                    </div>
                                    <ul>
                                        {
                                            category.attributes.sous_categories.data.map((subCategory) => {
                                                return <li key={subCategory.id} onClick={() => handleCheck(subCategory.id)}>
                                                    <div className={"checkmark" + (selectedSubCategories.includes(subCategory.id) ? " isChecked" : "")}>
                                                        {selectedSubCategories.includes(subCategory.id) && <FaCheck/>}
                                                    </div>
                                                    <span>{subCategory.attributes.Nom}</span>
                                                </li>

                                            })
                                        }
                                    </ul>
                                </div>
                            </>})
                        }
                        <div className='footer-search'>
                            <button className='btn btn-primary' onClick={() => setIsSlideOutOpen(false)}>Afficher les {organismes.length} résultats
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
            <div className='searchbar input'>
                <button className='btn btn-primary' id='affine-results-toggle'
                        onClick={() => setIsSlideOutOpen(!isSlideOutOpen)}>Affiner ma recherche
                </button>
            </div>
            <div className='resultbar'>
                <span className='count'>
                  {organismes.length} résultats
                </span>
                <div className={"view-picker"}>
                    <span className={"icon-picker" + (isMapViewSelect ? '' : ' active')}
                          onClick={() => setIsMapViewSelect(!isMapViewSelect)}>
                        <FaList/>
                    </span>
                    <span className={"icon-picker" + (isMapViewSelect ? ' active' : '')}
                          onClick={() => setIsMapViewSelect(!isMapViewSelect)}>
                        <FaMapLocationDot/>
                    </span>
                </div>
            </div>
            {
                isMapViewSelect ?
                    <div className='map-container'>
                        <LeafletMap coordinates={{longitude: 50, latitude: 45}} />
                    </div> :
                    <div className='card-container-organisme'>
                        {
                            organismes.length > 0 && organismes.map((organisme) => {
                                return <Link key={organisme.Nom}
                                             href={'/' + language + '/' + extraData.searchOrganization.data.attributes.OrganismeUrl.page.data.attributes.Url + '/' + organisme.generatedUrl}>
                                    <div className='card organisme'>
                                        <div className='up'>
                                            {organisme.Nom}
                                        </div>
                                        <div className='down'>
                                            <div className='location'>
                                                <FaMapMarkerAlt/>
                                                <p>{organisme.Adresse}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>

            }
        </div>
        <div className="custom-shape-divider-bottom-1694936473">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                 preserveAspectRatio="none">
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                    opacity=".25" className="shape-fill"></path>
                <path
                    d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                    opacity=".5" className="shape-fill"></path>
                <path
                    d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    className="shape-fill"></path>
            </svg>
        </div>
    </>
}