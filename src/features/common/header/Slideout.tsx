'use client'
import {FaBars} from "react-icons/fa6";
import {ReactNode, useState} from "react";
import {GetHeaderQuery} from "@/services/GraphQL";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface SlideoutProps {
    titleComponent: ReactNode;
    menuItem: GetHeaderQuery["header"];
    lang: string;
}
export function Slideout({titleComponent, menuItem, lang}: SlideoutProps){
    const [visibility, setVisibility] = useState<boolean>(false);
    const pathname = usePathname();
    const toggleSlideout = () => {
        setVisibility(!visibility);
    }

    return <>
        <div className="navigation__mobile">
            <FaBars onClick={toggleSlideout} />
            <Link href={'/' + lang}>
                <h1>{titleComponent}
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
