import { defineComponent } from 'vue'
import { useToggle } from '@vueuse/core'
import { NCollapseTransition, NIcon } from 'naive-ui'
import { ChevronDown } from '@vicons/ionicons5'
import { useClazs } from '../../utils/class'
import ControllerItem from './item'
import type { PropType } from 'vue'
import type { SaGroupPlugin } from '../../plugin'

import type { BasicGraph } from '../../graph'
import type { SaController } from '../../config'

export default defineComponent({
  name: 'ControllerItem',
  props: {
    plugin: {
      required: true,
      type: Object as PropType<SaGroupPlugin>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
    controller: {
      required: true,
      type: Object as PropType<SaController>,
    },
  },

  setup(props) {
    const [visible, toggleVisible] = useToggle(true)

    return () => (
      <div class="plugin-group">
        <div
          class={useClazs('plugin-group-label', {
            'is-collapsed': !visible.value,
          })}
          onClick={() => toggleVisible()}
        >
          <span class="group-collapse-label">{props.plugin.label}</span>

          <NIcon class="group-collapse-caret" size={16}>
            <ChevronDown />
          </NIcon>
        </div>

        <NCollapseTransition show={visible.value}>
          <div class="plugin-group-collapse">
            <div class="plugin-group-content">
              {Object.values(props.plugin.plugins).map((plugin) => (
                <ControllerItem
                  isInsideGroup
                  plugin={plugin}
                  controller={props.controller}
                  graph={props.graph}
                />
              ))}
            </div>
          </div>
        </NCollapseTransition>
      </div>
    )
  },
})
