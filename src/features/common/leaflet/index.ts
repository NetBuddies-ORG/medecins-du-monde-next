import dynamic from "next/dynamic";
import {LeafletMapProps} from "@/features/common/leaflet/LeafletMap";
import {LeafLetMarkerProps} from "@/features/common/leaflet/LeafletMarker";
export const LeafletMap = dynamic<LeafletMapProps>(() => import("./LeafletMap").then(m => m.LeafletMap), {ssr: false});
export const LeafletMarker = dynamic<LeafLetMarkerProps>(() => import("./LeafletMarker").then(m => m.LeafletMarker), {ssr: false});
