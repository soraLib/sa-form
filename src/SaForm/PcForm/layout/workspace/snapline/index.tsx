import { throttle } from 'lodash-es'
import { defineComponent, PropType, computed, watch, reactive } from 'vue'
import { PcGraph } from '../../../graph'
import { getSnaplines, Snapline } from './snap'

import './index.scss'
import { useClazs } from '../../../../utils/class'

export default defineComponent({
  name: 'SaPcFormSnapline',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>
    }
  },
  setup(props) {
    const isDragRef = computed(() => props.graph.isDrag)
    const selected = computed(() => props.graph.selected)

    const line = reactive({
      lines: ['rt', 'rc', 'rb', 'cl', 'cc', 'cr'],
      snaplines: new Map<string, Snapline>()
    })

    const useSnap = throttle(() => {
      line.snaplines = getSnaplines(selected.value)
    }, 200)

    watch(
      () => props.graph.mousePosition, // TODO: snap on element resizing
      () => {
        if (!isDragRef.value) return

        useSnap()
      },
      { deep: true }
    )

    return () => <div>
      {
        isDragRef.value && line.lines.map(l =>
          <div
            key={l}
            class={useClazs(
              'graph-snapline',
              l[0] === 'r' ? 'row' : 'col',
              {
                visible: line.snaplines.has(l)
              }
            )}
            style={{
              left: `${line.snaplines.get(l)?.x ?? 0}px`,
              top: `${line.snaplines.get(l)?.y ?? 0}px`
            }}
          />
        )
      }
    </div>
  }
})