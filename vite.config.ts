import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  base: '/ReactCurso/', // Cambia esto por el nombre de tu repo en GitHub
  build: {
    outDir: 'dist'
  }
})
