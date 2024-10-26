"use client";
import Map from "react-map-gl/maplibre";

// mapStyle="https://demotiles.maplibre.org/style.json"
export function Mapa() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 3,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
    />
  );
}
