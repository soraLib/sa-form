import { computed, defineComponent, PropType, VNode } from 'vue'
import { SaPlugin, SaPluginType } from '../../plugin'

import { ElColorPicker, ElInput, ElInputNumber } from 'element-plus'
import { BasicGraph } from '../../graph'
import { SaController } from '../../config'
import SaDialog from './dialog'

import { isElementAttribute } from '../../utils//element'

function handlePluginValueChange(plu: SaPlugin, value: unknown, graph: BasicGraph, valueChange: SaController['valueChange']) {
  valueChange(plu.attr, value, graph)
}

function createPlugin(plu: SaPlugin, graph: BasicGraph, controller: SaController): VNode {
  const selected = graph.selected[0]
  let modelValue: any

  if (selected && isElementAttribute(plu.attr, selected)) {
    modelValue = selected?.attrs[plu.attr]
  }

  switch (plu.type) {
    case SaPluginType.Input: {
      // TODO: emit on change not on input
      return <ElInput class="sa-plugin" modelValue={modelValue} onInput={(v) => handlePluginValueChange(plu, v, graph, controller.valueChange)} disabled={plu.disabled ?? false} />
    }

    case SaPluginType.Number: {
      return <ElInputNumber class="sa-plugin" controls={false} modelValue={modelValue} onInput={(v) => handlePluginValueChange(plu, v, graph, controller.valueChange)} disabled={plu.disabled ?? false} />
    }

    case SaPluginType.Dialog: {
      return <SaDialog class="sa-plugin" graph={graph} plugin={plu} controller={controller} />
    }

    case SaPluginType.Color: {
      return <div class="flex sa-plugin">
        <ElInput disabled modelValue={modelValue}></ElInput>
        <ElColorPicker modelValue={modelValue} onChange={(v) => handlePluginValueChange(plu, v, graph, controller.valueChange)} disabled={plu.disabled ?? false} />
      </div>
    }

    default: {
      console.error(`[Sa error]: Unexpected plugin type ${plu.type}.`)

      return <span class="bg-red-700 w-full block text-center">{plu.type}</span>
    }
  }
}
export default defineComponent({
  name: 'ControllerItem',
  props: {
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>
    },
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
    const Plugin = computed(() => createPlugin(props.plugin, props.graph, props.controller))

    return () => Plugin.value
  }
})