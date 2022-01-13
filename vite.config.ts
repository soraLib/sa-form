import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: '/sa-form/',
  build: {
    outDir: process.env.BUILD_ENV === 'doc' ? 'docs' : 'dist'
  },
  alias: [
    {
      find: '@antv/x6',
      replacement: '@antv/x6/lib'
    },
    {
      find: '@antv/x6-vue-shape',
      replacement: '@antv/x6-vue-shape/lib'
    }
  ]
});
