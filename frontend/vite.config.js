import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),  // Plugin to support React JSX
    mode === 'production' && removeConsole()  // Plugin to remove console.* calls in production
  ].filter(Boolean),  // Filter out falsy values (i.e., removeConsole() when not in production mode)
  server: {
    host: true,  // Allow Vite to automatically determine host (typically localhost)
    strictPort: true,  // Enable strict port checking
    port: 3000,  // Specify the default port for the development server
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3000',  // Proxy requests matching '/api/v1' to the local server (useful for API requests during development)
        changeOrigin: true,  // Changes the origin of the host header to the target URL
      },
    },
  },
}));
