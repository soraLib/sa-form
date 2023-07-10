import { defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import { Construct, Layers, Library } from '@vicons/ionicons5'
import { useClazs } from '../../utils/class'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

export default defineComponent({
  name: 'SaFormLayoutHeaderLayout',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    return () => (
      <div class="flex w-fit">
        <span
          title="Component"
          class={useClazs('header-button', {
            'is-active': props.graph.layout.component,
          })}
          onClick={() =>
            props.graph.setLayout({ component: !props.graph.layout.component })
          }
        >
          <NIcon>
            <Library />
          </NIcon>
        </span>

        <span
          title="Layer"
          class={useClazs('header-button', {
            'is-active': props.graph.layout.layer,
          })}
          onClick={() =>
            props.graph.setLayout({ layer: !props.graph.layout.layer })
          }
        >
          <NIcon>
            <Layers />
          </NIcon>
        </span>

        <span
          title="Property"
          class={useClazs('header-button', {
            'is-active': props.graph.layout.property,
          })}
          onClick={() =>
            props.graph.setLayout({ property: !props.graph.layout.property })
          }
        >
          <NIcon>
            <Construct />
          </NIcon>
        </span>
      </div>
    )
  },
})
