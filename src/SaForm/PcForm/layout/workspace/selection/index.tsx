import { computed, defineComponent, h } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { PcGraph } from '../../../graph'

export default defineComponent({
  name: 'SaPcFormSelection',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  setup(props) {
    const selectionBoxStyle = computed<CSSProperties>(() => {
      const { x, y, width, height } = props.graph.selectionBox

      return {
        position: 'absolute',
        display: props.graph.isSelecting && width && height ? 'block' : 'none',
        'z-index': 1000,
        border: '1px solid var(--c-brand)',
        background: '#B5CBEC',
        opacity: 0.3,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    })

    return () => <div style={selectionBoxStyle.value}></div>
  },
})
