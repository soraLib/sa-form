import { computed, defineComponent, PropType, VNode } from 'vue';
import { SaPlugin, SaPluginType } from '../../plugin';

import { ElInput } from 'element-plus';
import { BasicDrawer } from '../../drawer';

function handlePluginValueChange(value: unknown, drawer: BasicDrawer) {
  console.log(value, drawer);
}

function createPlugin(plu: SaPlugin, drawer: BasicDrawer): VNode {
  const selected = drawer.selected[0];

  switch (plu.component) {
    case SaPluginType.Input: {
      return <ElInput modelValue={selected?.attrs[plu.attr]} onInput={(v) => handlePluginValueChange(v, drawer)} disabled={plu.disabled ?? true} />;
    }

    default:
      console.error(`[Sa error]: unexpected plugin type ${plu.component}.`);

      return <span>{plu.label}</span>;
  }
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
    }
  },

  setup(props) {
    const Plugin = computed(() => createPlugin(props.plugin, props.drawer));

    return () => (
      <div>{Plugin.value}</div>
    );
  }
});