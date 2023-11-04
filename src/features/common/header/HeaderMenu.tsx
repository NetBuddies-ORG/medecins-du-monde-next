'use client'
import Link from "next/link";
import {languages} from "@/helpers";
import {FaAngleDown} from "react-icons/fa6";
import {usePathname} from "next/navigation";
import {GetHeaderQuery} from "@/services/GraphQL";

interface HeaderMenuProps {
    listItem: GetHeaderQuery["header"],
    lang: string
}

export function HeaderMenu({listItem, lang}: HeaderMenuProps) {
    const pathname = usePathname();

    return (<>
        <ul>
            {
                listItem?.data.attributes.Header.pages.data.map(item => {
                    const isActive = pathname.replace((item.attributes.Url === '/' ? '': '/') + lang,'').slice(0, -1) === item.attributes.Url
                    return <li key={item.attributes.Titre}>
                        <Link className={isActive ? 'active' : ''} href={'/' + lang + item.attributes.Url}>
                            {item.attributes.Titre}
                        </Link>
                    </li>
                })
            }
        </ul>
        <div className='lang-picker input'>
            <select>
                {
                    languages?.map(item => {
                        return <option key={item}>{item}</option>
                    })
                }
            </select>
            <FaAngleDown/>
        </div>
    </>)
}