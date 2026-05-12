import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Las llamadas a /api se redirigen al backend sin necesitar CORS
            "/api": "http://localhost:8080"
        }
    }
});
