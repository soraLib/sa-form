
<template>
  <div class="mx-auto h-full flex">
    <SaHeader />

    <div class="m-auto w-4/5 h-4/5">
      <SaForm id="1" type="PcForm"  />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SaHeader from './components/Header'
import SaForm from './SaForm/index'

</script>

<style>
#app-inner-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  padding-top: 3.6rem;
  box-sizing: border-box;
  background-color: var(--c-bg-mute);
  color: var(--c-text);
}

body {
  padding: 0;
  margin: 0;
}
</style>
