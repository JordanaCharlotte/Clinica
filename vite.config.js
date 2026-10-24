import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bloque "test": configura Vitest.
  test: {
    // jsdom simula un navegador, para poder probar componentes React.
    environment: 'jsdom',
    // globals deja usar describe, it y expect sin importarlos en cada archivo.
    globals: true,
    // Este archivo se ejecuta antes de cada archivo de pruebas.
    setupFiles: './src/setupTests.js',
    // Configuracion del informe de cobertura (npm run test:cov).
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/setupTests.js', 'src/**/*.test.{js,jsx}'],
    },
  },
})