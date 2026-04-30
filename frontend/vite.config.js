import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',  // Gunakan terser untuk minify
    terserOptions: {
      compress: {
        drop_console: true,  // Hapus console.log di production
        drop_debugger: true
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})