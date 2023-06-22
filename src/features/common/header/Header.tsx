import Link from "next/link";
import {Image} from "@/features/components/image";
import {Menu} from "@/features/common/header/MenuContext";
import {Slideout} from "@/features/common/header/Slideout";
import {MenuToggle} from "@/features/common/header/MenuToggle";
import {GetPageQuery} from "@/services/GraphQL";
import {useTranslation} from "@/app/i18n";
import {getHeader, getNavigation} from "@/context/server";
import {mapLinksToTypedLinks, mapLinkToTypedLink} from "@/helpers";

interface HeaderProps {
    navigation: GetPageQuery["navigation"];
    header: GetPageQuery["header"];
}

export async function Header() {

    const {t} = await useTranslation('global');
    const header = getHeader();
    const {burgerMenu} = getNavigation() ?? {};

    return (
        <Menu>
            <Slideout>
                <div className="navigation navigation--blue">
                    <Link href="/">
                        <Image src={header?.slideoutLogo?.url}
                               alt="Logo VisitWallonia - Pass"
                               width="63"
                               height="63" />
                    </Link>
                    <div className="navigation__right">
                        <Link href="/"><i className="icon-single-neutral"></i></Link>
                        <MenuToggle icon="icon-close" />
                    </div>
                </div>
                <ul className="slideout__list">
                    { burgerMenu && burgerMenu.map(({content, title}, index) =>
                        <li className="slideout__item"
                            key={index}>
                            <Link href={content.url}
                                  className="slideout__link">{title ?? content.name}</Link>
                        </li>
                    )}
                    {/*<li className="slideout__item">*/}
                    {/*    <a href="#" className="slideout__link">Se déconnecter<i className="icon-logout"></i></a>*/}
                    {/*</li>*/}
                </ul>
                <div className="slideout__button">
                    <button type="button"
                            className="btn btn--big btn--primary">{t('MyQrCode')}<i
                        className="icon-qr-code"></i></button>
                </div>
            </Slideout>
            <header>
                <nav className="navigation">
                    <Link href="/">
                        <Image src={header?.logo?.url}
                               alt="logo VisitWallonia - Pass"
                               width="63"
                               height="63" />
                    </Link>
                    <div className="navigation__right">
                        <Link href="/"><i className="icon icon-single-neutral"></i></Link>
                        <MenuToggle icon="icon-navigation-menu" />
                    </div>
                </nav>
            </header>
        </Menu>
    );
}
