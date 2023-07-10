import { computed, defineComponent, reactive, watch } from 'vue'
import { throttle } from 'lodash-es'
import { useClazs } from '../../../../utils/class'
import { onSnapping } from './snap'
import type { PropType } from 'vue'
import type { PcGraph } from '../../../graph'
import type { SnapType, Snapline } from './snap'
import type { Position } from '@/SaForm/graph'

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

    const useSnap = throttle(
      (type: SnapType, positions: [Position, Position]) => {
        line.snaplines = onSnapping(
          type,
          props.graph,
          selectedRef.value,
          undefined,
          positions
        )
      },
      200
    )

    watch(
      () => [props.graph.mousePosition.x, props.graph.mousePosition.y],
      ([x1, y1], [x2, y2]) => {
        if (x2 === 0 && y2 === 0) return
        const positions: [Position, Position] = [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
        ]
        if (isDraggingRef.value) useSnap('drag', positions)
        if (isResizingRef.value) useSnap('resize', positions)
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
