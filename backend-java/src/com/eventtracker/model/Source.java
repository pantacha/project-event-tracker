package com.eventtracker.model;

public class Source {
    public int id;
    public String nombre;
    public double lat;
    public double lon;

    public Source(int id, String nombre, double lat, double lon) {
        this.id = id;
        this.nombre = nombre;
        this.lat = lat;
        this.lon = lon;
    }
}
