import { computed, defineComponent } from 'vue'
import { useLocalStorage, useMagicKeys, whenever } from '@vueuse/core'
import { ElementType } from '../../element'
import { isGroupPlugin } from '../../plugin'
import PluginItem from './item'
import PluginGroup from './group'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'
import type { SaController } from '../../config'
import { Resize } from '@/components/Resize'

import './index.scss'

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
    const plugin = computed(() => {
      const type = props.graph.selected[0]?.attrs.type

      if (type !== undefined) {
        if (props.controller.plugins[type]) {
          return props.controller.plugins[type]
        }

        console.warn(
          `[Sa warn]: Plugins not found in type ${ElementType[type]}.`
        )
      }

      return undefined
    })

    const propertyWidth = useLocalStorage('form-property-width', 350)
    const { ctrl_e } = useMagicKeys()
    whenever(ctrl_e, () => {
      propertyWidth.value = propertyWidth.value < 350 ? 350 : 8
    })

    return () => (
      <Resize
        width={propertyWidth}
        onUpdate:width={(width) => (propertyWidth.value = width)}
        min={8}
        max={500}
        direction="left"
      >
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
      </Resize>
    )
  },
})
