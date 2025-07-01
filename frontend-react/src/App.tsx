import { useState } from 'react'

import './App.css'
import { MapPage } from './pages/MapPage';
import { EventsPage } from './pages/EventsPage';
import type { Filters } from './types';

function App() {
  const [page, setPage] = useState<"table" | "map">("table");
  const [filters, setFilters] = useState<Filters>({
    fuenteNombre: "",
    dataFrom: "",
    dataTo: "",
  });

  return (
    <div className="container">
      <nav>
        <button
          className={page === "table" ? "active" : ""}
          onClick={() => setPage("table")}
        >
          Tabla
        </button>
        <button
          className={page === "map" ? "active" : ""}
          onClick={() => setPage("map")}
        >
          Mapa
        </button>
      </nav>
      {page === "table" ? <EventsPage filters={filters} setFilters={setFilters} /> : <MapPage filters={filters} />}
    </div>
  );
}

export default App
