import pinFullRed from './pin-full-red.svg';
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export {
    pinFullRed,
};

export function createMarkerFromSrc(pinSrc?: any) {
    return L.icon({
        iconUrl: pinSrc.src ?? pinFullRed,
        shadowUrl: iconShadow.src,
        iconSize: [30, 41],
        iconAnchor: [15, 41]
    });
}
