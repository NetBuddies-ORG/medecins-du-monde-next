'use client'
import {OrganismeCard} from "@/features/document-types/search-organization/OrganismeCard";
import {Organisme} from "@/services/GraphQL";
import {LeafletMarker} from "@/features/common/leaflet";

interface OrganizationMarkerProps {
    children: never[];
    organisme: Organisme & {id?: string};
    language: string;
    currentVisibleItemId?: string;
    handleCloseCard: () => void;
    toggleViewItem: (currentId: string) => void;
}

export function OrganizationMarker({organisme, toggleViewItem, language, currentVisibleItemId, handleCloseCard}: OrganizationMarkerProps) {
    return <LeafletMarker key={organisme.id}
                   position={[organisme.Latitude, organisme.Longitude!]}
                   eventHandlers={{click: () => toggleViewItem(organisme.id!)}}>
        {
            currentVisibleItemId === organisme.id &&
            <div className="container">
                <OrganismeCard lang={language}
                               organisme={organisme}
                               isClosable={true}
                               handleCloseCard={handleCloseCard}></OrganismeCard>
            </div>
        }
    </LeafletMarker>
}