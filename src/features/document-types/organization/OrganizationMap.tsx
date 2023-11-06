'use client'
import {LeafletMap} from "@/features/common/leaflet";

interface OrganizationMapProps {
    latitude: number
    longitude: number
}

export function OrganizationMap({latitude, longitude}: OrganizationMapProps) {
    return <LeafletMap coordinates={{latitude: latitude, longitude: longitude}}/>;
}

