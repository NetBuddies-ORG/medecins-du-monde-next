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

export function BlockItem({__typename, contentProperties }: BasicBlockListItem)
{
    return <>coucou</>
}
