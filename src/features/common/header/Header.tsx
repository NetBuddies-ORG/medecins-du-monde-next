import {FaBars} from "react-icons/fa6";
import {getHeader, getLanguage} from "@/context/server";
import {HeaderMenu} from "@/features/common/header/HeaderMenu";

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
                    <HeaderMenu listItem={header} lang={lang} />
                </div>
            </nav>
        </header>
    )
}