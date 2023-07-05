import { Transition, computed, defineComponent, ref } from 'vue'
import { NIcon, NInput } from 'naive-ui'
import { ArrowBackOutline, Layers } from '@vicons/ionicons5'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'
import type { BasicElement } from '../../element'

import './index.scss'

export default defineComponent({
  name: 'SaFormLayoutLayer',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const visible = computed(() => props.graph.layout.layer)

    return () => (
      <Transition name="collapse-transition">
        {visible.value && (
          <div v-show={visible} class="sa-form-layer sa-bg ml-1 p-2">
            <div class="title flex items-center gap-2 text-base font-medium">
              <NIcon size={20}>
                <Layers />
              </NIcon>
              Layer
              <NIcon
                size={20}
                class="ml-auto cursor-pointer hover:text-[var(--c-brand)]"
                {...{
                  title: 'Close Layer',
                  onClick: () => props.graph.setLayout({ layer: false }),
                }}
              >
                <ArrowBackOutline />
              </NIcon>
            </div>
          </div>
        )}
      </Transition>
    )
  },
})
