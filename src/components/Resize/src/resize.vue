<template>
  <div ref="resizeRef" class="s-resize" :style="resizeStyle">
    <div
      v-if="leftResizable"
      ref="leftStickRef"
      class="s-resize__stick is-left"
    />
    <div v-if="topResizable" ref="topStickRef" class="s-resize__stick is-top" />

    <slot />

    <div
      v-if="rightResizable"
      ref="rightStickRef"
      class="s-resize__stick is-right"
    />
    <div
      v-if="bottomResizable"
      ref="bottomStickRef"
      class="s-resize__stick is-bottom"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, unref, watch } from 'vue'
import { isString } from 'lodash-es'
import { resizeEmits } from './resize'
import { useStickResize } from './use-resize'
import type { Arrayable, MaybeRef } from '@vueuse/core'
import type { ResizeDirection } from './resize'
import type { OnResizingFn } from './use-resize'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SResize',
})

const props = defineProps<{
  direction: Arrayable<ResizeDirection>
  width?: MaybeRef<number>
  height?: MaybeRef<number>
  min?: number
  max?: number
}>()
const emit = defineEmits(resizeEmits)

const leftResizable = ref(false)
const topResizable = ref(false)
const rightResizable = ref(false)
const bottomResizable = ref(false)

const updateResizable = (direction: ResizeDirection, enabled = true) => {
  if (direction === 'left') {
    leftResizable.value = enabled
  } else if (direction === 'top') {
    topResizable.value = enabled
  } else if (direction === 'right') {
    rightResizable.value = enabled
  } else {
    bottomResizable.value = enabled
  }
}
const reset = () => {
  leftResizable.value = false
  topResizable.value = false
  rightResizable.value = false
  bottomResizable.value = false
}
const initResizable = () => {
  if (isString(props.direction)) {
    updateResizable(props.direction)
  } else {
    props.direction?.forEach((d) => updateResizable(d, true))
  }
}
initResizable()
watch(
  () => props.direction,
  () => {
    reset()
    initResizable()
  }
)

const resizeRef = ref<HTMLDivElement>()
const leftStickRef = ref<HTMLDivElement>()
const topStickRef = ref<HTMLDivElement>()
const rightStickRef = ref<HTMLDivElement>()
const bottomStickRef = ref<HTMLDivElement>()

const realSize = ref({
  width: unref(props.width),
  height: unref(props.height),
})
const resizeStyle = computed(() => {
  const basic: CSSProperties = {}

  if (realSize.value?.width)
    Object.assign(basic, {
      minWidth: `${realSize.value.width}px`,
      width: `${realSize.value.width}px`,
    })
  if (realSize.value?.height)
    Object.assign(basic, {
      minHeight: `${realSize.value.height}px`,
      height: `${realSize.value.height}px`,
    })

  return basic
})

watch(
  [() => unref(props.width), () => unref(props.height)],
  ([width, height]) => onResizing({ width, height })
)
const onResizing: OnResizingFn = ({ width, height }) => {
  if (width) {
    realSize.value.width = width
    emit('update:width', width)
  }
  if (height) {
    realSize.value.height = height
    emit('update:height', height)
  }
  emit('resizing', { width, height })
}
useStickResize(leftStickRef, {
  direction: 'left',
  origin: realSize,
  min: props.min,
  max: props.max,
  onResizing,
})
useStickResize(rightStickRef, {
  direction: 'right',
  origin: realSize,
  min: props.min,
  max: props.max,
  onResizing,
})
useStickResize(topStickRef, {
  direction: 'top',
  origin: realSize,
  min: props.min,
  max: props.max,
  onResizing,
})
useStickResize(bottomStickRef, {
  direction: 'bottom',
  origin: realSize,
  min: props.min,
  max: props.max,
  onResizing,
})
</script>

<style lang="scss" scoped>
.s-resize {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  &__stick {
    position: absolute;
    transition: opacity var(--c-transition);
    background-color: var(--c-bg-hover);
    opacity: 0;

    &:hover {
      opacity: 1;
    }

    &.is-right {
      right: 0;
      bottom: 0;
      width: 8px;
      height: 100%;
      cursor: col-resize;
    }
    &.is-left {
      left: 0;
      top: 0;
      width: 8px;
      height: 100%;
      cursor: col-resize;
    }
    &.is-bottom {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 8px;
      cursor: row-resize;
    }
    &.is-top {
      left: 0;
      top: 0;
      width: 100%;
      height: 8px;
      cursor: row-resize;
    }
  }
}
</style>
