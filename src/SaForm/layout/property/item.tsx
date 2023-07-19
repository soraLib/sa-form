import { computed, defineComponent } from 'vue'
import {
  NButton,
  NColorPicker,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NSelect,
} from 'naive-ui'
import { SaPluginType, isGroupPlugin } from '../../plugin'
import { isElementAttribute } from '../../utils/element'
import { useClazs } from '../../utils/class'
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
    isInsideGroup: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const selected = computed(() => props.graph.selected[0])
    const modelValue = computed<any>(() => {
      if (
        !isGroupPlugin(props.plugin) &&
        selected.value &&
        isElementAttribute(props.plugin.attr, selected.value)
      )
        return selected.value?.attrs[props.plugin.attr]

      return undefined
    })

    let colorTemp = modelValue.value

    const handlePluginValueChange = (value: unknown) => {
      props.controller.valueChange(props.plugin.attr, value, props.graph)
    }

    const createPluginContent = (): VNode => {
      const plugin = props.plugin

      switch (plugin.type) {
        case SaPluginType.Input: {
          // TODO: emit on change not on input
          const Input = (
            <NInput
              class="sa-plugin"
              value={modelValue.value}
              onUpdateValue={handlePluginValueChange}
              disabled={plugin.disabled ?? false}
              placeholder=""
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup>
                <NInputGroupLabel>{props.plugin.label}</NInputGroupLabel>
                {Input}
              </NInputGroup>
            )

          return Input
        }

        case SaPluginType.Number: {
          const Input = (
            <NInputNumber
              class="sa-plugin w-full"
              showButton={false}
              value={modelValue.value}
              onUpdateValue={handlePluginValueChange}
              disabled={plugin.disabled ?? false}
              placeholder=""
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup>
                <NInputGroupLabel>{props.plugin.label}</NInputGroupLabel>
                {Input}
              </NInputGroup>
            )

          return Input
        }

        case SaPluginType.Select: {
          const Input = (
            <NSelect
              class="sa-plugin"
              value={modelValue.value}
              onUpdateValue={handlePluginValueChange}
              filterable
              disabled={plugin.disabled ?? false}
              options={plugin.options ?? []}
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup>
                <NInputGroupLabel>{props.plugin.label}</NInputGroupLabel>
                {Input}
              </NInputGroup>
            )

          return Input
        }

        case SaPluginType.Dialog: {
          return (
            <SaDialog
              class="sa-plugin"
              graph={props.graph}
              plugin={plugin}
              controller={props.controller}
            />
          )
        }

        case SaPluginType.Color: {
          const updateValue = (color: string) => {
            props.graph.updateElemData(
              selected.value,
              { [plugin.attr]: color },
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
                disabled={plugin.disabled ?? false}
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
          console.error(`[Sa error]: Unexpected plugin type ${plugin.type}.`)

          return (
            <span class="bg-red-400 text-red-700 w-full h-full block text-center">
              ERROR {plugin.type}
            </span>
          )
        }
      }
    }
    const createPlugin = (): VNode => {
      return createPluginContent()
    }

    return () => (
      <div
        class={useClazs('plugin-item', { 'is-inline': !!props.plugin.inline })}
      >
        {!props.isInsideGroup && (
          <div class="plugin-item-label" title={props.plugin.title}>
            {props.plugin.label}
          </div>
        )}
        <div class="plugin-item-content">{createPlugin()}</div>
      </div>
    )
  },
})
