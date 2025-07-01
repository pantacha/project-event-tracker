package com.eventtracker.model;

public class Event {
    public int id;
    public int fuenteId;
    public String timestamp;
    public double valor;
    public double lat;
    public double lon;

    public Event(int id, int fuenteId, String timestamp, double valor, double lat, double lon) {
        this.id = id;
        this.fuenteId = fuenteId;
        this.timestamp = timestamp;
        this.valor = valor;
        this.lat = lat;
        this.lon = lon;
    }

    // Constructor, getters y setters

    public int getFuenteId() {
        return fuenteId;
    }
}
