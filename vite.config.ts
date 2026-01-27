import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'https://97cddaa19ec5.ngrok-free.app',
      '46052a32e961.ngrok-free.app'
    ],
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    },
    hmr: {
      host: '5440c672-cbf8-49d5-bc1d-8e94d7ad101a.preview.emergentagent.com',
      protocol: 'wss',
      clientPort: 443
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
