
import { Source, Layer } from "react-map-gl/mapbox";
import type { Event, SourceType } from "../types"
import type { FeatureCollection, Point, LineString } from "geojson";


type MarkersProps = {
    events: Event[],
    sources: SourceType[],
}

export const Markers = ({events, sources}: MarkersProps) => {
    // GeoJSON para fuentes (puntos azules)
  const sourcesGeoJSON: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: sources.map(f => ({
      type: "Feature",
      properties: { id: f.id, type: "fuente" },
      geometry: { type: "Point", coordinates: [f.lon, f.lat] },
    })),
  };
  // GeoJSON para eventos (puntos rojos)
  const eventsGeoJSON: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: events.map(e => ({
      type: "Feature",
      properties: { id: e.id, fuenteId: e.fuenteId, type: "evento" },
      geometry: { type: "Point", coordinates: [e.lon, e.lat] },
    })),
  };
  // Líneas que unen evento con fuente asociada
  const linesGeoJSON: FeatureCollection<LineString> = {
    type: "FeatureCollection",
    features: events.map(e => {
      const fuente = sources.find(f => f.id === e.fuenteId);
      if (!fuente) return null;
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [fuente.lon, fuente.lat],
            [e.lon, e.lat],
          ],
        },
        properties: {},
      };
    }).filter(Boolean) as any,
  };

  console.log("sources", sources);
console.log("events", events);
console.log("sourcesGeoJSON", sourcesGeoJSON);
console.log("eventsGeoJSON", eventsGeoJSON);
console.log("linesGeoJSON", linesGeoJSON);

  return (
    <>
      <Source id="fuentes" type="geojson" data={sourcesGeoJSON}>
        <Layer
          id="fuentes-layer"
          type="circle"
          paint={{ "circle-radius": 6, "circle-color": "#007AFF" }} // azul
        />
      </Source>
      <Source id="eventos" type="geojson" data={eventsGeoJSON}>
        <Layer
          id="eventos-layer"
          type="circle"
          paint={{ "circle-radius": 4, "circle-color": "#FF4136" }} // rojo
        />
      </Source>
      <Source id="lines" type="geojson" data={linesGeoJSON}>
        <Layer
          id="lines-layer"
          type="line"
          paint={{ "line-color": "#AAAAAA", "line-width": 1 }}
        />
      </Source>
    </>
  );
}