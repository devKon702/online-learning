import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { StrictMode } from "react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    host: true,
    port: "5500",
  },
});
