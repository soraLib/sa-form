<!-----------------------------------header------------------------------------------>
<!--primary-sidebar --|--secondary-sidebar--|--worksapce--|--configurations-sidebar-->
<template>
  <div class="sa-form-wrapper">
    <header ref="header" class="sa-form-header" />

    <main class="sa-form-main">
      <div ref="primarySidebar" class="primary-sidebar" />
      <div ref="secondarySidebar" class="secondary-sidebar" />
      <ContentWorkspace class="worksapce-wrapper" />
      <div ref="configurationsSidebar" class="configurations-sidebar" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import ContentHeader from './modules/content-header'
import ContentConfigurations from './modules/content-configurations'
import ContentLayer from './modules/content-layer'
import ContentWorkspace from './modules/content-workspace'
</script>

<style lang="scss" scoped>
.hide-while-empty {
  display: none;
  &:not(:empty) {
    display: block;
  }
}
.sa-form-header,
.primary-sidebar,
.secondary-sidebar,
.configurations-sidebar {
  @extend .hide-while-empty;
}

.sa-form-wrapper {
  display: flex;
  flex-direction: column;

  .sa-form-main {
    flex: 1;
  }
}
</style>
