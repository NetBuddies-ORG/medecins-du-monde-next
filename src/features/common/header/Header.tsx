export async function CustomHeader() {
    return (
        <header>
            <nav className="navigation">
                <h1><span className='title-1'>MonBo</span> <span className='title-2'>Réseau</span></h1>
                <div className="navigation__mobile">
                    <i className="fa-solid fa-bars" id="slideoutMenu__toggle"></i>
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
                        {/*<select>*/}
                        {/*    <option>🇫🇷</option>*/}
                        {/*    <option>🇳🇱</option>*/}
                        {/*    <option>🇩🇪</option>*/}
                        {/*    <option>🇬🇧</option>*/}
                        {/*    <option>🇮🇹</option>*/}
                        {/*</select>*/}
                        <i className="fa-regular fa-angle-down"></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}