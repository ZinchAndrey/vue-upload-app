import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProduction = mode === 'production'

  return defineConfig({
    base: isProduction ? '/'  : '/vue-upload-app/',
  
    plugins: [
      vue(),
      VueDevTools(),
      svgLoader({
        defaultImport: 'url' // or 'raw'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
