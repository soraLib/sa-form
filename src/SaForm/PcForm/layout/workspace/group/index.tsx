import { computed, defineComponent, ref, watch } from 'vue'
import { getRectangle } from '../graph/renderer/utils/rectangle'
import { useElementBounding } from '../graph/renderer/hooks/useBounding'
import { ElementType } from '../../../../element'
import type { CSSProperties, PropType } from 'vue'
import type { PcGraph } from '../../../graph'

export default defineComponent({
  name: 'SaPcFormGroup',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  setup(props) {
    const rect = computed(() => {
      if (
        props.graph.selected.length < 2 ||
        props.graph.selected[0].parent?.attrs.type !== ElementType.Canvas
      )
        return { x: 0, y: 0, width: 0, height: 0 }

      return getRectangle(props.graph.selected)
    })

    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const {
      toggleVisible,
      style: canvasStyle,
      padding,
    } = useElementBounding(canvasRef, rect)

    watch(() => props.graph.selected.length > 1, toggleVisible, {
      immediate: true,
    })

    const boxStyle = computed<CSSProperties>(() => ({
      ...canvasStyle.value,
      position: 'absolute',
      left: `${rect.value.x - padding.value}px`,
      top: `${rect.value.y - padding.value}px`,
      boxSizing: 'border-box',
      zIndex: 1,
      pointerEvents: 'none',
    }))

    return () => (
      <canvas
        ref={canvasRef}
        width={rect.value.width}
        height={rect.value.height}
        style={boxStyle.value}
      ></canvas>
    )
  },
})
