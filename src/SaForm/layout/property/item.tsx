import { computed, defineComponent, ref } from 'vue'
import { NButton, NColorPicker, NInput, NInputNumber } from 'naive-ui'
import { SaPluginType } from '../../plugin'
import { isElementAttribute } from '../../utils/element'
import SaDialog from './dialog'
import type { PropType, VNode } from 'vue'
import type { SaPlugin } from '../../plugin'

import type { BasicGraph } from '../../graph'
import type { SaController } from '../../config'

export default defineComponent({
  name: 'ControllerItem',
  props: {
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>,
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
    const selected = computed(() => props.graph.selected[0])
    const modelValue = computed<any>(() => {
      if (
        selected.value &&
        isElementAttribute(props.plugin.attr, selected.value)
      ) {
        return selected.value?.attrs[props.plugin.attr]
      }

      return undefined
    })

    let colorTemp = modelValue.value

    const handlePluginValueChange = (value: unknown) => {
      props.controller.valueChange(props.plugin.attr, value, props.graph)
    }

    const createPlugin = (): VNode => {
      switch (props.plugin.type) {
        case SaPluginType.Input: {
          // TODO: emit on change not on input
          return (
            <NInput
              class="sa-plugin"
              value={modelValue.value}
              onUpdateValue={handlePluginValueChange}
              disabled={props.plugin.disabled ?? false}
            />
          )
        }

        case SaPluginType.Number: {
          return (
            <NInputNumber
              class="sa-plugin"
              showButton={false}
              value={modelValue.value}
              onUpdateValue={handlePluginValueChange}
              disabled={props.plugin.disabled ?? false}
            />
          )
        }

        case SaPluginType.Dialog: {
          return (
            <SaDialog
              class="sa-plugin"
              graph={props.graph}
              plugin={props.plugin}
              controller={props.controller}
            />
          )
        }

        case SaPluginType.Color: {
          const updateValue = (color: string) => {
            props.graph.updateElemData(
              selected.value,
              { [props.plugin.attr]: color },
              false
            )
          }
          const updateShow = (show: boolean) => {
            if (!show && modelValue.value !== colorTemp) {
              updateValue(colorTemp)
            }
          }

          const onConfirm = (v: string) => {
            updateValue(colorTemp)
            handlePluginValueChange(v)
            colorTemp = v
          }

          return (
            <div class="sa-plugin flex">
              <NColorPicker
                value={modelValue.value}
                showPreview={true}
                modes={['rgb', 'hex', 'hsl', 'hsv']}
                actions={['confirm']}
                disabled={props.plugin.disabled ?? false}
                onUpdateValue={updateValue}
                onUpdateShow={updateShow}
                onConfirm={onConfirm}
              />
              <NButton onClick={() => handlePluginValueChange('')}>
                Reset
              </NButton>
            </div>
          )
        }

        default: {
          console.error(
            `[Sa error]: Unexpected plugin type ${props.plugin.type}.`
          )

          return (
            <span class="bg-red-700 w-full block text-center">
              {props.plugin.type}
            </span>
          )
        }
      }
    }

    return () => createPlugin()
  },
})
