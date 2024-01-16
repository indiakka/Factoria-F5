import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  server: {
    // Configuración de manejo de archivos estáticos
    // Asegúrate de que la ruta sea correcta
    base: '/5500/',
  },
})
