'use client'
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {LatLng, LatLngBounds} from 'leaflet';
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
    centerCoordinates?: LatLng;
    setCenterCoordinates: Function;
    boundsCoords?: LatLngBounds;
    zoom: number;
    setZoom: Function;
    currentLocation?: Coordinates;
    children?: React.ReactNode;
    canRecenter: boolean;
    setCanRecenter: Function;
}

export function LeafletMap({children, boundsCoords, currentLocation, centerCoordinates, setCenterCoordinates, zoom, setZoom, canRecenter, setCanRecenter}: LeafletMapProps) {
    const [ready, setReady] = useState<boolean>(false);

    const RecenterTool = ({lat, long}: RecenterToolProps) => {
        const map = useMap();
        const zoom = 10;

        useEffect(() => {
            // if !canRecenter is needed to avoid being locked after geolocalize
            if (currentLocation && lat && long && !canRecenter) {
                setZoom(zoom);
                map.setView([lat, long], zoom);
                localStorage.setItem("zoomLevel", zoom.toString());
                setCanRecenter(true);
            }
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
            setZoom(localStorage.getItem("zoomLevel"));
            setCanRecenter(true);
        })
        return null;
    }

    return (
        <div className="isShown" id="map">
            {
                centerCoordinates &&
                <MapContainer center={centerCoordinates}
                              bounds={boundsCoords}
                              touchZoom="center"
                              zoomAnimation={true}
                              zoom={zoom}
                              attributionControl={false}
                              zoomControl={true}
                              zoomDelta={0.25}
                              zoomSnap={0.25}
                              whenReady={() => setReady(true)}
                              scrollWheelZoom={true}
                              style={{height: '400px', width: '100%'}}>
                    <InvalidateSize/>
                    <SaveZoomLatLng />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/*<ZoomControl position="topright"/>*/}
                    <MarkerClusterGroup>
                        {children}
                    </MarkerClusterGroup>
                    {currentLocation?.latitude && currentLocation?.longitude &&
                        <>
                            <Marker key={currentLocation?.latitude!}
                                    position={[currentLocation?.latitude!, currentLocation?.longitude!]}
                                    >
                            </Marker>
                            <RecenterTool lat={currentLocation?.latitude!} long={currentLocation?.longitude!} />
                        </>
                    }
                </MapContainer>
            }

        </div>
    )
}
