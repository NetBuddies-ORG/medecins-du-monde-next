import {GetUrgencesQuery} from "@/services/GraphQL";

interface UrgencesProps {
    extraData: GetUrgencesQuery
}
export function Urgences({extraData}: UrgencesProps){
    return <div>{extraData.urgence.data.attributes.ContentType}</div>
}