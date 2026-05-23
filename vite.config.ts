import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
      includePublic: true, // Processa tudo na pasta public
      logStats: true,      // Mostra no terminal o quanto você economizou de peso
      webp: {
        quality: 80,
      },
      // Configurações para manter a qualidade alta mas o arquivo leve
      mozjpeg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      svg: {
        multipass: true,
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ],
})