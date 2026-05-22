import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|webp|svg)$/i, // Garante que pegue todos os formatos
      exclude: undefined,
      include: undefined,
      includePublic: true, // Garante que olhe para a pasta 'public'
      logStats: true,
      webp: {
        lossless: true,
      },
      png: {
        lossless: true,
      },
      jpeg: {
        quality: 100,
      },
    }),
  ],
});