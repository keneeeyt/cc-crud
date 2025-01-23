import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // This enables global functions like describe, it, beforeEach, etc.
    environment: 'jsdom', // Ensures the test runs in a simulated browser environment
  },
})
