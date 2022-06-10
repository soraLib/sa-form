<template>
  <NConfigProvider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <NLoadingBarProvider>
      <App id="app-inner-container" />
    </NLoadingBarProvider>

    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
import App from './App.vue'
import { zhCN, dateZhCN, GlobalThemeOverrides, NLoadingBarProvider, NConfigProvider, NGlobalStyle } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#18A058'
  }
}
</script>
