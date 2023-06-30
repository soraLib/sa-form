<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import VPSwitch from './VPSwitch.vue'

import VPIconSun from './icons/VPIconSun.vue'
import VPIconMoon from './icons/VPIconMoon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <label title="toggle dark mode">
    <VPSwitch class="VPSwitchAppearance" @click="() => toggleDark()">
      <VPIconSun class="sun" />
      <VPIconMoon class="moon" />
    </VPSwitch>
  </label>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
