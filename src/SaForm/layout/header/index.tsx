import { defineComponent, h } from 'vue'
import { PcGraph } from '../../PcForm/graph'
import type { PropType, VNode } from 'vue'
import type { BasicGraph } from '../../graph'
import './index.scss'

// TODO: Render component
export interface HeaderTool {
  /** icon title on dom */
  title: string
  /** icon width */
  width?: number
  /** icon */
  icon: VNode
  /** icon click callback */
  click: (graph: any /** TODO: */, e: Event) => void
  /** a divider separates the icons */
  divider?: boolean
}

export default defineComponent({
  name: 'SaFormLayoutHeader',
  props: {
    options: {
      required: true,
      type: Array as PropType<HeaderTool[]>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  render() {
    return (
      <div class="sa-form-header flex justify-start p-1">
        {this.options.map((tool) => (
          <div class="heade-tool-wrapper">
            <span
              class="header-tool"
              onClick={(e) => tool.click(this.graph, e)}
              title={tool.title}
              style={{
                width: tool.width ? `${tool.width}px` : '30px',
                height: '30px',
              }}
            >
              {tool.icon}
            </span>

            {tool.divider && <span class="header-tool-divider" />}
          </div>
        ))}
      </div>
    )
  },
})
