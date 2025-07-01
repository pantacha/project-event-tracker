import type { Event } from "../types"
import { SortableTableHeader } from "./SortableTableHeader";


type EventsTableProps = {
    events: Event[],
    sortColumn: string,
    sortDirection: "asc" | "desc",
    onSort: (col: string) => void,
}

// Tabla de eventos y sources
export const EventsTable = ({events, onSort, sortColumn, sortDirection}: EventsTableProps) => {
    const columns = ["id", "Nombre Fuente", "timestamp", "valor", "lat", "lon"];

    return (
        <table border={1} cellPadding={5} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
          <SortableTableHeader
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <tbody>
            {events.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.fuenteNombre}</td>
                <td>{new Date(e.timestamp).toLocaleString()}</td>
                <td>{e.valor}</td>
                <td>{Number.isFinite(e.lat) ? e.lat.toFixed(4) : "N/A"}</td>
                <td>{Number.isFinite(e.lon) ? e.lon.toFixed(4) : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
}