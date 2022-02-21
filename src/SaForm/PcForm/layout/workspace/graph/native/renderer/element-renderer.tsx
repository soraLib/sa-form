import { defineComponent, PropType } from 'vue';
import { PcDrawer } from '../../../../../drawer';
import { PcElement } from '../../../../../element';
import { createStyle } from './style';

import ElementRenderer from './element-renderer';

export default defineComponent({
  name: 'ElementRenderer',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>
    }
  },

  setup(props) {
    console.log(props.element);
  },

  render() {

    return <div style={createStyle(this.element)}>
      {this.element.attrs.name}

      {
        this.element.children?.length
          ? this.element.children.map(ele =>
            <ElementRenderer drawer={this.drawer} element={ele} />)
          : ''
      }
    </div>;
  }
});
