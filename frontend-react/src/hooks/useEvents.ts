import { useEffect, useMemo, useState } from "react";
import type { Event, SourceType } from "../types";

type Filters = {
  fuenteNombre: string;
  dataFrom: string;
  dataTo: string;
};

type SortConfig = {
  key: keyof Event;
  direction: "asc" | "desc";
};


export function useEvents(filters?: Filters) {

    const [events, setEvents] = useState<Event[]>([]);
    const [sources, setSources] = useState<SourceType[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "timestamp",
        direction: "desc",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        async function fetchData() {
         try {
          const [sourcesRes, eventsRes] = await Promise.all([
            fetch("/api/sources"),
            fetch("/api/events"),
          ]);

          if (!sourcesRes.ok) {
            throw new Error(`Sources fetch failed: ${sourcesRes.status}`);
          }
          if (!eventsRes.ok) {
            throw new Error(`Events fetch failed: ${eventsRes.status}`);
          }

          const sourcesData: SourceType[] = await sourcesRes.json();
          const eventsData: Event[] = await eventsRes.json();
    
          // Asociar nombre fuente a cada evento
          const sourceMap = new Map(sourcesData.map(f => [f.id, f.nombre]));
          const eventsWithName = eventsData.map(e => ({ ...e, fuenteNombre: sourceMap.get(e.fuenteId) ?? "Desconocido" }));
          eventsData.forEach(e => {
            if (!sourceMap.has(e.fuenteId)) {
              console.warn(`Evento con fuenteId ${e.fuenteId} no encontró fuente.`);
            }
          });
          setSources(sourcesData);
          setEvents(eventsWithName);
         } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
    }, []);

      // Aplicar filtros y ordenación
      const filteredAndSortedEvents = useMemo(() => {
        let filtered = [...events];
        if (filters) {
          if (filters.fuenteNombre) {
            filtered = filtered.filter(e =>
              e.fuenteNombre.toLowerCase().includes(filters.fuenteNombre.toLowerCase())
            );
          }
          if (filters.dataFrom) {
            filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(filters.dataFrom));
          }
          if (filters.dataTo) {
            filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(filters.dataTo));
          }
        }
    
        filtered.sort((a, b) => {
          const aVal = a[sortConfig.key];
          const bVal = b[sortConfig.key];
          if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
    
        return filtered;
      }, [events, filters, sortConfig]);

    const totalPages = Math.ceil(filteredAndSortedEvents.length / pageSize);
    const paginatedEvents = filteredAndSortedEvents.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return {
        events: paginatedEvents,
        filteredEvents: filteredAndSortedEvents,
        filters,
        sortConfig,
        setSortConfig,
        currentPage,
        setCurrentPage,
        totalPages,
        sources
    };
}