import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // Puerto para desarrollo local
  },
  preview: {
    host: '0.0.0.0',
    port: 4173, // Render usará este puerto por defecto si no se especifica otro
  },
})
