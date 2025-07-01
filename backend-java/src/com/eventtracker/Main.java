package com.eventtracker;

import com.eventtracker.controller.EventController;
import com.eventtracker.service.DataLoader;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;


public class Main {
    public static void main(String[] args) throws IOException {
        DataLoader.loadData("resources/data");

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        EventController.registerRoutes(server);

        server.start();
        System.out.println("Server started at http://localhost:8080");
    }
}
