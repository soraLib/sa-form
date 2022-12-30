<script setup lang="ts">
import ReloadPrompt from './ReloadPrompt.vue'
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div>
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />

      <ElCard>Auto Import Test</ElCard>
    </div>
  </div>

  <ReloadPrompt />
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
