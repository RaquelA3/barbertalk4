/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // Esto activa describe, it, expect sin necesidad de importarlos
    environment: 'jsdom',  // Simula el DOM para pruebas de React
  },
});
