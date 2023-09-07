<template>
  <div id="app" class="flex flex-col h-full">
    <SaHeader />

    <SaForm
      id="1"
      class="flex-grow mx-24 my-6 overflow-hidden shadow"
      type="PcForm"
    />
  </div>
</template>

<script lang="ts" setup>
import SaHeader from './layout/Header/index.vue'
import SaForm from '@/SaForm'
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: #eaeaea;
}
.dark #app {
  background: var(--c-bg);
}
</style>
