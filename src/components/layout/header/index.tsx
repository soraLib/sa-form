import { defineComponent, h, PropType, VNode } from 'vue';
import { BasicDrawer } from '../../drawer';
import { PcDrawer } from '../../PcForm/drawer';
import './index.scss';

export interface HeaderTool {
  /** icon title on dom */
  title: string;
  /** icon width */
  width?: number;
  /** icon */
  icon: VNode;
  /** icon click callback */
  click: (drawer: BasicDrawer, e: Event) => void;
}

export default defineComponent({
  name: 'SaFormLayoutHeader',
  props: {
    options: {
      required: true,
      type: Array as PropType<HeaderTool[]>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    }
  },

  render() {
    return <div class="sa-form-header flex justify-start p-1">
      {
        this.options.map(tool =>
          <span
            class="header-tool"
            onClick={(e) => tool.click(this.drawer, e)}
            title={tool.title}
            style={{
              width: tool.width ? `${tool.width}px` : '30px',
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