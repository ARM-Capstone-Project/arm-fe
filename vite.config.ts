import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Set to the desired port
  },
  plugins: [react()],
  //server: {
  //  port: 8097,
  //},
})
