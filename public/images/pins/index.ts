
import pinFullRed from './pin-full-red.svg';
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export {
    pinFullRed,
};

export function createMarkerFromSrc(pinSrc) {
    return L.icon({
        iconUrl: pinSrc.src,
        shadowUrl: iconShadow.src,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
}
