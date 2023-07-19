import { computed, ref, watch } from 'vue'
import { useToggle } from '@vueuse/core'
import type { CSSProperties, ComputedRef, Ref } from 'vue'

export const useElementBounding = (
  canvas: Ref<HTMLCanvasElement | null>,
  size: ComputedRef<{
    width: number
    height: number
  }>
) => {
  const color = ref('#42b883')
  const [visible, toggleVisible] = useToggle(false)

  // Draw the rotating dotted border
  const drawDottedBorder = (offset: number) => {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // Draw the dotted border
    ctx.setLineDash([8, 4])
    ctx.lineWidth = 2
    ctx.lineDashOffset = -offset
    ctx.strokeStyle = color.value
    ctx.strokeRect(2, 2, canvas.value.width - 4, canvas.value.height - 4)
  }

  let offset = 0
  let requst: number

  const draw = () => {
    offset += 0.5 // the rotation speed
    if (offset > 24) {
      offset = 0
    }

    drawDottedBorder(offset)
    requst = requestAnimationFrame(draw)
  }

  watch(visible, (visible) => {
    if (visible) {
      draw()
    } else {
      offset = 0
      cancelAnimationFrame(requst)
      canvas.value &&
        canvas.value
          .getContext('2d')
          ?.clearRect(0, 0, canvas.value.width, canvas.value.height)
    }
  })

  const padding = ref(2)
  const canvasStyle = computed<CSSProperties>(() => ({
    width: `${size.value.width + padding.value * 2}px`,
    height: `${size.value.height + padding.value * 2}px`,
    left: `-${padding.value}px`,
    top: `-${padding.value}px`,
  }))

  return {
    color,
    visible,
    toggleVisible,
    padding,
    style: canvasStyle,
  }
}
