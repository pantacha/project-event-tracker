# EventTracker Backend - Java

Este proyecto implementa un backend REST en Java puro que carga eventos y fuentes desde archivos CSV, sin usar bases de datos ni frameworks externos.

---

## Ejecución

1. Compila el proyecto:

```bash
javac -d out -sourcepath src src/com/eventtracker/Main.java
```

2. Ejecuta el servidor:

```bash
java -cp out com.eventtracker.Main
```

El servidor arrancará en http://localhost:8080.


## Documentación de la API

La API está documentada en formato OpenAPI/Swagger en el archivo openapi.yaml.

Para visualizarla:

Usa https://editor.swagger.io

## Estructura de archivos CSV

### resources/data/fuentes.csv

### resources/data/eventos_1.csv a eventos_6.csv

Todos deben contener encabezados y datos en formato CSV válido.

## 🧪 Tests

Este proyecto incluye pruebas automatizadas para validar el correcto funcionamiento del backend y la carga de datos.

Las pruebas están escritas en JUnit 5 y cubren:

- `EventControllerTest`: Verifica los endpoints REST.
  - `/api/sources`: Retorna todas las fuentes cargadas.
  - `/api/events`: Aplica correctamente los filtros por nombre de fuente y fechas (`desde`, `hasta`).
- `DataLoaderTest`: Comprueba que los archivos CSV se cargan correctamente en memoria.
  - Valida que se carguen fuentes y eventos.
  - Confirma que los eventos se asocien a la fuente correcta.

### Ejecución de tests

Los tests se han ejecutado exitosamente en VSCode utilizando la extensión de JUnit integrada.

Si deseas ejecutar los tests manualmente desde consola:

```bash
# Compila los tests
javac -cp .:lib/junit-platform-console-standalone.jar -d out \
    test/com/eventtracker/service/DataLoaderTest.java \
    test/com/eventtracker/controller/EventControllerTest.java

# Ejecuta los tests
java -jar lib/junit-platform-console-standalone.jar -cp out --scan-classpath
