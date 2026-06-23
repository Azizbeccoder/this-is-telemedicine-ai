import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Everything runs on one port (5173) in dev.
// Calls to /api/* are forwarded to the Anthropic proxy (server.js on 8787),
// which runs in the background but is never opened in the browser directly.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        timeout: 30000,
      },
    },
  },
});
