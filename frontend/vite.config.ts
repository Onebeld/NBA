import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:8080'
            },
            '/auth': {
                target: 'http://localhost:8080'
            }
        },
        watch: {
            usePolling: true
        }
    },
    build: {
        outDir: '../src/main/resources/static',
        emptyOutDir: true,
    }
})
