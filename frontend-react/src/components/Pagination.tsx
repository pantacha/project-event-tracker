

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

export const Pagination = ({currentPage, onPageChange, totalPages}: PaginationProps) => {
    return (
        <div style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}>
          <button 
            style={{ padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Anterior
          </button>
          <span style={{ margin: "0 1rem" }}>
            Página {currentPage} de {totalPages}
          </span>
          <button 
            style={{ padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
    );
}