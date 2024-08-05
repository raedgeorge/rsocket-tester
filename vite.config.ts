import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8070,
    strictPort: true,
  },
  define: {
    global: {},
  },
  server: {
    port: 8070,
    strictPort: true,
    host: true,
    origin: "http://localhost:8070",
  },
});
