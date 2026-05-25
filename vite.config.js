import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectDir = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(projectDir, '..')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@forms-catalog': path.resolve(workspaceRoot, 'forms.json'),
    },
  },
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
})
