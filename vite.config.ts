import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Нужно для тестирования компонентов
    setupFiles: "./src/setupTests.ts",
  },
} satisfies UserConfig)
