import { defineComponent, PropType } from 'vue';
import { PcDrawer } from '../../../../drawer';

import ElementRenderer from './renderer/element-renderer';

export default defineComponent({
  name: 'NativeWorkspace',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    }
  },
  setup(props) {
    console.log(props.drawer.canvas);
  },
  render() {
    return <div>
      <ElementRenderer drawer={this.drawer} element={this.drawer.canvas} />
    </div>;
  }
});