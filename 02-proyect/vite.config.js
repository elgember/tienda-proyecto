import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // O el plugin de tu framework
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Definimos que "@" apunte a la carpeta "src"
      '@': path.resolve(__dirname, './src'),
    },
  },
})