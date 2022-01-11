import { defineComponent, PropType } from 'vue';
import { BasicDrawer } from '../../drawer';
import { SaPlugin } from '../../Plugin';

export default defineComponent({
  name: 'SaFormControllerDialogLayout',
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

    return () => (
      <div>{props.plugin.dialog}</div>
    );
  }
});