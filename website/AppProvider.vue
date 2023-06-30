<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <App />
    </NLoadingBarProvider>

    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
import App from './App.vue'
import { GlobalThemeOverrides, NLoadingBarProvider, NConfigProvider, NGlobalStyle } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const theme = computed(() => isDark.value ? darkTheme : undefined)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#18A058'
  }
}
</script>
