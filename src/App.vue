
<template>
  <div class="w-3/5 mx-auto h-full" style="min-width: calc(472px + 0.5rem);">

    <header class="flex justify-center items-center">
      <h1 class="font-bold text-lg py-4">Sa Form</h1>

      <ElSwitch
        v-model="display"
        class="ml-4"
        active-value="x6"
        active-color="rgb(49 208 198)"
        active-text="x6"
        inactive-value="native"
        inactive-color="#ff4949"
        inactive-text="native"
      />
    </header>

    <SaForm v-if="display === 'native'" id="1" type="PcForm" :display="display" class="h-1/2" />
    <SaForm v-else id="1" type="PcForm" :display="display" class="h-1/2" />
  </div>
</template>

<script lang="ts" setup>
import { ElSwitch } from 'element-plus';
import { ref, Ref, watch } from 'vue';
import SaForm, { SaFormDisplay } from './SaForm/index';

const DISPLAY_TOKEN = 'SA_FORM_DISPLAY';
const display: Ref<SaFormDisplay> = ref(localStorage.getItem(DISPLAY_TOKEN) as SaFormDisplay ?? 'x6');

watch(
  () => display.value,
  (v) => {
    localStorage.setItem(DISPLAY_TOKEN, v);
  });
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
