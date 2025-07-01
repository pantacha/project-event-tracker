# EventTracker Frontend

Interfaz web desarrollada con **Vite**, **React** y **TypeScript** que consume la API REST del backend Java para mostrar eventos y fuentes.

Utiliza **Mapbox GL JS** para la visualización interactiva en el mapa.

---

## 🖥️ Funcionalidades principales

### 1. Tabla de eventos y fuentes

- Tabla paginada y ordenable por cualquier columna.
- Filtrado por cada columna.
- Filtrado por rango de fechas (`desde` y `hasta`).
- Filtrado por nombre de fuente.
- Muestra eventos junto con su fuente asociada.

### 2. Mapa interactivo

- Visualiza en un mapa las fuentes y eventos con sus coordenadas geográficas.
- Iconos diferenciados para fuentes y eventos (colores distintos).
- Cada evento está conectado a su fuente mediante una línea, facilitando la visualización de la relación.

---

## 🌐 Consumo de la API

La aplicación consume exclusivamente la API REST Java del backend disponible en:

- `/api/sources` — para obtener las fuentes.
- `/api/events` — para obtener eventos con filtros opcionales.

---

## ⚙️ Configuración y ejecución

### Requisitos previos

- Node.js (>= 16.x)
- npm o yarn

### Pasos para correr el frontend

1. Clona el repositorio y entra en la carpeta del frontend:

    ```bash
    cd front-end
    ```

2. Instala dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```

3. Configura el archivo `.env` para establecer el token de Mapbox: (estructura ejemplo en .env.example)

    ```env
    VITE_MAPBOX_TOKEN=tu_token_mapbox_aqui
    ```

4. Inicia la app en modo desarrollo:

    ```bash
    npm run dev
    # o
    yarn dev
    ```

5. Abre en el navegador [http://localhost:3000](http://localhost:3000) (o el puerto que indique Vite).

---
