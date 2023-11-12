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

    </>
}