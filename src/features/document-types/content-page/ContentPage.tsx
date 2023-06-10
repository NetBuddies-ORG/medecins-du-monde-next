import {getPage} from "@/context/server";
import {Blocks} from "@/features/components";

export function ContentPage() {
    const page = getPage();
    const components = 'components' in page && page.components;
    return (
        <div className="pageContenu">
            {components && <Blocks blocks={components}/>}
        </div >
    )
}
