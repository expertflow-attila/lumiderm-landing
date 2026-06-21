import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all interfaces (127.0.0.1 + ::1 + LAN)
    port: 5173,
    strictPort: true,
  },
})
