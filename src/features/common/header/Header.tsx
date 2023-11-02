import {languages} from "@/helpers";
import {FaAngleDown, FaBars} from "react-icons/fa6";
import {getHeader, getLanguage} from "@/context/server";
import Link from "next/link";

export async function CustomHeader() {
    const lang = getLanguage();
    const {header} = getHeader();

    return (
        <header>
            <nav className="navigation">
                <h1><span className='title-1'>{header?.data?.attributes?.Header?.Titre.split(' ')[0]}</span> <span className='title-2'>{header?.data?.attributes?.Header?.Titre.split(' ')[1]}</span></h1>
                <div className="navigation__mobile">
                    <FaBars />
                    <h1><span className='title-1'>{header?.data?.attributes?.Header?.Titre.split(' ')[0]}</span> <span className='title-2'>{header?.data?.attributes?.Header?.Titre.split(' ')[1]}</span></h1>
                </div>
                <div className="navigation__desktop">
                    <ul>
                        {
                            header?.data?.attributes?.Header?.pages?.data.map(item =>
                                <li key={item.attributes.Titre}>
                                    <Link href={ '/' + lang + item.attributes.Url}>
                                        {item.attributes.Titre}
                                    </Link>
                                </li>)
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
                        <FaAngleDown />
                    </div>
                </div>
            </nav>
        </header>
    )
}