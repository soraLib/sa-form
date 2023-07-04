import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: '/sa-form/',
  build: {
    outDir: process.env.BUILD_ENV === 'doc' ? 'docs' : 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/#': path.resolve(__dirname, './types'),
    },
  },
})
