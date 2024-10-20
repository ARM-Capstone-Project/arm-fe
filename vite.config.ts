import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // This is crucial, as it provides describe, it, etc.
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
  },
  //server: {
  //  port: 8097,
  //},
})
