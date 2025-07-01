package com.eventtracker.service;

import com.eventtracker.model.Event;
import com.eventtracker.model.Source;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;


public class DataLoader {
    public static final List<Event> events = Collections.synchronizedList(new ArrayList<>());
    public static final Map<Integer, Source> sources = new ConcurrentHashMap<>();

    public static void loadData(String dirPath) throws IOException {
        loadFuentes(dirPath + "/fuentes.csv");
        loadEventosParalelo(dirPath);
    }

    private static void loadFuentes(String path) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(path));
        if (lines.isEmpty()) return;

        // Saltar encabezado
        for (int i = 1; i < lines.size(); i++) {
            String line = lines.get(i).trim();
            if (line.isEmpty()) continue;

            String[] parts = line.split(",");
            if (parts.length < 4) continue;

            try {
                int id = Integer.parseInt(parts[0].trim());
                String nombre = parts[1].trim();
                double lat = Double.parseDouble(parts[2].trim());
                double lon = Double.parseDouble(parts[3].trim());
                sources.put(id, new Source(id, nombre, lat, lon));
            } catch (NumberFormatException e) {
            System.err.println("Error parseando fuente: " + line);
            }
        }
    }

    private static void loadEventosParalelo(String dirPath) throws IOException {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        List<Future<?>> tasks = new ArrayList<>();

        Files.list(Paths.get(dirPath))
                .filter(p -> p.getFileName().toString().startsWith("eventos_"))
                .forEach(path -> executor.submit(() -> loadEventoFile(path)));
                
        executor.shutdown();
        try {
            for (Future<?> f : tasks) f.get();  // Esperar a que terminen todas
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

    private static void loadEventoFile(Path path) {
        try {
            List<String> lines = Files.readAllLines(path);
            if (lines.isEmpty()) return;

            // Saltar encabezado
            for (int i = 1; i < lines.size(); i++) {
                String line = lines.get(i).trim();
                if (line.isEmpty()) continue;

                String[] parts = line.split(",");
                if (parts.length < 6) continue;

                try {
                    int id = Integer.parseInt(parts[0]);
                    int fuenteId = Integer.parseInt(parts[1]);
                    String timestamp = parts[2];
                    double valor = Double.parseDouble(parts[3]);
                    double lat = Double.parseDouble(parts[4]);
                    double lon = Double.parseDouble(parts[5]);
                    
                    events.add(new Event(id, fuenteId, timestamp, valor, lat, lon));
                } catch (NumberFormatException e) {
                    System.err.println("Error parseando evento: " + line);
                }
            }
        } catch (IOException e) {
            System.err.println("Error leyendo archivo de eventos: " + path.getFileName());
            e.printStackTrace();
        }
    }
}
