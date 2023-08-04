<template>
  <ul v-show="visible" ref="contextmenu" class="contextmenu" :style="style">
    <NScrollbar>
      <li
        v-for="item in interalMenu"
        :key="item.id"
        class="contextmenu-item"
        :class="[
          `is-${item.type ?? 'primary'}`,
          { 'is-disabled': item.disabled, 'has-divider': item.divider },
        ]"
        @click="onSelectItem(item)"
      >
        <div class="prefix-icon">
          <VNodeComponent v-if="item.icon" :vnode="item.icon" />
        </div>
        <div class="content">{{ item.label }}</div>
      </li>
    </NScrollbar>
  </ul>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { onClickOutside, useToggle } from '@vueuse/core'
import { NScrollbar } from 'naive-ui'
import VNodeComponent from './vnode'
import type { ContextmenuItem, Position } from './shared'
import type { CSSProperties } from 'vue'

const props = defineProps<{
  menu: ContextmenuItem[]
}>()
const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'select', item: any): void
}>()

type InternalContextmenuItem = Exclude<ContextmenuItem, string>
const interalMenu = computed<InternalContextmenuItem[]>(() =>
  props.menu
    .filter((item) => !((item.hiddenOnDisabled ?? true) && item.disabled))
    .map((item) =>
      typeof item === 'string' ? { label: item, id: item, value: item } : item
    )
)

const [visible, toggleVisible] = useToggle(false)
const contextmenu = ref<HTMLUListElement | null>(null)
const position = ref<Position>({ left: 0, top: 0 })
const style = computed((): CSSProperties => {
  const rightBoundary =
    window.innerWidth || document.documentElement.clientWidth
  const left =
    position.value.left + 130 > rightBoundary
      ? rightBoundary - 130
      : position.value.left

  const bottomBoundary =
    window.innerHeight || document.documentElement.clientHeight
  const height = interalMenu.value.length * 32 + 20

  const style: CSSProperties = {
    top:
      position.value.top + height > bottomBoundary
        ? `${bottomBoundary - height}px`
        : `${position.value.top}px`,
    left: `${left}px`,
    height: 'auto',
    position: 'fixed',
  }

  return style
})

defineExpose({
  open: (pos: Position) => {
    nextTick(() => {
      position.value = pos
      toggleVisible(true)
    })
  },
  close: () => toggleVisible(false),
})

watch(visible, (visible) => {
  if (visible) {
    emit('open')
  } else {
    emit('close')
  }
})
onClickOutside(contextmenu, () => toggleVisible(false))

const onSelectItem = (item: InternalContextmenuItem) => {
  if (typeof item === 'object' && item.disabled) return
  emit('select', item)
  toggleVisible(false)
}
</script>

<style lang="scss" scoped>
.contextmenu {
  padding: 10px 0;
  background: var(--c-bg-overlay);
  border: 1px solid var(--c-divider);
  color: var(--c-text-1);
  min-width: 100px;
  width: fit-content;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  position: absolute;
  z-index: 1000;
  max-height: 282px;

  .contextmenu-item {
    cursor: pointer;
    font-size: 14px;
    padding: 5px 20px 5px 4px;
    list-style-type: none;
    display: flex;

    .prefix-icon {
      flex-grow: 0;
      display: flex;
      width: 30px;
      padding-left: 6px;
      align-items: flex-start;
      padding-top: 2px;

      * {
        width: 1rem;
      }
    }
    .content {
      flex-grow: 1;
      text-align: left;
      white-space: nowrap;
    }

    &.is-primary:hover {
      color: var(--c-brand);
      background-color: var(--c-success-light-9);
    }
    &.is-warning:hover {
      color: var(--c-warning);
      background-color: var(--c-warning-light-9);
    }
    &.is-danger:hover {
      color: var(--c-danger);
      background-color: var(--c-danger-light-9);
    }
  }

  .is-disabled {
    cursor: not-allowed;
    opacity: 0.25;
    background-color: transparent;
  }

  .has-divider {
    border-bottom: 1.5px solid var(--c-divider);
  }
}
</style>
