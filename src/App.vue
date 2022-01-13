
<template>
  <div class="w-3/5 mx-auto h-full" style="min-width: calc(472px + 0.5rem);">
    <SaForm id="1" type="PcForm" class="h-1/2" />
  </div>
</template>

<script lang="ts" setup>
import SaForm from './components/index';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body {
  padding: 0;
  margin: 0;
}
</style>
