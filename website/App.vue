
<template>
  <div id="app" class="flex h-full mx-auto">
    <SaHeader />

    <div class="w-4/5 m-auto h-4/5">
      <SaForm id="1" type="PcForm"  />
    </div>
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
  background-color: var(--c-bg-mute);
  color: var(--c-text);
}

</style>