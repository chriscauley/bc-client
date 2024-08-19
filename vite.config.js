import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const config = defineConfig({
  build: {
    outDir: '../static_root',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})

if (process.env.NODE_ENV === 'production') {
  config.publicPath = '/static/'
  config.experimental = {
    renderBuiltUrl(filename, { hostId, hostType, type }) {
      return `/static/${filename}`
    }
  }
}

export default config