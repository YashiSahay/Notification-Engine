import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // Sets the preferred port
    strictPort: true, // Prevents jumping to 5174, 5175, etc.
    open: true,       // Automatically opens your browser on start
  }
})