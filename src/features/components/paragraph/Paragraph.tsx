import {ParagraphComponentFragment} from '@/services/GraphQL';

export type ParagraphProps = ParagraphComponentFragment["Content"];

export function Paragraph({content}: ParagraphProps){
    return <div className="wyswigContent" dangerouslySetInnerHTML={{__html:content}} />;
}
