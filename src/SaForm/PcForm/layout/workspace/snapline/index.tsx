import { throttle } from 'lodash-es'
import { defineComponent, PropType, computed, watch, reactive } from 'vue'
import { PcGraph } from '../../../graph'
import { getSnaplines, Snapline } from './snap'

import './index.scss'

export default defineComponent({
  name: 'SaPcFormSnapline',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>
    }
  },
  setup(props) {
    // TODO: multi selected elements
    // work on single selected element only.
    const isComputed = computed(() => props.graph.isDrag && props.graph.selected.length === 1)
    const selected = computed(() => props.graph.selected[0])
    const selectedPosition = computed(() => ({
      x: selected.value?.attrs.x ?? 0,
      y: selected.value?.attrs.y ?? 0
    }))

    const line = reactive({
      lines: ['rt', 'rc', 'rb', 'cl', 'cc', 'cr'],
      snaplines: new Map<string, Snapline>()
    })

    const handleSnap = throttle(() => {
      line.snaplines = getSnaplines(selected.value)
    }, 200)

    watch(
      () => props.graph.mousePosition,
      () => {
        if (!isComputed.value) return

        handleSnap()
      },
      { deep: true }
    )

    const useLineClass = (item: string) => {
      const classes: string[] = ['graph-snapline']

      classes.push(item[0] === 'r' ? 'row' : 'col')
      if (line.snaplines.has(item)) classes.push('visible')

      return classes.join(' ')
    }

    return () => <div>
      {
        isComputed.value && line.lines.map(l =>
          <div
            key={l}
            class={useLineClass(l)}
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