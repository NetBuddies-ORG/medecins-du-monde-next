import {BasicProperty} from '@/services/GraphQL';

export function Paragraph({value}: BasicProperty){
    return <div className="wyswigContent" dangerouslySetInnerHTML={{__html:value}} />;
}
