import {languages} from "@/helpers";
import {FaAngleDown, FaBars} from "react-icons/fa6";


export async function CustomHeader() {
    return (
        <header>
            <nav className="navigation">
                <h1><span className='title-1'>MonBo</span> <span className='title-2'>Réseau</span></h1>
                <div className="navigation__mobile">
                    <FaBars />
                    <h1><span className='title-1'>MonBo</span> <span className='title-2'>Réseau</span></h1>
                </div>
                <div className="navigation__desktop">
                    <ul>
                        <li>
                            <a className='active' href="index.html">Accueil</a>
                        </li>
                        <li>
                            <a href="organismes.html">Organismes</a>
                        </li>
                        <li>
                            <a href="#">A propos</a>
                        </li>
                    </ul>
                    <div className='lang-picker input'>
                        <select>
                            {
                                languages.map(item => {
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