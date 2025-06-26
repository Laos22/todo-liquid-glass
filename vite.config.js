import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo-liquid-glass/', // 👈 важно: укажи название своего репозитория
})
