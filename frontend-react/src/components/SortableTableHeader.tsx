

type SortableTableHeaderProps = {
    columns: string[],
    sortColumn: string,
    sortDirection: "asc" | "desc",
    onSort: (column: string) => void,
}

export const SortableTableHeader = ({columns, onSort, sortColumn, sortDirection}: SortableTableHeaderProps) => {
    return (
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col}
                onClick={() => onSort(col)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {col} {sortColumn === col ? (sortDirection === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
    );
}