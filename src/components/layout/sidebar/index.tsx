import { defineComponent, PropType, VNode } from 'vue';
import { BasicDrawer } from '../../drawer';

import './index.scss';

export interface SideTool {
  /** icon title on dom */
  title: string;
  /** icon */
  icon: VNode;
}

export default defineComponent({
  name: 'CoFormLayoutSidebar',

  props: {
    options: {
      required: true,
      type: Array as PropType<SideTool[]>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    }
  },

  render() {
    return <div class="sa-form-side flex flex-col justify-start p-1">
      {
        this.options.map(tool =>
          <span
            class="side-tool"
            title={tool.title}
            style={{
              width: '30px',
              height: '30px'
            }}
          >
            {tool.icon}
          </span>
        )
      }
    </div>;
  }
});