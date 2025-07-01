import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {nodePolyfills} from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // tu backend Java
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
    },
  },
  define: {
    'process.env': {}, // evita errores con variables de entorno no definidas
  },
})
