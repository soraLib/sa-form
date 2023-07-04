<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <App />
    </NLoadingBarProvider>

    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  darkTheme,
} from 'naive-ui'

import { useDark } from '@vueuse/core'
import App from './App.vue'
import type { GlobalThemeOverrides } from 'naive-ui'

const isDark = useDark()
const theme = computed(() => (isDark.value ? darkTheme : undefined))

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#18A058',
  },
}
</script>
