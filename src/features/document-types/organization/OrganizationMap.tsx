'use client'
import {LeafletMap} from "@/features/common/leaflet";
import {control} from "leaflet";
import zoom = control.zoom;

interface OrganizationMapProps {
    latitude: number
    longitude: number
    canMove?: boolean
    zoom?: number
}

export function OrganizationMap({latitude, longitude, canMove, zoom}: OrganizationMapProps) {
    return <LeafletMap coordinates={{latitude: latitude, longitude: longitude}} canMove={canMove} zoom={zoom}/>;
}

