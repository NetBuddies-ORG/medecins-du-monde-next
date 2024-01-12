'use client'
import {FaBars} from "react-icons/fa6";
import {useState} from "react";
import {GetHeaderQuery} from "@/services/GraphQL";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface SlideoutProps {
    title: string;
    menuItem: GetHeaderQuery["header"];
    lang: string;
}
export function Slideout({title, menuItem, lang}: SlideoutProps){
    const [visibility, setVisibility] = useState<boolean>(false);
    const pathname = usePathname();
    const toggleSlideout = () => {
        setVisibility(!visibility);
    }

    return <>
        <div className="navigation__mobile">
            <FaBars onClick={toggleSlideout} />
            <Link href={'/' + lang}>
                <h1><span className='title-1'>{title.split(' ')[0] + ' '}</span>
                    <span className='title-2'>{title.split(' ')[1]}</span>
                </h1>
            </Link>
        </div>
        <div id='slideoutMenu' className={'slideout' + (visibility ? ' isOpen' : '')}>
            <ul>
                {
                    menuItem?.data.attributes.Header.pages.data.map(item => {
                        const isActive = pathname.replace((item.attributes.Url === '/' ? '': '/') + lang,'').slice(0, -1) === item.attributes.Url
                        return <li key={item.attributes.Titre} className={isActive ? 'active' : ''}>
                            <Link href={'/' + lang + item.attributes.Url}>
                                {item.attributes.Titre}
                            </Link>
                        </li>
                    })
                }
            </ul>
            <div className='lang-picker input'></div>
        </div>
    </>

}
