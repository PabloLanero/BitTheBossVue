import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
    scss: {
      additionalData: `@use "@/assets/styles/variables/constantes.scss" as *;`,
    }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // Configurar headers para archivos estáticos
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    // Asegurar que los archivos unityweb se sirven con el Content-Type correcto
    middlewareMode: false,
  },
  build: {
    // Configuración para asegurar que los archivos públicos se copian correctamente
    copyPublicDir: true,
    outDir: 'dist',
    emptyOutDir: true,
  }
})
