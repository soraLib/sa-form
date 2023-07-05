import { defineComponent } from 'vue'
import type { PropType, VNode } from 'vue'
import type { BasicGraph } from '../../graph'

import './toolkit.scss'

// TODO: Render component
export interface HeaderToolkit {
  /** icon title on dom */
  title: string
  /** icon */
  icon: VNode
  /** icon click callback */
  click: (graph: any /** TODO: */, e: Event) => void
  /** a divider separates the icons */
  divider?: boolean
}

export default defineComponent({
  name: 'SaFormLayoutHeaderToolkit',
  props: {
    toolkits: {
      required: true,
      type: Array as PropType<HeaderToolkit[]>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  render() {
    return (
      <div class="header-toolkit-wrapper">
        {this.toolkits.map((tool) => (
          <div class="header-toolkit-inner">
            <span
              class="header-button"
              onClick={(e) => tool.click(this.graph, e)}
              title={tool.title}
            >
              {tool.icon}
            </span>

            {tool.divider && <span class="header-button-divider" />}
          </div>
        ))}
      </div>
    )
  },
})
