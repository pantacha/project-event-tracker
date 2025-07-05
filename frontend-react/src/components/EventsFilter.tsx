import type { Filters } from "../types";


type EventsFilterProps = {
    filters: Filters,
    onFilterChange: (filters: Partial<Filters>) => void,
}

// Filtros por columnas y rango de fechas
export const EventsFilter = ({filters, onFilterChange}: EventsFilterProps) => {
    return (
        <div style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px" }}
        >
          <input
            placeholder="Filtrar por nombre de fuente"
            value={filters.fuenteNombre}
            onChange={e => onFilterChange({ fuenteNombre: e.target.value })}
            style={{ 
              flexGrow: 1,
              minWidth: "300px",
              padding: "0.75rem 1rem",
              fontSize: "1.25rem",
              marginRight: 10,
              borderRadius: "6px",
              border: "1px solid var(--color-border)"
            }}
          />
          <input
            type="date"
            value={filters.dataFrom}
            onChange={e => onFilterChange({ dataFrom: e.target.value })}
            style={{
              padding: "0.5rem", 
              fontSize: "1rem",
              marginRight: 10,
              borderRadius: "6px",
              border: "1px solid var(--color-border)" 
            }}
          />
          <input
            type="date"
            value={filters.dataTo}
            onChange={e => onFilterChange({ dataTo: e.target.value })}
            style={{ 
              padding: "0.5rem", 
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid var(--color-border)" 
            }}
          />
        </div>
    );
}