import { computed, defineComponent } from 'vue'
import { NTabPane, NTabs } from 'naive-ui'
import ElementRenderer from '../../element-renderer'
import type { CSSProperties, PropType } from 'vue'
import type { PcElement } from '@/SaForm/PcForm/element'
import type { PcGraph } from '@/SaForm/PcForm/graph'

import './tab.scss'

export default defineComponent({
  name: 'ElementRendererSpecificTab',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>,
    },
  },

  setup(props) {
    const tabStyle = computed<CSSProperties>(() => {
      const tabHeight = props.element.attrs['tab-height'] ?? 0

      return {
        height: `${tabHeight}px`,
        boxSizing: 'border-box',
      }
    })
    const tabPaneStyle = computed<CSSProperties>(() => {
      const borderLength = (props.element.attrs['border-width'] ?? 0) * 2

      return {
        padding: 0,
        width: `${props.element.attrs.width - borderLength}px`,
        height: `${
          props.element.attrs.height -
          (props.element.attrs['tab-height'] ?? 0) -
          borderLength
        }px`,
      }
    })

    return () => (
      <div class="sa-tab">
        <NTabs
          animated
          type="segment"
          defaultValue={props.element.tabs?.[0]?.label}
          tabStyle={tabStyle.value}
          paneStyle={tabPaneStyle.value}
        >
          {props.element.tabs?.map((pane) => (
            <NTabPane displayDirective="if" name={pane.label} tab={pane.label}>
              {pane.children.map((ele) => (
                <ElementRenderer
                  key={ele.attrs.id}
                  graph={props.graph}
                  element={ele}
                />
              ))}
            </NTabPane>
          ))}
        </NTabs>
      </div>
    )
  },
})
