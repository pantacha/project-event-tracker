import { EventsFilter } from "../components/EventsFilter";
import { EventsTable } from "../components/EventsTable";
import { Pagination } from "../components/Pagination";
import { useEvents } from "../hooks/useEvents"
import type { Filters } from "../types";

type EventsPageProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};


export const EventsPage = ({ filters, setFilters }: EventsPageProps) => {

    const {events, sortConfig, currentPage, setCurrentPage, setSortConfig, totalPages} = useEvents(filters);

    const handleSort = (col: string) => {
        if (sortConfig.key === col) {
          setSortConfig({
            key: col as any,
            direction: sortConfig.direction === "asc" ? "desc" : "asc",
          });
        } else {
          setSortConfig({ key: col as any, direction: "asc" });
        }
    };

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
      color: 'var(--color-accent)',
    };
    
    const contentStyle = {
      textAlign: 'left' as const,
      marginBottom: '1.5rem',
    };

    return (
        <div style={containerStyle}>
          <h1 style={titleStyle}>Eventos y Fuentes</h1>
            <div style={contentStyle}>
              <EventsFilter
                filters={filters}
                onFilterChange={changes => setFilters(prev => ({ ...prev, ...changes }))}
              />
              <EventsTable
                events={events}
                sortColumn={sortConfig.key}
                sortDirection={sortConfig.direction}
                onSort={handleSort}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
        </div>
    );
}