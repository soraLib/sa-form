import { defineComponent } from 'vue'

import { CaretDown } from '@vicons/ionicons5'
import { NCollapseTransition, NIcon } from 'naive-ui'
import { useToggle } from '@vueuse/core'
import { useClazs } from '../../utils/class'
import StencilItem from './item'
import type { BasicGraph } from '../../graph'
import type { ComposedNativeStencil } from '.'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'StencilGroup',
  props: {
    group: {
      required: true,
      type: Object as PropType<[string, ComposedNativeStencil[]]>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },
  setup(props) {
    const [collapsed, toggleGroupCollapse] = useToggle(false)

    return () => (
      <div
        class={useClazs('stencil-group', { 'is-collapsed': collapsed.value })}
      >
        <div
          class="stencil-group-header select-none"
          onClick={() => toggleGroupCollapse()}
        >
          <span class="caret">
            <NIcon size={12} component={CaretDown} />
          </span>
          <span class="name">{props.group[0]}</span>
        </div>

        <NCollapseTransition show={!collapsed.value}>
          <div class="stencil-group-content">
            {props.group[1].map((item) => (
              <StencilItem
                key={item.attrs.name}
                item={item}
                graph={props.graph}
              />
            ))}
          </div>
        </NCollapseTransition>
      </div>
    )
  },
})
