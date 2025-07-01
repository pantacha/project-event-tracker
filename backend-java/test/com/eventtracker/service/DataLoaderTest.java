package test.com.eventtracker.service;

import org.junit.jupiter.api.*;

import com.eventtracker.service.DataLoader;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class DataLoaderTest {

    @BeforeEach
    void clearData() {
        DataLoader.events.clear();
        DataLoader.sources.clear();
    }

    @Test
    void testLoadData() throws IOException {
        String testDir = "test/resources/testdata";

        DataLoader.loadData(testDir);

        assertFalse(DataLoader.sources.isEmpty(), "Fuentes deberían cargarse");
        assertFalse(DataLoader.events.isEmpty(), "Eventos deberían cargarse");

        assertTrue(DataLoader.sources.containsKey(1), "Fuente con ID 1 debe existir");

        // Usar campo público o método getter según clase Event
        int fuenteId = DataLoader.events.get(0).fuenteId; // o getFuenteId()
        assertEquals(1, fuenteId, "El primer evento debe tener fuenteId 1");
    }
}