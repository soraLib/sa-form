import { Transition, computed, defineComponent } from 'vue'
import { ElementType } from '../../element'
import { isGroupPlugin } from '../../plugin'
import PluginItem from './item'
import PluginGroup from './group'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

import './index.scss'
import type { SaController } from '../../config'

export default defineComponent({
  name: 'SaFormLayoutController',
  props: {
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
    const visible = computed(() => props.graph.layout.property)
    const plugin = computed(() => {
      const type = props.graph.selected[0]?.attrs.type

      if (type) {
        if (props.controller.plugins[type]) {
          return props.controller.plugins[type]
        }

        console.warn(
          `[Sa warn]: Plugins not found in type ${ElementType[type]}.`
        )
      }

      return undefined
    })

    return () => (
      <Transition name="collapse-x-transition">
        {visible.value && (
          <div class="plugins-container">
            {plugin.value &&
              plugin.value.basic?.map((item) => {
                return isGroupPlugin(item) ? (
                  <PluginGroup
                    plugin={item}
                    graph={props.graph}
                    controller={props.controller}
                  />
                ) : (
                  <PluginItem
                    plugin={item}
                    graph={props.graph}
                    controller={props.controller}
                  />
                )
              })}
          </div>
        )}
      </Transition>
    )
  },
})
