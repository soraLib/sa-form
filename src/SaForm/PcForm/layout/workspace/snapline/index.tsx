import { computed, defineComponent, reactive, watch } from 'vue'
import { throttle } from 'lodash-es'
import { useClazs } from '../../../../utils/class'
import { getSnaplines } from './snap'
import type { PropType } from 'vue'
import type { PcGraph } from '../../../graph'
import type { SnapType, Snapline } from './snap'

import './index.scss'

export default defineComponent({
  name: 'SaPcFormSnapline',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },
  setup(props) {
    const isDraggingRef = computed(() => props.graph.isDragging)
    const isResizingRef = computed(() => props.graph.isResizing)
    const isSnappingRef = computed(
      () => isDraggingRef.value || isResizingRef.value
    )
    const selectedRef = computed(() => props.graph.selected)

    const line = reactive({
      lines: ['rt', 'rc', 'rb', 'cl', 'cc', 'cr'],
      snaplines: new Map<string, Snapline>(),
    })

    const useSnap = throttle((type: SnapType) => {
      line.snaplines = getSnaplines(type, props.graph, selectedRef.value)
    }, 200)

    watch(
      () => props.graph.mousePosition,
      () => {
        if (isDraggingRef.value) useSnap('drag')
        if (isResizingRef.value) useSnap('resize')
      },
      { deep: true }
    )

    return () => (
      <div>
        {isSnappingRef.value &&
          line.lines.map((l) => (
            <div
              key={l}
              class={useClazs('graph-snapline', l[0] === 'r' ? 'row' : 'col', {
                visible: line.snaplines.has(l),
              })}
              style={{
                left: `${line.snaplines.get(l)?.x ?? 0}px`,
                top: `${line.snaplines.get(l)?.y ?? 0}px`,
              }}
            />
          ))}
      </div>
    )
  },
})
