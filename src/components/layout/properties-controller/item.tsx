import { computed, defineComponent, PropType, VNode } from 'vue';
import { SaPlugin, SaPluginType } from '../../plugin';

import { ElInput } from 'element-plus';
import { BasicDrawer } from '../../drawer';
import { BasicElement, BasicElementAttributes } from '../../element';
import { SaController } from '../../config';

function handlePluginValueChange(plu: SaPlugin, value: unknown, drawer: BasicDrawer, valueChange: SaController['valueChange']) {
  valueChange(plu.attr, value, drawer);
}

function createPlugin(plu: SaPlugin, drawer: BasicDrawer, controller: SaController): VNode {
  const selected = drawer.selected[0];
  let modelValue: any;

  if (selected && isElementAttribute(plu.attr, selected)) {
    modelValue = selected?.attrs[plu.attr];
  }

  switch (plu.component) {
    case SaPluginType.Input: {
      return <ElInput modelValue={modelValue} onInput={(v) => handlePluginValueChange(plu, v, drawer, controller.valueChange)} disabled={plu.disabled ?? false} />;
    }

    default:
      console.error(`[Sa error]: unexpected plugin type ${plu.component}.`);

      return <span>{plu.label}</span>;
  }
}

function isElementAttribute(attr: string, elem: BasicElement): attr is keyof BasicElementAttributes {
  return Reflect.has(elem.attrs, attr);
}

export default defineComponent({
  name: 'ControllerItem',
  props: {
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    },
    controller: {
      required: true,
      type: Object as PropType<SaController>
    }
  },

  setup(props) {
    const Plugin = computed(() => createPlugin(props.plugin, props.drawer, props.controller));

    return () => (
      <div>{Plugin.value}</div>
    );
  }
});