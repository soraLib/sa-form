import { computed, defineComponent, reactive, watch } from 'vue'
import { getRectangle } from '../graph/renderer/utils/rectangle'
import type { CSSProperties, PropType } from 'vue'
import type { PcGraph } from '../../../graph'

export default defineComponent({
  name: 'SaPcFormSelectionBox',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  setup(props) {
    const rect = computed(() => {
      if (props.graph.selected.length < 2)
        return { x: 0, y: 0, width: 0, height: 0 }

      return getRectangle(props.graph.selected)
    })
    const boxStyle = computed<CSSProperties>(() => ({
      position: 'absolute',
      border: '2px dashed var(--c-brand)',
      left: `${rect.value.x}px`,
      top: `${rect.value.y}px`,
      width: `${rect.value.width}px`,
      height: `${rect.value.height}px`,
      zIndex: 1,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      display: !rect.value.width || !rect.value.height ? 'none' : 'block',
    }))

    return () => <div style={boxStyle.value}></div>
  },
})
