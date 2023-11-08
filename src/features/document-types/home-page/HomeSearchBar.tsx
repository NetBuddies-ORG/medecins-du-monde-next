'use client'
import {FaSearch} from "react-icons/fa";
import {FaAngleDown} from "react-icons/fa6";
import {useTranslation} from "@/app/i18n/client";
import {GetPublicsQuery} from "@/services/GraphQL";
import {useState} from "react";

interface HomeSearchBarProps {
    publicSpecifiques: GetPublicsQuery["publicSpecifiques"];
}
 export function HomeSearchBar({publicSpecifiques}: HomeSearchBarProps){
    const {t} = useTranslation();
    const [publics, setPublics] = useState<string>();

     function handlePublicsChange(event: React.ChangeEvent<HTMLSelectElement>) {
            setPublics(event.target.value);
     }

     return <>
        <div className='searchbar input'>
            <FaSearch />
            <input type='text' placeholder={t('HOME_ENTER_KEYWORD')} />
        </div>
        <div className="searchbar__input input">
            <select id={'publics'} value={publics} onChange={handlePublicsChange}>
                <option value="0" selected disabled>Public spécifique ..</option>
                {
                    publicSpecifiques.data.map(item =>
                        <option key={item.id} value={item.id}>{item.attributes.Nom}</option>)
                }
            </select>
            <FaAngleDown/>
        </div>
    </>
}