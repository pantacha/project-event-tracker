import { MapLegend } from "../components/MapLegend";
import { MapView } from "../components/MapView";
import { useEvents } from "../hooks/useEvents";
import type { Filters } from "../types";

export const MapPage = ({ filters }: { filters: Filters }) => {

    const { sources, filteredEvents } = useEvents(filters);

    const containerStyle = {
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '1rem 1.5rem',
        fontFamily: "'Inter', sans-serif",
        color: 'var(--color-text)',
        textAlign: 'center' as const,
      };
      
      const titleStyle = {
        fontWeight: 600,
        fontSize: '2.25rem',
        marginBottom: '1.5rem',
        color: '#111827',
      };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Mapa de Eventos y Fuentes</h1>
            <MapView events={filteredEvents} sources={sources} />
            <MapLegend />
        </div>
    );

}