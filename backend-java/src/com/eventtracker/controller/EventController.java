package com.eventtracker.controller;

import com.eventtracker.model.*;
import com.eventtracker.service.DataLoader;
import com.sun.net.httpserver.*;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;


public class EventController {
    public static void registerRoutes(HttpServer server) {
        server.createContext("/api/sources", exchange -> {
            String json = toJson(DataLoader.sources.values());
            respond(exchange, json);
        });

        server.createContext("/api/events", exchange -> {
            URI uri = exchange.getRequestURI();
            Map<String, String> params = queryToMap(uri.getQuery());

            List<Event> filtered = DataLoader.events.stream()
                    .filter(ev -> {
                        Source f = DataLoader.sources.get(ev.fuenteId);
                        if (params.containsKey("fuente") && (f == null || !f.nombre.contains(params.get("fuente"))))
                            return false;
                        if (params.containsKey("desde") && ev.timestamp.compareTo(params.get("desde")) < 0)
                            return false;
                        if (params.containsKey("hasta") && ev.timestamp.compareTo(params.get("hasta")) > 0)
                            return false;
                        return true;
                    })
                    .collect(Collectors.toList());

            respond(exchange, toJson(filtered));
        });
    }

    private static void respond(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private static String toJson(Object obj) {
        StringBuilder sb = new StringBuilder();
        if (obj instanceof Collection<?>) {
            sb.append("[");
            boolean first = true;
            for (Object o : (Collection<?>) obj) {
                if (!first) sb.append(",");
                sb.append(toJson(o));
                first = false;
            }
            sb.append("]");
        } else if (obj instanceof Source) {
            Source f = (Source) obj;
            sb.append(String.format("""
                {"id":%d,"nombre":"%s","lat":%f,"lon":%f}
                """, f.id, f.nombre, f.lat, f.lon));
        } else if (obj instanceof Event) {
            Event e = (Event) obj;
            sb.append(String.format("""
                {"id":%d,"fuenteId":%d,"timestamp":"%s","valor":%f,"lat":%f,"lon":%f}
                """, e.id, e.fuenteId, e.timestamp, e.valor, e.lat, e.lon));
        }
        return sb.toString();
    }

    private static Map<String, String> queryToMap(String query) {
        Map<String, String> map = new HashMap<>();
        if (query == null) return map;
        for (String param : query.split("&")) {
            String[] pair = param.split("=");
            if (pair.length > 1) map.put(pair[0], pair[1]);
        }
        return map;
    }
}
