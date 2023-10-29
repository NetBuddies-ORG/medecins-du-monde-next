import {getPage} from "@/context/server";
import {CustomHeader} from "@/features/common/header/Header";
import {CustomFooter} from "@/features/common/footer/footer";
import {HomePage} from "@/features/document-types/home-page/HomePage";

export function DocumentTypes() {
    const pages = getPage();
    const page = pages.data[0];

    switch (page.attributes.ContentType) {
        case 'Home':
            return (<>
                <CustomHeader />
                <main>
                    <HomePage></HomePage>
                </main>
                <CustomFooter />
            </>)
        case 'Organization':
            return <>
                    Orga
            </>
        case 'About':
            return <>
                    About
            </>
        default:
            return (
                <>
                </>
            );
    }
}
