// ============================================================
// MODULE: vite.config
// RESPONSIBILITY: Vite build configuration — React plugin, dev proxy, test setup
// DEPENDS ON: vitest, @vitejs/plugin-react
// EXPOSES: defineConfig (consumed by Vite CLI)
// ============================================================
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
