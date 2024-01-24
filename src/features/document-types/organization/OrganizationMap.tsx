'use client'
import {LeafletMap} from "@/features/common/leaflet";

interface OrganizationMapProps {
    latitude: number
    longitude: number
    canMove?: boolean
    zoom?: number
}

export function OrganizationMap({latitude, longitude, canMove, zoom}: OrganizationMapProps) {
    return <LeafletMap coordinates={{latitude: latitude, longitude: longitude}} canMove={canMove} zoom={zoom}/>;
}

