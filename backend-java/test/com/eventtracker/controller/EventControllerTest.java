package test.com.eventtracker.controller;

import com.eventtracker.controller.EventController;
import com.eventtracker.model.Event;
import com.eventtracker.model.Source;
import com.eventtracker.service.DataLoader;
import com.sun.net.httpserver.HttpServer;

import org.junit.jupiter.api.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

public class EventControllerTest {

    private static HttpServer server;
    private static int port;

    @BeforeAll
    public static void startServer() throws Exception {
        // Usamos puerto dinámico
        server = HttpServer.create(new InetSocketAddress(0), 0);
        port = server.getAddress().getPort();

        // Preparar datos simulados
        DataLoader.sources.clear();
        DataLoader.events.clear();

        DataLoader.sources.put(1, new Source(1, "FuenteUno", 10.0, 20.0));
        DataLoader.sources.put(2, new Source(2, "FuenteDos", 30.0, 40.0));

        DataLoader.events.add(new Event(1, 1, "2023-07-01T10:00:00", 10.5, 10.0, 20.0));
        DataLoader.events.add(new Event(2, 2, "2023-07-02T10:00:00", 20.5, 30.0, 40.0));

        // Registrar rutas
        EventController.registerRoutes(server);

        // Iniciar servidor
        server.start();
    }

    @AfterAll
    public static void stopServer() {
        server.stop(0);
    }

    private String httpGet(String pathAndQuery) throws Exception {
        URL url = new URL("http://localhost:" + port + pathAndQuery);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        assertEquals(200, conn.getResponseCode());
        assertEquals("application/json", conn.getHeaderField("Content-Type"));

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream()))) {
            return reader.lines().collect(Collectors.joining());
        }
    }

    @Test
    public void testSourcesEndpoint() throws Exception {
        String response = httpGet("/api/sources");

        assertTrue(response.contains("\"nombre\":\"FuenteUno\""));
        assertTrue(response.contains("\"nombre\":\"FuenteDos\""));
    }

    @Test
    public void testEventsEndpointWithFilter() throws Exception {
        String response = httpGet("/api/events?fuente=FuenteUno");

        assertTrue(response.contains("\"fuenteId\":1"));
        assertFalse(response.contains("\"fuenteId\":2")); // no debe estar
    }

    @Test
    public void testEventsEndpointWithDateRange() throws Exception {
        String response = httpGet("/api/events?desde=2023-07-02T00:00:00");

        assertFalse(response.contains("\"fuenteId\":1"));
        assertTrue(response.contains("\"fuenteId\":2"));
    }
}