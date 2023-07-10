import { defineComponent, ref } from 'vue'
import { useClazs } from '../../../utils/class'
import { createMockPcCanvas } from './mock'

import Workspace from './graph'
import Snapline from './snapline'
import Group from './group'
import Selection from './selection'
import Contextmenu from './contextmenu'

import type { PcGraph } from '../../graph'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },

  setup(props) {
    // TODO: mock
    props.graph.setCanvas(createMockPcCanvas())
    props.graph.setSelected(['2', '3'])

    const contextmenuRef = ref<InstanceType<typeof Contextmenu> | null>(null)
    const onContextmenu = (event: MouseEvent) => {
      event.preventDefault()
      contextmenuRef.value?.open(event)
    }

    return () => (
      <div
        class={useClazs('relative', {
          'cursor-move': props.graph.isDragging,
          'cursor-crosshair': props.graph.isSelecting,
        })}
        style={{
          width: `${props.graph.canvas.attrs.width}px`,
          height: `${props.graph.canvas.attrs.height}px`,
        }}
        onContextmenu={onContextmenu}
      >
        <Workspace ref="workspace" graph={props.graph} />

        <Snapline graph={props.graph} />
        <Group graph={props.graph} />
        <Selection graph={props.graph} />

        <Contextmenu ref={contextmenuRef} graph={props.graph} />
      </div>
    )
  },
})
