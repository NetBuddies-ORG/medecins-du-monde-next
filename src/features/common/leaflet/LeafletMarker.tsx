'use client'
import {Marker} from "react-leaflet";
import {createMarkerFromSrc, pinFullRed} from "../../../../public/images/pins";

export interface LeafLetMarkerProps {
    children?: React.ReactNode;
    position: any;
    eventHandlers?: any;
    icon?: any;
}

export function LeafletMarker({position, eventHandlers, children}: LeafLetMarkerProps) {
    return <Marker position={position}
                   eventHandlers={eventHandlers}
                   icon={createMarkerFromSrc(pinFullRed)}>
        {children}
    </Marker>
}