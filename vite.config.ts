import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Sa Form',
    short_name: 'Sa Form',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = {
  preventAssignment: false,
  __DATE__: new Date().toISOString(),
}
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name =
    'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}
if (claims) pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error overrides
  replaceOptions.__RELOAD_SW__ = 'true'
}

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    DefineOptions(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    ElementPlus({}),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
})
