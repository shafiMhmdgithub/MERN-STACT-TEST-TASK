

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend server URL on port 8000
        changeOrigin: true,              // Needed for virtual hosted sites
        secure: false,                   // If using self-signed SSL certificate
      },
    },
  },
});
