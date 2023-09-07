import { defineComponent, ref } from 'vue'
import { useClazs } from '../../utils/class'
import type { PropType, VNode } from 'vue'
import type { BasicGraph } from '../../graph'

import './toolkit.scss'

export interface HeaderToolkit {
  /** icon title on dom */
  title: string
  /** icon */
  icon: VNode | ((graph: any /** TODO: */) => VNode)
  /** icon click callback */
  click: (graph: any /** TODO: */, e: Event) => Promise<void> | void
  /** a divider separates the icons */
  divider?: boolean
  /** toolkit size type */
  size?: 'icon' | 'fit'
  /** toolkit is actived */
  active?: (graph: any) => boolean
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

  setup(props) {
    const isRunningMap = ref<Record<string, boolean>>({})

    return () => (
      <div class="header-toolkit-wrapper">
        {props.toolkits.map((tool) => (
          <div class="header-toolkit-inner">
            <span
              class={useClazs('header-button', {
                'is-running': isRunningMap.value[tool.title],
                'is-actived': tool.active?.(props.graph) ?? false,
                'is-fit-size': tool.size === 'fit',
              })}
              onClick={async (e) => {
                if (isRunningMap.value[tool.title]) return

                try {
                  isRunningMap.value[tool.title] = true
                  await tool.click(props.graph, e)
                } finally {
                  isRunningMap.value[tool.title] = false
                }
              }}
              title={tool.title}
            >
              {typeof tool.icon === 'function'
                ? tool.icon(props.graph)
                : tool.icon}
            </span>

            {tool.divider && <span class="header-button-divider" />}
          </div>
        ))}
      </div>
    )
  },
})
