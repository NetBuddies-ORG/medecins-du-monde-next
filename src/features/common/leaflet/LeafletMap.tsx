'use client'
import {MapContainer, Marker, TileLayer, useMap, ZoomControl} from "react-leaflet";
import {LatLng} from 'leaflet';
import React, {useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css';
import '@christopherpickering/react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from "@christopherpickering/react-leaflet-markercluster";
import {createMarkerFromSrc, pinFullRed} from "../../../../public/images/pins";

export interface RecenterToolProps {
    lat: number
    long: number
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface LeafletMapProps {
    children?: React.ReactNode;
    coordinates: Coordinates;
}

export function LeafletMap({children, coordinates}: LeafletMapProps) {
    const [ready, setReady] = useState<boolean>(false);
    const [centerCoordinates, setCenterCoordinates] = useState<LatLng>();

    useEffect(() => {
        if(coordinates.latitude && coordinates.longitude){
            setCenterCoordinates({lat: coordinates.latitude, lng: coordinates.longitude} as LatLng)
        }
    }, [])

    const RecenterTool = ({lat, long}: RecenterToolProps) => {
        const map = useMap();
        const zoom = 10;

        useEffect(() => {
            // if !canRecenter is needed to avoid being locked after geolocalize
            // if (currentLocation && lat && long && !canRecenter) {
            //     map.setView([lat, long], zoom);
            //     localStorage.setItem("zoomLevel", zoom.toString());
            // }
        }, []);
        return null;
    }

    const InvalidateSize = () => {
        const map = useMap();
        useEffect(() => {
            map.invalidateSize();
        }, [children]);
        return null;
    }

    const SaveZoomLatLng = () => {
        const map = useMap();
        map.on("moveend", () => {
            localStorage.setItem("latitude", map.getCenter().lat.toString());
            localStorage.setItem("longitude", map.getCenter().lng.toString());
            localStorage.setItem("zoomLevel", map.getZoom().toString());
            const latitude = localStorage.getItem("latitude") || 0;
            const longitude = localStorage.getItem("longitude") || 0;
            setCenterCoordinates({lat: +latitude, lng: +longitude} as LatLng);
        })
        return null;
    }

    return (
        <div className="isShown" id="map">
            {
                centerCoordinates &&
                <MapContainer center={centerCoordinates}
                              touchZoom="center"
                              zoomAnimation={true}
                              zoom={13}
                              attributionControl={false}
                              zoomControl={false}
                              zoomDelta={0.25}
                              zoomSnap={0.25}
                              whenReady={() => setReady(true)}
                              scrollWheelZoom={true}
                              style={{height: '400px', width: '100%'}}>
                    <InvalidateSize/>
                    <SaveZoomLatLng />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ZoomControl position="bottomright"/>
                    <MarkerClusterGroup>
                        {children}
                    </MarkerClusterGroup>
                    {coordinates?.latitude && coordinates?.longitude &&
                        <>
                            <Marker key={coordinates?.latitude!}
                                    position={[coordinates?.latitude!, coordinates?.longitude!]}
                                    icon={createMarkerFromSrc(pinFullRed)}
                                    >
                            </Marker>
                            <RecenterTool lat={coordinates?.latitude!} long={coordinates?.longitude!} />
                        </>
                    }
                </MapContainer>
            }

        </div>
    )
}
