import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(webp|svg)$/i,
      includePublic: true,
      logStats: true,
      // Configuração otimizada para compressão agressiva mas visualmente limpa
      webp: {
        quality: 75, // 75 é o "sweet spot" entre qualidade e peso para web
        method: 6,   // Método 6 é o mais lento, porém entrega a melhor compressão possível
        lossless: false,
      },
      // Configuração otimizada para SVGs
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          { name: 'removeTitle' },
          { name: 'removeDesc' }
        ]
      }
    })
  ],
})