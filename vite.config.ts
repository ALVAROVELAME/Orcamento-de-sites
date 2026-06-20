import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import type { Config as SVGOConfig } from 'svgo'

const svgConfig: SVGOConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeTitle',
    'removeDesc',
  ],
}

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(webp|svg)$/i,
      includePublic: false,
      logStats: true,
      webp: {
        quality: 75,
        lossless: false,
      },
      svg: svgConfig
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
