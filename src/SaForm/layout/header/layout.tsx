import { defineComponent } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { Layers, Sparkles } from '@vicons/ionicons5'
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
          title="Layers"
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
      </div>
    )
  },
})
