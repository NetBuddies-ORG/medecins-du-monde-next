import {FaAngleDown, FaCircleInfo, FaHeadphones} from "react-icons/fa6";
import {FaSearch, FaTimes} from "react-icons/fa";
import {getCategories, getLanguage, getPage, getPublics} from "@/context/server";
import {cache} from "react";
import {getStrapiClient} from "@/services/Strapi";
import i18next from "i18next";
import {useTranslation} from "@/app/i18n";
import {IconComponent} from "@/features/common/react-icons/IconComponent";
import Link from "next/link";
import {GetHomeQuery} from "@/services/GraphQL";

interface HomePageProps {
    extraData: GetHomeQuery
}

export async function HomePage({extraData}: HomePageProps) {
    const language = getLanguage();
    const {categories} = getCategories();
    const {publicSpecifiques} = getPublics();
    const {t, i18n} = await useTranslation(language)

    return (
        <>
            <div className="page-container">
                <div className="searchbar">
                    <div className="info">
                        <FaCircleInfo />
                        <FaTimes className={'cancel'} />
                        <h2> {t('HOME_HELP_WITH_TOOLS')} <a>{t('HOME_CLICK_HERE')}</a> </h2>
                    </div>
                    <div className='searchbar input'>
                        <FaSearch />
                        <input type='text' placeholder={t('HOME_ENTER_KEYWORD')} />
                    </div>
                    <div className="searchbar__input input">
                        <select>
                            {
                                publicSpecifiques.data.map(item =>
                                    <option key={item.id}>{item.attributes.Nom}</option>)
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
                    {
                        categories.data.map(category => {
                            return <div key={category.id} className="card">
                                <i className="fa-solid fa-check"></i>
                                <IconComponent icon={category?.attributes.Icone} />
                                <div className="card__title"><span>{category?.attributes.Nom}</span></div>
                            </div>
                        })
                    }
                </div>
                <div className="footer-search isHidden">
                    <button className="btn btn-primary">
                        <Link href="organismes">
                            Rechercher un organisme
                        </Link>
                    </button>
                </div>
            </div>
            <div className="custom-shape-divider-bottom-1694936473">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
        </>
    )
}