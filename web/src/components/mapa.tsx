"use client";
import { Geopoint } from "@/domain/property";
import Map from "react-map-gl/maplibre";

interface MapaProps {
  location: Geopoint;
}

// mapStyle="https://demotiles.maplibre.org/style.json"
export function Mapa({ location }: MapaProps) {
  return (
    <Map
      initialViewState={{
        longitude: location.lng,
        latitude: location.lat,
        zoom: location.alt ?? 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    />
  );
}
