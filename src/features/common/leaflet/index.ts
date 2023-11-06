import dynamic from "next/dynamic";
import {LeafletMapProps} from "@/features/common/leaflet/LeafletMap";
export const LeafletMap = dynamic<LeafletMapProps>(() => import("./LeafletMap").then(m => m.LeafletMap), {ssr: false});
