
<template>
  <div class="w-3/5 mx-auto h-full flex" style="min-width: calc(472px + 0.5rem);">
    <SaHeader />
    <SaForm id="1" type="PcForm" class="h-3/4 m-auto" />
  </div>
</template>

<script lang="ts" setup>
import SaHeader from './components/Header'
import SaForm from './SaForm/index'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vh;
  padding-top: 3.6rem;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}
</style>
