import { defineComponent, PropType } from 'vue';
import { SaPlugin } from '../../../plugin';
import { PcDrawer } from '../../drawer';

export default defineComponent({
  name: 'widget-options',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    },
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>
    }
  },
  setup(props) {
    return () => <div>{ props.plugin.label }</div>;
  }
});