import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: process.env.BUILD_ENV === 'doc' ? 'docs' : 'dist'
  }
});
