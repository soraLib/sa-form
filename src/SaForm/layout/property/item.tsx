import { computed, defineComponent, ref, watch } from 'vue'
import {
  NButton,
  NColorPicker,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NSelect,
} from 'naive-ui'
import { useDebounceFn } from '@vueuse/core'
import { isEqual } from 'lodash-es'
import { SaPluginType, isGroupPlugin } from '../../plugin'
import { useClazs } from '../../utils/class'
import SaDialog from './dialog'
import { pluginValueFilter } from './hooks/filter'
import { afterValueChange, beforeValueChange } from './hooks/value'
import type { PropType, VNode } from 'vue'
import type { SaPlugin } from '../../plugin'

import type { BasicGraph } from '../../graph'
import type { SaController } from '../../config'
import { isElementAttribute } from '@/SaForm/utils/element'
import { isNullish } from '@/SaForm/utils/function'

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

    const internalMoelValue = ref<any>()
    const error = ref('123')

    let colorTemp = modelValue.value

    watch(
      () => selected.value.attrs.id,
      () => {
        error.value = ''
        internalMoelValue.value = modelValue.value
        colorTemp = modelValue.value
      },
      {
        deep: true,
        immediate: true,
      }
    )
    watch(
      modelValue,
      (cur, prev) => {
        if (isEqual(prev, internalMoelValue.value))
          internalMoelValue.value = cur
      },
      {
        deep: true,
        immediate: true,
      }
    )

    const handlePluginValueChange = (value: unknown) => {
      const { value: modifiedValue, error: $error } = beforeValueChange(
        value,
        props.plugin,
        selected.value,
        props.graph
      )
      error.value = $error
      if ($error) return

      props.controller.valueChange(
        props.plugin.attr,
        modifiedValue,
        props.graph
      )
      afterValueChange(value, props.plugin, props.graph)
    }
    const debouncedHandlePluginValueChange = useDebounceFn(
      handlePluginValueChange,
      400
    )
    const onInternalValueUpdate = (value: unknown) => {
      internalMoelValue.value = value
      debouncedHandlePluginValueChange(value)
    }

    const createPluginContent = (): VNode => {
      const plugin = props.plugin
      const internalDisabled = isNullish(plugin.disabled)
        ? false
        : typeof plugin.disabled === 'boolean'
        ? plugin.disabled
        : plugin.disabled(selected.value)
      const filteredValue = pluginValueFilter(
        internalMoelValue.value,
        props.plugin,
        selected.value,
        props.graph
      )

      switch (plugin.type) {
        case SaPluginType.Input: {
          const Input = (
            <NInput
              class="sa-plugin"
              type="textarea"
              value={filteredValue}
              onUpdate:value={onInternalValueUpdate}
              disabled={internalDisabled}
              clearable={props.plugin.clearable}
              error={error.value}
              status={error.value ? 'error' : undefined}
              allowInput={props.plugin.allowInput}
              placeholder={''}
              autosize={{
                minRows: 1,
              }}
              v-slots={{
                prefix: () => props.plugin.prefix,
                suffix: () => props.plugin.suffix,
              }}
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup title={props.plugin.title}>
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
              showButton={plugin.showButton ?? true}
              clearable={plugin.clearable ?? false}
              value={filteredValue}
              onUpdate:value={onInternalValueUpdate}
              disabled={internalDisabled}
              min={plugin.min}
              max={plugin.max}
              placeholder={''}
              v-slots={{
                prefix: () => props.plugin.prefix,
                suffix: () => props.plugin.suffix,
              }}
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup title={props.plugin.title}>
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
              value={filteredValue}
              onUpdateValue={handlePluginValueChange}
              filterable
              placeholder=""
              consistentMenuWidth={false}
              disabled={internalDisabled}
              options={plugin.options ?? []}
            />
          )

          if (props.isInsideGroup)
            return (
              <NInputGroup title={props.plugin.title}>
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
            colorTemp = v
            props.graph.updateElemData(
              selected.value,
              {
                [plugin.attr]: v,
              },
              true,
              {
                skipEqualCheck: true,
              }
            )
          }

          return (
            <div class="sa-plugin flex">
              <NInputGroup title={props.plugin.title}>
                <NInputGroupLabel>{props.plugin.label}</NInputGroupLabel>
                <NColorPicker
                  class="color-picker"
                  value={filteredValue ?? ''}
                  showPreview={true}
                  modes={['hex']}
                  actions={['confirm']}
                  onUpdateValue={updateValue}
                  onUpdateShow={updateShow}
                  onConfirm={onConfirm}
                  disabled={internalDisabled}
                />
                <NButton
                  type="warning"
                  secondary
                  class="color-picker-button"
                  disabled={internalDisabled}
                  onClick={() => handlePluginValueChange('')}
                >
                  Reset
                </NButton>
              </NInputGroup>
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
          <div class="plugin-item-label">{props.plugin.label}</div>
        )}
        <div class="plugin-item-content">{createPlugin()}</div>
      </div>
    )
  },
})
