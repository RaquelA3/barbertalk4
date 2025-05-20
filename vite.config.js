import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const isPreview = command === 'preview';

  return {
    plugins: [react()],
    preview: {
      host: '0.0.0.0',
      port: 4173,
      allowedHosts: isPreview ? ['barbertalk4-5.onrender.com'] : [],
    }
  };
});
