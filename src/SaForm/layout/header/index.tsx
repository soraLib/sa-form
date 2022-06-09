import { defineComponent, h, PropType, VNode } from 'vue'
import { BasicGraph } from '../../graph'
import { PcGraph } from '../../PcForm/graph'
import './index.scss'

export interface HeaderTool {
  /** icon title on dom */
  title: string;
  /** icon width */
  width?: number;
  /** icon */
  icon: VNode;
  /** icon click callback */
  click: (graph: any /** TODO: */, e: Event) => void;
}

export default defineComponent({
  name: 'SaFormLayoutHeader',
  props: {
    options: {
      required: true,
      type: Array as PropType<HeaderTool[]>
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>
    }
  },

  render() {
    return <div class="sa-form-header flex justify-start p-1">
      {
        this.options.map(tool =>
          <span
            class="header-tool"
            onClick={(e) => tool.click(this.graph, e)}
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
    </div>
  }
})