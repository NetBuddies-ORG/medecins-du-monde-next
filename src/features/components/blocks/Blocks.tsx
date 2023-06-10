import {Paragraph} from "../paragraph";
import {BasicBlockListItem} from "@/services/GraphQL";

interface BlocksProps {
    blocks: BasicBlockListItem[];
}

export function Blocks({ blocks }: BlocksProps)
{
    if (!blocks?.length)
    {
        return null;
    }

    return (
        <>
            {blocks.map((component, index) =>
                <BlockItem {...component} key={index} />
            )}
        </>
    );
}

export function BlockItem({__typename, Content }: BlocksProps['blocks'][0])
{
    switch (__typename)
    {
        case "ParagraphComponentBlockListItem":
            return <Paragraph {...Content} />;

        default:
            //throw new Error(`Unknown BlockListItem: ${__typename}`);
            console.error(`Unknown BlockListItem: ${__typename}`);
            return <p>{`Unknown BlockListItem: ${__typename}`}</p>
    }
}
