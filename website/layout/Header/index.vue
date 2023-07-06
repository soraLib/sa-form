<template>
  <header class="navbar">
    <a
      class="navbar-title"
      href="/sa-form/"
      aria-label="Sa Form, back to home`"
    >
      <h1>Sa Form</h1>
    </a>

    <div class="flex-grow" />

    <div class="nav-icons">
      <div class="item">
        <DarkModeSwitcher />
      </div>

      <div class="item">
        <Github />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import DarkModeSwitcher from './DarkSwitcher/DarkModeSwitcher.vue'
import Github from './Github/index.vue'
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  height: 3.6rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--c-divider);
  padding: 0.7rem 1.5rem 0.7rem 4rem;
  background-color: var(--c-bg);

  .navbar-title {
    font-size: 1rem;
    line-height: 1rem;
    color: var(--c-text);
    text-decoration: none;
  }
}

.nav-icons {
  display: grid;
  grid-template-columns: repeat(2, 40px);
  grid-column-gap: 1.2rem;
  padding: 2px 0 0;
  border-bottom: 0;
  margin-left: 12px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
