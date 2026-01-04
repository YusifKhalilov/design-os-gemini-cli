import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'design-os-reset',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.method === 'DELETE' && req.url === '/__reset-project') {
            const fs = await import('fs')
            const path = await import('path')
            const root = process.cwd()

            const dirsToDelete = [
              path.join(root, 'product'),
              path.join(root, 'src', 'sections'),
              path.join(root, 'src', 'shell')
            ]

            try {
              for (const dir of dirsToDelete) {
                if (fs.existsSync(dir)) {
                  fs.rmSync(dir, { recursive: true, force: true })
                  console.log(`Deleted: ${dir}`)
                }
              }
              res.statusCode = 200
              res.end(JSON.stringify({ success: true }))
            } catch (error) {
              console.error('Error resetting project:', error)
              res.statusCode = 500
              res.end(JSON.stringify({ error: 'Failed to reset project' }))
            }
            return
          }
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
