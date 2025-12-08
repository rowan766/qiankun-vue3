import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Path alias configuration
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Development server configuration
  server: {
    port: 5173,
    host: '0.0.0.0',
    // CORS configuration for micro apps
    cors: true,
    // Proxy configuration (if needed)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemap for debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          'element-plus': ['element-plus'],
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'qiankun': ['qiankun']
        }
      }
    },
    // Minify options
    minify: 'esbuild'
  },

  // CSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus',
      'qiankun'
    ]
  }
})
