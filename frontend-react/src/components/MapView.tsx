import { useMemo } from "react";

import Map, { NavigationControl } from "react-map-gl/mapbox";
import type { ViewState } from "react-map-gl";

import type { Event, SourceType } from "../types"
import { Markers } from "./Markers";


type MapViewProps = {
    events: Event[],
    sources: SourceType[],
}

export const MapView = ({events, sources}: MapViewProps) => {
      // Calcular centro
    const center = useMemo(() => {
      if (events.length === 0) {
        return { latitude: 40.4168, longitude: -3.7038 }; // Madrid
      }
      const latSum = events.reduce((sum, e) => sum + e.lat, 0);
      const lonSum = events.reduce((sum, e) => sum + e.lon, 0);
      return {
        latitude: latSum / events.length,
        longitude: lonSum / events.length,
      };
    }, [events]);

    return (
        <Map
          initialViewState={{ longitude: center.longitude, latitude: center.latitude, zoom: 5} as ViewState}
          style={{ width: "100%", height: "600px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <NavigationControl position="top-left" />
          <Markers events={events} sources={sources} />
        </Map>
    );
}