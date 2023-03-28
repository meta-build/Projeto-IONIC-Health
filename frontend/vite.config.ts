import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass,
        additionalData: `@import "@/styles/variables.scss";`, //opcional
        sassOptions: {
          fiber: false,
        },
      },
    },
  },
})
