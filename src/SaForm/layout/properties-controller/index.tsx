import { computed, defineComponent, PropType } from 'vue'
import { BasicGraph } from '../../graph'

import PluginItem from './item'

import './index.scss'
import { SaController } from '../../config'
import { ElementType } from '../../element'

export default defineComponent({
  name: 'SaFormLayoutController',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>
    },
    controller: {
      required: true,
      type: Object as PropType<SaController>
    }
  },

  setup(props) {
    const plugin = computed(() => {
      const type = props.graph.selected[0]?.attrs.type

      if (type) {
        if (props.controller.plugins[type]) {
          return props.controller.plugins[type]
        }

        console.warn(`[Sa warn]: Plugins not found in type ${ElementType[type]}.`)
      }

      return undefined
    })

    return () => (
      <div class="controller-container">
        {
          plugin.value ?
            plugin.value.basic?.map((item =>
              <div class="controller-item">
                <div class="controller-item-label" title={item.title}>{item.label}</div>
                <div class="controller-item-plugin">
                  <PluginItem plugin={item} graph={props.graph} controller={props.controller} />
                </div>
              </div>
            )) : ''
        }</div>
    )
  }
})