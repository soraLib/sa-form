<template>
  <div ref="scalerRef" class="auto-scaler">
    <div class="auto-scaler-inner" :style="scaleInnerStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import type { ElementSize, MaybeRef } from '@vueuse/core'
import type { ScaleType } from './shared'
import type { CSSProperties } from 'vue'
import { addUnit } from '@/SaForm/utils/style'

const props = defineProps<{
  type: ScaleType
  modelValue?: MaybeRef<number>
  size: MaybeRef<ElementSize>
}>()
const emit = defineEmits<{
  (e: 'update:model-value', ratio: number): void
}>()

const scalerRef = ref()
const bounding = useElementBounding(scalerRef)
const ratio = computed(() => unref(props.modelValue) ?? 1)

const ratioSize = computed<ElementSize>(() => {
  const size = unref(props.size)
  return {
    width: size.width * ratio.value,
    height: size.height * ratio.value,
  }
})
const scaleInnerStyle = computed<CSSProperties>(() => {
  if (!scalerRef.value) return {}

  const transStyles: CSSProperties = {
    position: 'absolute',
    transformOrigin: `0 0`,
    transition: 'all var(--c-transition)',
  }

  if (props.type === 'fixed') {
    Object.assign(transStyles, {
      transform: `scale(${ratio.value})`,
    })
  } else {
    const baseProportion = Number.parseFloat(
      (bounding.width.value / bounding.height.value).toFixed(5)
    )
    const size = unref(props.size)
    const currentProportion = Number.parseFloat(
      (size.width / size.height).toFixed(5)
    )

    if (currentProportion > baseProportion) {
      // width
      const scaleRatio = Number.parseFloat(
        (bounding.width.value / size.width).toFixed(5)
      )
      const ratio = scaleRatio > 1 ? 1 : scaleRatio
      Object.assign(transStyles, {
        transform: `scale(${ratio})`,
      })
      emit('update:model-value', ratio)
    } else {
      // height
      const scaleRatio = Number.parseFloat(
        (bounding.height.value / size.height).toFixed(5)
      )
      const ratio = scaleRatio > 1 ? 1 : scaleRatio
      Object.assign(transStyles, {
        transform: `scale(${ratio})`,
      })
      emit('update:model-value', ratio)
    }
  }

  // align to center
  if (ratioSize.value.width < bounding.width.value) {
    Object.assign(transStyles, {
      marginLeft: addUnit(
        (bounding.width.value - ratioSize.value.width) / 2,
        'px'
      ),
    })
  }
  if (ratioSize.value.height < bounding.height.value) {
    Object.assign(transStyles, {
      marginTop: addUnit(
        (bounding.height.value - ratioSize.value.height) / 2,
        'px'
      ),
    })
  }

  return transStyles
})
</script>

<style lang="scss" scoped>
.auto-scaler {
  width: 100%;
  height: 100%;
  text-size-adjust: 100%;
  box-sizing: border-box;
}
</style>
